
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



function AppContent() {
  const location = useLocation();
  const [loading, setLoading] = useState(true);
  const [loaderShown, setLoaderShown] = useState(false);

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
          <Nav />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/product" element={<Product />} />
            <Route path="/product-details" element={<ProductDetails />} />
          </Routes>
          <Footer />
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}