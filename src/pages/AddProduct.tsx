import { useState } from 'react';
import axios from 'axios';
import { db } from '../services/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useAuth } from '../context/AuthContext'; // Assuming you have an AuthContext to provide user details

const AddProduct = () => {
  const navigate = useNavigate();
  const { user: currentUser } = useAuth(); // Get the current user from the AuthContext

  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  //~ To handle Image selection
  const handleImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  //~ handling form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (image) {
      const formData = new FormData();
      formData.append('file', image);
      formData.append('upload_preset', 'olx-clone');

      try {
        console.log('FormData:', formData); // Log FormData for debugging

        const response = await axios.post(
          `https://api.cloudinary.com/v1_1/dyuufzq0a/image/upload`, //~ upload the image to the cloudinary
          formData
        );
        const imageUrl = response.data.secure_url; //~ get the imageUrl

        const productData = {
          title,
          category,
          price: parseFloat(price),
          description,
          image: imageUrl,
          createdAt: serverTimestamp(),
          user: {
            name: currentUser?.displayName || 'Anonymous', // Assuming the user's name is stored in displayName
            phone: currentUser?.phoneNumber || 'N/A', // Assuming the user's phone number is stored in phoneNumber
          },
        };

        await addDoc(collection(db, 'products'), productData); //~ Add product to FireStore

        // Reset form
        setTitle('');
        setCategory('');
        setPrice('');
        setDescription('');
        setImage(null);
        setImagePreview(null);

        toast.success('Product added successfully');
        navigate('/');
      } catch (error) {
        console.error('Error uploading image or saving product:', error);
        toast.error('Error uploading image or saving product');
      }
    } else {
      toast.error('Please select an image before submitting.');
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-2xl mb-4 font-bold text-center">Add Product</h1>

        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border p-2 mb-4 w-full rounded"
        />
        <input
          type="text"
          placeholder="Category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="border p-2 mb-4 w-full rounded"
        />
        <input
          type="number"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className="border p-2 mb-4 w-full rounded"
        />
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="border p-2 mb-4 w-full rounded h-24"
        />
        <label className="block mb-4 border rounded w-full text-center cursor-pointer">
          <span className="sr-only">Choose File</span>
          <input
            type="file"
            accept="image/*"
            onChange={handleImage}
            className="block w-full text-sm text-gray-500
            file:mr-4 file:py-2 file:px-4
            file:rounded-full file:border-0
            file:text-sm file:font-semibold
            file:bg-blue-50 file:text-blue-700
            hover:file:bg-blue-100"
          />
        </label>

        {imagePreview && (
          <img src={imagePreview} alt="Image Preview" className="w-full h-64 object-contain mb-4 rounded" />
        )}
        <button type="submit" className="bg-blue-600 text-white p-2 w-full rounded hover:bg-blue-700">
          Submit
        </button>
      </form>
    </div>
  );
};

export default AddProduct;