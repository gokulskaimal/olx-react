import { useState } from "react"
import Login from "./components/Login"
import Navbar from "./components/Navbar"
import { AuthProvider } from "./context/AuthContext"
import { Route, Routes } from "react-router-dom"
import Home from "./components/Home"
import Footer from "./components/Footer"
import ProductDetail from "./components/ProductDetail"
import AddProduct from "./pages/AddProduct"
import ProtectedRoute from "./components/ProtectedRoute"
import { ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const App = () => {
  const [loginPop,setLoginPop] = useState(false)
  const [search, setSearch] = useState('')
  return(
    <>
    <AuthProvider>

    <Navbar  onloginPop={() => setLoginPop(true)} setSearch={setSearch}/>
      
    { loginPop && <Login  setLoginPop={setLoginPop}/> }
    <ToastContainer theme='dark'/> 
      <Routes>
        <Route path='/' element={<Home  search={search}/>} />
        <Route path='/Detail/:id' element={<ProductDetail />} />
        <Route path='/addProduct' element={<ProtectedRoute>  <AddProduct /> </ProtectedRoute>  } />
      </Routes>

      <Footer />

    </AuthProvider>

    </>
  )
}

export default App