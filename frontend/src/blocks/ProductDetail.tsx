import React from "react";
import { useParams } from "react-router-dom";
import { Card } from "antd";

interface Product {
  id: number;
  name: string;
  description: string;
  category: string;
  imageUrl: string;
  isVisible: boolean; // Сделаем поле необязательным
  adminId: number; // Приведение типов
  adminName: string;
  model: string; // Если используется,
  createdAt: string;
}

interface ProductDetailProps {
  products: Product[];
}

const ProductDetail: React.FC<ProductDetailProps> = ({ products }) => {
  const { id } = useParams<{ id: string }>(); // Получаем ID из URL
  const product = products.find((product) => product.id === Number(id)); // Ищем продукт по ID

  if (!product) {
    return <div>Товар не найден</div>;
  }

  return (
    <div style={{ display: "flex", justifyContent: "center", padding: "20px" }}>
      <Card
        title={product.name}
        bordered={false}
        style={{
          width: 600,
          backgroundColor: "rgb(240, 242, 245)",
          borderRadius: "10px",
          overflow: "hidden",
        }}
        cover={
          <img
            src={product.imageUrl || "https://via.placeholder.com/600"}
            alt={product.name}
            style={{
              width: "100%",
              height: "300px",
              objectFit: "contain",
            }}
          />
        }
      >
        <p>
          <strong>Категория:</strong> {product.category}
        </p>
        {product.model && (
          <p>
            <strong>Модель:</strong> {product.model}
          </p>
        )}
        <p>
          <strong>Описание:</strong> {product.description || "Описание отсутствует"}
        </p>
      </Card>
    </div>
  );
};

export default ProductDetail;
