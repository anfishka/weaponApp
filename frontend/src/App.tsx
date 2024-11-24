import React, { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";
import ProductList from "./components/ProductList";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ProductDetail from "./blocks/ProductDetail";
import { Product } from "./components/Product";
import Header from "./layouts/Header";
import Footer from "./layouts/Footer";

const App: React.FC = () => {
  const [data, setData] = useState<Product[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get<Product[]>(`https://localhost:7208/api/Products/`);
        console.log("API response:", response.data);
  
        // Преобразуем данные, гарантируя, что date всегда строка
        const mappedData = response.data.map((item) => ({
          id: item.id,
          name: item.name,
          description: item.description,
          category: item.category,
          imageUrl: item.imageUrl || "/placeholder.png",
          isVisible: item.isVisible, // Сделаем поле необязательным
          adminId: item.adminId, // Приведение типов
          adminName: item.adminName,
          model: item.model,
          createdAt: item.createdAt,
        }));

       
  
        setData(mappedData);
      } catch (err) {
        console.error("Ошибка при загрузке данных:", err);
        setError("Ошибка загрузки данных.");
      } finally {
        setLoading(false);
      }
    };
  
    fetchProducts();
  }, []);
  
  

  return (
    <BrowserRouter>
      <div className="app">
        <Header />
        <main className="content">
          {loading ? (
            <p>Загрузка...</p>
          ) : error ? (
            <p>{error}</p>
          ) : (
            <Routes>
              <Route path="/" element={<ProductList products={data} />} />
              <Route path="/product/:id" element={<ProductDetail products={data} />} />
            </Routes>
          )}
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
};

export default App;
