import { useEffect, useState } from "react";
import Menubar from "./Menubar";
import ProductList from "./ProductList";
import { db } from '../services/firebase'; // Import your Firestore configuration
import { collection, getDocs } from 'firebase/firestore';

interface Product {
  id: string;
  image: string;
  price: number;
  title: string;
  category: string;
  createdAt: { seconds: number; nanoseconds: number }; // Assuming createdAt is a Firestore timestamp
}

interface HomeProps {
  search: string;
}

const Home = ({ search }: HomeProps) => {
  const [products, setProducts] = useState<Product[]>([]);

  const getProducts = async () => {
    const productsCollection = collection(db, 'products');
    const productSnapshot = await getDocs(productsCollection);
    const productList = productSnapshot.docs.map(doc => {
      const data = doc.data();
      return {
        id: doc.id,
        image: data.image,
        price: data.price,
        title: data.title,
        category: data.category,
        createdAt: data.createdAt, // Ensure createdAt is included
      };
    });
    setProducts(productList);
  };

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <>
      <Menubar />
      <ProductList products={products} searches={search} />
    </>
  );
};

export default Home;