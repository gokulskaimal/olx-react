import { Link } from "react-router-dom";

interface Product {
  id: string;
  image: string;
  price: number;
  title: string;
  category: string;
  createdAt: { seconds: number; nanoseconds: number }; // Assuming createdAt is a Firestore timestamp
}

interface ProductListProps {
  products: Product[];
  searches: string;
}

const ProductList = ({ products, searches }: ProductListProps) => {
  const formatDate = (timestamp: { seconds: number; nanoseconds: number }) => {
    const date = new Date(timestamp.seconds * 1000);
    return date.toLocaleDateString();
  };

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4 w-full">
        {products
          .filter((data) => data?.title?.toLowerCase().includes(searches.toLowerCase()))
          .map((data) => (
            <Link key={data.id} to={`/Detail/${data.id}`}>
              <div className="border border-gray-300 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300">
                <div className="w-full h-48 bg-gray-200 flex items-center justify-center">
                  <img src={data.image} className="object-contain h-full" alt="product image" />
                </div>
                <div className="p-4 relative">
                  <h1 className="font-bold text-xl mb-2">{data.title}</h1>
                  <h1 className="text-lg font-medium">₹ {data.price}</h1>
                  <h1 className="text-gray-600">{data.category}</h1>
                  <span className="absolute bottom-2 right-2 text-gray-500 text-sm">
                    {formatDate(data.createdAt)}
                  </span>
                </div>
              </div>
            </Link>
          ))}
      </div>
    </>
  );
};

export default ProductList;