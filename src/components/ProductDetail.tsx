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
        <>
          <div className="mb-6">
            <img src={product.image} alt={product.title} className="w-full h-96 object-contain h-50% rounded-lg" />
          </div>
          <div className="bg-white p-4 border border-gray-200 rounded-lg shadow-lg mb-4">
            <h1 className="text-2xl font-bold">{product.title}</h1>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div className="bg-white p-4 border border-gray-200 rounded-lg shadow-lg">
              <h3 className="text-lg font-semibold border-b border-gray-300 p-2">Overview</h3>
              <p className="text-gray-600">Mileage: {product.mileage || 'N/A'}</p>
              <p className="text-gray-600">Location: {product.location || 'N/A'}</p>
              <p className="text-gray-600">Posting Date: {product.postingDate || 'N/A'}</p>
            </div>
            <div className="bg-white p-4 border border-gray-200 rounded-lg shadow-lg">
              <h3 className="text-lg font-semibold">Price</h3>
              <h2 className="text-xl text-green-600">₹ {product.price}</h2>
              <button className="mt-4 bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700">
                Make Offer
              </button>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div className="bg-white p-4 border border-gray-200 rounded-lg shadow-lg">
              <h3 className="text-lg font-semibold border-b border-gray-300 pb-2">Description</h3>
              <p className="text-gray-800">{product.description}</p>
            </div>
            <div className="bg-white p-4 border border-gray-200 rounded-lg shadow-lg">
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-teal-500 flex items-center justify-center text-white">
                  <span>OLX</span>
                </div>
                <span className="ml-2">OLX User</span>
                <button className="ml-auto border border-gray-300 py-1 px-3 rounded hover:bg-gray-100">
                  Chat with Seller
                </button>
              </div>
            </div>
          </div>
        </>
      ) : (
        <p>Loading product details...</p>
      )}
    </div>
  );
}

export default ProductDetail;