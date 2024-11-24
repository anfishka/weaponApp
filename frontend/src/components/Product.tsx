export interface Product {
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