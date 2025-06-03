import React from 'react';
import { Product } from '../types/Product';
import { useNavigate } from 'react-router-dom';
import { deleteProduct } from '../../services/productService';

interface ProductItemProps {
  product: Product;
  onDelete: (id: string) => void;
}

const ProductItem: React.FC<ProductItemProps> = ({ product, onDelete }) => {
  const navigate = useNavigate();

  const handleDelete = async () => {
    try {
      await deleteProduct(product.id);
      onDelete(product.id);
    } catch (error) {
      console.error('Erro ao deletar produto:', error);
    }
  };

  return (
    <div style={{
      border: '1px solid #e2e8f0',
      borderRadius: '8px',
      padding: '16px',
      marginBottom: '16px',
      backgroundColor: 'white',
      boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)'
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <h3 style={{ margin: '0 0 8px 0', fontSize: '18px', color: '#2d3748' }}>
          {product.name}
        </h3>
        <span style={{ color: '#4a5568', fontWeight: 'bold' }}>
            R$ {Number(product.price).toFixed(2)}
            </span>
      </div>
      
      <p style={{ color: '#4a5568', margin: '8px 0' }}>
        {product.description}
      </p>
      
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <span style={{ 
            backgroundColor: '#edf2f7',
            padding: '4px 8px',
            borderRadius: '4px',
            fontSize: '14px',
            color: '#4a5568'
          }}>
            {product.category}
          </span>
          <span style={{ 
            marginLeft: '8px',
            backgroundColor: product.stock > 0 ? '#f0fff4' : '#fff5f5',
            color: product.stock > 0 ? '#2f855a' : '#c53030',
            padding: '4px 8px',
            borderRadius: '4px',
            fontSize: '14px'
          }}>
            {product.stock > 0 ? `Em estoque: ${product.stock}` : 'Esgotado'}
          </span>
        </div>
        
<div style={{ display: 'flex', gap: '8px' }}>
  <button
    onClick={() => navigate(`/products/edit/${product.id}`)}
    style={{
      backgroundColor: '#4299e1',
      color: 'white',
      border: 'none',
      borderRadius: '4px',
      padding: '6px 12px',
      cursor: 'pointer'
    }}
  >
    Editar
  </button>

  <button
    onClick={handleDelete}
    style={{
      backgroundColor: '#f56565',
      color: 'white',
      border: 'none',
      borderRadius: '4px',
      padding: '6px 12px',
      cursor: 'pointer'
    }}
  >
    Excluir
  </button>

        <button
        onClick={() =>
            navigate('/checkout', {
            state: {
                product: {
                id: product.id,
                name: product.name,
                description: product.description,
                price: product.price
                }
            }
            })
        }
        >
        Levar para o checkout
        </button>
</div>

      </div>
    </div>
  );
};

export default ProductItem;