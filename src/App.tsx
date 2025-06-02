import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from 'react-hot-toast';

// Auth
import LoginPage from './pages/auth/LoginPage';

// Checkout
import CheckoutPage from './pages/checkout/CheckoutPage';

// Products
import ProductsPage from './pages/product/ProductsPage';
import ProductEditPage from './pages/product/ProductEditPage';
import OrdersPage from './pages/orders/OrdersPage';

const queryClient = new QueryClient();

const App: React.FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <div style={{ minHeight: '100vh', backgroundColor: '#f7fafc' }}>
          <Toaster position="top-right" />
          <Routes>
            {/* Auth e Rotas principais */}
            <Route path="/" element={<Navigate to="/login" />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/checkout" element={<CheckoutPage />} />

            {/* Produtos */}
            <Route path="/products" element={<ProductsPage />} />
            <Route path="/products/new" element={<ProductEditPage />} />
            <Route path="/products/edit/:id" element={<ProductEditPage />} />
            <Route path="/orders" element={<OrdersPage />} />

            {/* Rota coringa */}
            <Route path="*" element={<Navigate to="/login" />} />
          </Routes>
        </div>

        <style>{`
          @keyframes spin {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }
        `}</style>
      </Router>
    </QueryClientProvider>
  );
};

export default App;
