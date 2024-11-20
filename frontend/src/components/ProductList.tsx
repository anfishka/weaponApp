import React, { useState } from "react";
import ProductCard from "../blocks/ProductCard";

interface Product {
  id: number;
  name: string;
  description: string;
  category: string;
  image: string;
  date: string;
}

interface ProductListProps {
  products: Product[];
}

const ProductList: React.FC<ProductListProps> = ({ products }) => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [itemsPerPage] = useState<number>(8); // Количество карточек на странице
  const [sortOption, setSortOption] = useState<"date" | "category">("date");

  // Сортировка
  const sortedProducts = [...products].sort((a, b) => {
    if (sortOption === "date") {
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    }
    if (sortOption === "category") {
      return a.category.localeCompare(b.category);
    }
    return 0;
  });

  // Пагинация
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentProducts = sortedProducts.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="product-list-container">
      {/* Сортировка */}
      <div className="sort-dropdown">
      <label htmlFor="sort-select" className="sort-label">Сортировка</label>
      <select 
      id="sort-select"
      value={sortOption}
      onChange={(e) => setSortOption(e.target.value as "date" | "category")}
      >
    <option value="date">По дате</option>
    <option value="category">По категории</option>
  </select>
      </div>

      {/* Карточки товаров */}
      <div className="product-list">
        {currentProducts.slice(0, itemsPerPage).map((product) => (
          <ProductCard
            key={product.id}
            id={product.id}
            name={product.name}
            description={product.description}
            category={product.category}
            image={product.image}
            onSelect={() => console.log(`Выбрано: ${product.name}`)}
          />
        ))}
      </div>

      {/* Пагинация */}
      <div className="pagination">
        {Array.from({ length: Math.ceil(products.length / itemsPerPage) }, (_, index) => (
          <button
            key={index + 1}
            onClick={() => handlePageChange(index + 1)}
            className={currentPage === index + 1 ? "active" : ""}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ProductList;