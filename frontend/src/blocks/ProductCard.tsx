import { Image } from "antd";
import React from "react";
import { Link } from "react-router-dom";

interface ProductCardProps {
  id: number;
  name: string;
  description: string;
  category: string;
  imageUrl: string;
  onSelect: () => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ id, name, description, category, imageUrl, onSelect }) => {
  return (
    <div className="product-card">
      <Image
        src={imageUrl || "/placeholder.png"} // Если image пустое, показываем заглушку
        alt={name || "Изображение недоступно"}
        className="product-image"
      />
      <div className="product-details">
        <h3 className="product-name">{name}</h3>
        <p className="product-category">Категория: {category}</p>
        <p className="product-description">{description}</p>
      </div>
      <Link to={`/product/${id}`} className="details-link">
        Выбрать
      </Link>
    </div>
  );
};

export default ProductCard;
