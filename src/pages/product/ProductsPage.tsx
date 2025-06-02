import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Product } from '../../types/Product';
import { getProducts } from '../../../services/productService';
import ProductItem from '../../components/ProductItem';

const ProductsPage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setIsLoading(true);
        const data = await getProducts();
        setProducts(data);
      } catch (err) {
        setError('Erro ao carregar produtos');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleDelete = (id: string) => {
    setProducts(prev => prev.filter(product => product.id !== id));
  };

  if (isLoading) {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh'
      }}>
        <div style={{ textAlign: 'center' }}>
          <svg
            style={{ animation: 'spin 1s linear infinite', width: '50px', height: '50px' }}
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="12" cy="12" r="10" stroke="#4299e1" strokeOpacity="0.25" strokeWidth="4"></circle>
            <path d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" fill="#4299e1" fillOpacity="0.75"></path>
          </svg>
          <p style={{ marginTop: '16px', color: '#4a5568' }}>Carregando produtos...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        flexDirection: 'column'
      }}>
        <p style={{ color: '#e53e3e', fontSize: '18px', marginBottom: '16px' }}>{error}</p>
        <button
          onClick={() => window.location.reload()}
          style={{
            backgroundColor: '#4299e1',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            padding: '10px 20px',
            cursor: 'pointer'
          }}
        >
          Tentar novamente
        </button>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '20px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <h1 style={{ fontSize: '24px', fontWeight: '600', color: '#2d3748' }}>Lista de Produtos</h1>
        <button
          onClick={() => navigate('/products/new')}
          style={{
            backgroundColor: '#48bb78',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            padding: '10px 16px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center'
          }}
        >
          <svg
            style={{ marginRight: '8px', width: '16px', height: '16px' }}
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M12 4V20M4 12H20" stroke="white" strokeWidth="2" strokeLinecap="round"/>
          </svg>
          Novo Produto
        </button>
      </div>

      {products.length === 0 ? (
        <div style={{
          backgroundColor: '#f7fafc',
          padding: '40px',
          borderRadius: '8px',
          textAlign: 'center',
          border: '1px dashed #cbd5e0'
        }}>
          <p style={{ color: '#718096', marginBottom: '16px' }}>Nenhum produto cadastrado</p>
          <button
            onClick={() => navigate('/products/new')}
            style={{
              backgroundColor: '#4299e1',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              padding: '10px 20px',
              cursor: 'pointer'
            }}
          >
            Cadastrar primeiro produto
          </button>
        </div>
      ) : (
        <div>
          {products.map(product => (
            <ProductItem 
              key={product.id} 
              product={product} 
              onDelete={handleDelete} 
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductsPage;