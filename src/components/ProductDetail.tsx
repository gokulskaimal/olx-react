import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { db } from '../services/firebase'; // Import your Firestore instance
import { doc, getDoc } from 'firebase/firestore'; // Import Firestore functions

interface Product {
  id: string;
  image: string;
  title: string;
  mileage?: string;
  location?: string;
  postingDate?: string;
  price: number;
  description: string;
  user: {
    name: string;
    phone: string;
  };
}

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);

  useEffect(() => {
    const fetchProduct = async () => {
      if (!id) {
        console.log('No product ID provided');
        return;
      }

      const productRef = doc(db, 'products', id);
      const productSnap = await getDoc(productRef);

      //~ Checking if the product exists
      if (productSnap.exists()) {
        setProduct({ id: productSnap.id, ...productSnap.data() } as Product);
      } else {
        console.log('No such document');
      }
    };
    fetchProduct();
  }, [id]);

  return (
    <div className="max-w-6xl mx-auto p-6">
      {product ? (
        <div className="flex flex-col md:flex-row gap-6">
          <div className="flex-1 mb-6">
            <img src={product.image} alt={product.title} className="w-full h-96 object-contain rounded-lg shadow-lg" />
          </div>
          <div className="flex-1 flex flex-col gap-6">
            <div className="bg-white p-6 border border-gray-200 rounded-lg shadow-lg">
              <h1 className="text-3xl font-bold mb-4">{product.title}</h1>
              <div className="bg-white p-6 border border-gray-200 rounded-lg shadow-lg mb-6">
                <h3 className="text-lg font-semibold mb-2">Price</h3>
                <h2 className="text-2xl text-green-600 mb-4">₹ {product.price}</h2>
                <button className="mt-4 bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition duration-300">
                  Make Offer
                </button>
              </div>
              <div className="bg-white p-6 border border-gray-200 rounded-lg shadow-lg mb-6">
                <h3 className="text-lg font-semibold mb-2">Seller Details</h3>
                <p className="text-gray-800 mb-2">Name: {product.user.name}</p>
                <p className="text-gray-800">Phone: {product.user.phone}</p>
              </div>
            </div>
            <div className="bg-white p-6 border border-gray-200 rounded-lg shadow-lg mb-6">
              <h3 className="text-lg font-semibold border-b border-gray-300 pb-2 mb-4">Description</h3>
              <p className="text-gray-800">{product.description}</p>
            </div>
            <div className="bg-white p-6 border border-gray-200 rounded-lg shadow-lg">
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 rounded-full bg-teal-500 flex items-center justify-center text-white">
                  <span>OLX</span>
                </div>
                <span className="ml-2 text-lg font-semibold">OLX User</span>
                <button className="ml-auto border border-gray-300 py-1 px-3 rounded hover:bg-gray-100 transition duration-300">
                  Chat with Seller
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <p>Loading product details...</p>
      )}
    </div>
  );
}

export default ProductDetail;