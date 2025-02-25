import { useState } from 'react'
import axios from 'axios'
import { db } from '../services/firebase'
import { collection, addDoc } from 'firebase/firestore'
import { useNavigate } from 'react-router-dom'
import { toast } from "react-toastify"

const AddProduct = () => {

  const navigate = useNavigate()

  
const [title, setTitle] = useState('')
const [category, setCategory] = useState('')
const [price, setPrice] = useState('')
const [description, setDescription] = useState('')
const [image, setImage] = useState<File | null>(null)
const [imagePreview, setImagePreview] = useState<string | null>(null)


//~ To handle Image selection
const handleImage = (e: React.ChangeEvent<HTMLInputElement>) => {
  const file = e.target.files?.[0]
  if(file) {
    setImage(file)
    const reader = new FileReader()
    reader.onloadend = () => {
      setImagePreview(reader.result as string)
    }
    reader.readAsDataURL(file)
  }
}

//~ handling form submission
const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  if(image) {
    const formData = new FormData();
    formData.append('file', image);
    formData.append('upload_preset', 'my_upolad_preset'); 

    try {
      const response = await axios.post(
        `https://api.cloudinary.com/v1_1/dlpqrtxee/image/upload`,    //~ upload the image to the cloudinary
        formData
      );
      const imageUrl = response.data.secure_url;    //~ get the imageUrl

      const productData = {
        title,
        category,
        price: parseFloat(price),
        description,
        image: imageUrl,
      };

      await addDoc(collection(db, 'products'), productData); //~ Add product to FireStore

       // Reset form
       setTitle('');
       setCategory('');
       setPrice('');
       setDescription('');
       setImage(null);
       setImagePreview(null);

       toast.success('Product added successful')
       navigate('/')

    } catch (error) {
      toast.error(`Error uploading image or saving product`);
    }
  } else {
    toast.error('Please select an image before submitting.');
  }
}

return (
  <form onSubmit={handleSubmit} className='p-4'>
    <h1 className='text-2xl mb-4'>Add Product</h1>

    <input type='text' placeholder='Title' value={title} onChange={(e) => setTitle(e.target.value)} className='border p-2 mb-2 w-full' />
    <input type='text' placeholder='Category' value={category} onChange={(e) => setCategory(e.target.value)} className='border p-2 mb-2 w-full' />
    <input type='number' placeholder='Price' value={price} onChange={(e) => setPrice(e.target.value)} className='border p-2 mb-2 w-full' />
    <input type='text' placeholder='Description' value={description} onChange={(e) => setDescription(e.target.value)} className='border p-2 mb-2 w-full' />
    <input type='file' accept="image/*"  onChange={handleImage} className='border p-2 mb-2 w-full' />

    {imagePreview && (
      <img src={imagePreview} alt='Image Preview' className='w-96 h-96 mb-2' />
    )}
    <button type='submit' className='bg-blue-600 text-white p-2'>Submit</button>
  </form>
)
}

export default AddProduct