
import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import Nav from './components/Nav';
import Home from './pages/Home';
import About from './pages/About';
import Footer from './components/Footer';
import Product from './pages/Product';
import ProductDetails from './pages/ProductDetails';
import NamasteLoader from './components/NamasteLoader';
import Cart from './pages/Cart';
import Register from './pages/Register';
import Login from './pages/Login';
import Contact from './pages/Contact';
import Wishlist from './pages/Wishlist';
import Checkout from './pages/Checkout';
import Invoice from './pages/Invoice';
import Account from './pages/Account';
import AdminPanel from './components/adminDashboard/AdminPanel';
import { SiteSettingsProvider } from "./components/SiteSettingsContext";
import AdminRegister from './pages/AdminRegister';
import AdminLogin from './pages/AdminLogin';



function AppContent() {
  const location = useLocation();
  const [loading, setLoading] = useState(true);
  const [loaderShown, setLoaderShown] = useState(false);
  const isAdminRoute = location.pathname === '/admin' || location.pathname.startsWith('/admin/');

  useEffect(() => {

    if (location.pathname === '/' && !loaderShown) {
      setLoading(true);
      const timer = setTimeout(() => {
        setLoading(false);
        setLoaderShown(true);
      }, 1000);
      return () => clearTimeout(timer);
    } else {
      setLoading(false);
    }
    
  }, [location.pathname]);

  return (
    <AnimatePresence mode="wait">
      {loading && location.pathname === '/' ? (
        <motion.div
          key="loader"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
        >
          <NamasteLoader />
        </motion.div>
      ) : (
        <motion.div
          key="main"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
        >
          {!isAdminRoute && <Nav />}
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/product" element={<Product />} />
            <Route path="/product-details" element={<ProductDetails />} />
            <Route path="cart" element={<Cart/>}/>
            <Route path="/registor" element={<Register/>}/>
            <Route path="/admin-registor" element={<AdminRegister/>}/>
            <Route path="/admin-login" element={<AdminLogin/>}/>
            <Route path="/login" element={<Login/>}/>
            <Route path="/contact" element={<Contact/>}/>
            <Route path='/wishlist' element={<Wishlist/>}/>
            <Route path="/checkout" element={<Checkout/>}/>
            <Route path="/invoice" element={<Invoice/>}/>
            <Route path="/account" element={<Account/>}/>
            <Route path="/admin" element={<AdminPanel />} />
          </Routes>
          {!isAdminRoute && <Footer />}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default function App() {
  return (
    <SiteSettingsProvider>
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </SiteSettingsProvider>
  );
}