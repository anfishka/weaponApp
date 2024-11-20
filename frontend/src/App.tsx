import React from "react";
import img1 from './assets/img1.jpg';
import img2 from './assets/img2.jpg';
import './App.css';
import ProductList from "./components/ProductList";
import { BrowserRouter, Route, Router, RouterProvider, Routes } from "react-router-dom";
import ProductDetail from "./blocks/ProductDetail";
import { Product } from "./components/Product";
import Header from "./layouts/Header";
import Footer from "./layouts/Footer";

const products: Product[] = [
  {
    id: 1,
    name: "Снайперская винтовка",
    description: "Высокоточная винтовка для дальнего боя.",
    category: "Винтовки",
    image: img1,
    date: "2024-11-15",
  },
  {
    id: 2,
    name: "Пистолет Glock",
    description: "Надежный и компактный пистолет.",
    category: "Пистолеты",
    image: img2,
    date: "2024-10-10",
  },
  {
    id: 1,
    name: "Снайперская винтовка",
    description: "Высокоточная винтовка для дальнего боя.",
    category: "Винтовки",
    image: img1,
    date: "2024-11-15",
  },
  {
    id: 2,
    name: "Пистолет Glock",
    description: "Надежный и компактный пистолет.",
    category: "Пистолеты",
    image: img2,
    date: "2024-10-10",
  },
  {
    id: 1,
    name: "Снайперская винтовка",
    description: "Высокоточная винтовка для дальнего боя.",
    category: "Винтовки",
    image: img1,
    date: "2024-11-15",
  },
  {
    id: 2,
    name: "Пистолет Glock",
    description: "Надежный и компактный пистолет.",
    category: "Пистолеты",
    image: img2,
    date: "2024-10-10",
  },
  {
    id: 1,
    name: "Снайперская винтовка",
    description: "Высокоточная винтовка для дальнего боя.",
    category: "Винтовки",
    image: img1,
    date: "2024-11-15",
  },
  {
    id: 2,
    name: "Пистолет Glock",
    description: "Надежный и компактный пистолет.",
    category: "Пистолеты",
    image: img2,
    date: "2024-10-10",
  } ,
  {
    id: 1,
    name: "Снайперская винтовка",
    description: "Высокоточная винтовка для дальнего боя.",
    category: "Винтовки",
    image: img1,
    date: "2024-11-15",
  }, {
    id: 1,
    name: "Снайперская винтовка",
    description: "Высокоточная винтовка для дальнего боя.",
    category: "Винтовки",
    image: img1,
    date: "2024-11-15",
  },
   {
    id: 1,
    name: "Снайперская винтовка",
    description: "Высокоточная винтовка для дальнего боя.",
    category: "Винтовки",
    image: img1,
    date: "2024-11-15",
  }, {
    id: 1,
    name: "Снайперская винтовка",
    description: "Высокоточная винтовка для дальнего боя.",
    category: "Винтовки",
    image: img1,
    date: "2024-11-15",
  }
  // Добавьте больше товаров
];

const App: React.FC = () => (
  <BrowserRouter>
  <div className="app">
        <Header />
        <main className="content">
          <Routes>
            <Route path="/" element={<ProductList products={products} />} />
            <Route path="/product/:id" element={<ProductDetail  products={products}/>} />
          </Routes>
        </main>
        <Footer />
      </div>
</BrowserRouter>

);


export default App;
