import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Product } from '../../types/Product';
import { getProductById, createProduct, updateProduct } from '../../../services/productService';
import ProductForm from '../../components/ProductForm';

const ProductEditPage: React.FC = () => {
  const { id } = useParams<{ id?: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(!!id);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!id) return;

    const fetchProduct = async () => {
      try {
        const data = await getProductById(id);
        if (data) {
          setProduct(data);
        } else {
          setError('Produto não encontrado');
        }
      } catch (err) {
        setError('Erro ao carregar produto');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleSubmit = async (productData: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>) => {
    try {
      if (id) {
        await updateProduct(id, productData);
      } else {
        await createProduct(productData);
      }
      navigate('/products');
    } catch (err) {
      setError(id ? 'Erro ao atualizar produto' : 'Erro ao criar produto');
      console.error(err);
    }
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
          <p style={{ marginTop: '16px', color: '#4a5568' }}>Carregando...</p>
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
          onClick={() => navigate('/products')}
          style={{
            backgroundColor: '#4299e1',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            padding: '10px 20px',
            cursor: 'pointer'
          }}
        >
          Voltar para lista de produtos
        </button>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '20px' }}>
      <div style={{ marginBottom: '24px' }}>
        <h1 style={{ fontSize: '24px', fontWeight: '600', color: '#2d3748' }}>
          {id ? 'Editar Produto' : 'Cadastrar Novo Produto'}
        </h1>
        <button
          onClick={() => navigate('/products')}
          style={{
            backgroundColor: '#e2e8f0',
            color: '#4a5568',
            border: 'none',
            borderRadius: '4px',
            padding: '8px 16px',
            cursor: 'pointer',
            marginTop: '16px',
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
            <path d="M15 18L9 12L15 6" stroke="#4A5568" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          Voltar para lista
        </button>
      </div>

      <ProductForm
        initialData={product || undefined}
        onSubmit={handleSubmit}
        isSubmitting={false}
      />
    </div>
  );
};

export default ProductEditPage;