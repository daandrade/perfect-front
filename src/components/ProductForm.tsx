import React, { useState, useEffect } from 'react';
import { Product } from '../types/Product';

interface ProductFormProps {
  initialData?: Product;
  onSubmit: (productData: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>) => Promise<void>;
  isSubmitting: boolean;
}

const ProductForm: React.FC<ProductFormProps> = ({ initialData, onSubmit, isSubmitting }) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: 0,
    category: '',
    stock: 0,
    imageUrl: ''
  });
  const [priceError, setPriceError] = useState('');

  useEffect(() => {
    if (initialData) {
      setFormData({
        name: initialData.name,
        description: initialData.description,
        price: initialData.price,
        category: initialData.category,
        stock: initialData.stock,
        imageUrl: initialData.imageUrl || ''
      });
    }
  }, [initialData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;

    if (name === 'price') {
      const numericValue = parseFloat(value.replace(',', '.')) || 0;
      if (numericValue < 5) {
        setPriceError('O preço mínimo é R$ 5,00');
      } else {
        setPriceError('');
      }
    }

    setFormData(prev => ({
      ...prev,
      [name]: name === 'price' || name === 'stock'
        ? parseFloat(value.replace(',', '.')) || 0 
        : value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.price < 5) {
      setPriceError('O preço mínimo é R$ 5,00');
      return;
    }
    await onSubmit(formData);
  };

  const isFormValid = formData.price >= 5 && 
                     formData.name.trim() !== '' && 
                     formData.description.trim() !== '' && 
                     formData.category.trim() !== '' && 
                     formData.stock >= 0;

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: '600px', margin: '0 auto' }}>
      <div style={{ marginBottom: '16px' }}>
        <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: '#4a5568' }}>
          Nome do Produto
        </label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          style={{
            width: '100%',
            padding: '10px',
            borderRadius: '4px',
            border: '1px solid #e2e8f0',
            fontSize: '16px'
          }}
        />
      </div>

      <div style={{ marginBottom: '16px' }}>
        <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: '#4a5568' }}>
          Descrição
        </label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          required
          rows={4}
          style={{
            width: '100%',
            padding: '10px',
            borderRadius: '4px',
            border: '1px solid #e2e8f0',
            fontSize: '16px'
          }}
        />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
        <div>
          <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: '#4a5568' }}>
            Preço (R$)
          </label>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <span style={{
              padding: '10px',
              backgroundColor: '#edf2f7',
              border: '1px solid #e2e8f0',
              borderTopLeftRadius: '4px',
              borderBottomLeftRadius: '4px',
              fontSize: '16px',
              color: '#4a5568'
            }}>
              R$
            </span>
            <input
              type="text"
              name="price"
              value={formData.price}
              onChange={handleChange}
              inputMode="decimal"
              pattern="^\d+([.,]\d{0,2})?$"
              required
              min="5"
              style={{
                flex: 1,
                padding: '10px',
                borderTopRightRadius: '4px',
                borderBottomRightRadius: '4px',
                border: '1px solid #e2e8f0',
                borderLeft: 'none',
                fontSize: '16px',
                borderColor: priceError ? '#e53e3e' : '#e2e8f0'
              }}
            />
          </div>
          {priceError && (
            <p style={{ color: '#e53e3e', fontSize: '14px', marginTop: '4px' }}>
              {priceError}
            </p>
          )}
        </div>

        <div>
          <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: '#4a5568' }}>
            Estoque
          </label>
          <input
            type="number"
            name="stock"
            value={formData.stock}
            onChange={handleChange}
            min="0"
            required
            style={{
              width: '100%',
              padding: '10px',
              borderRadius: '4px',
              border: '1px solid #e2e8f0',
              fontSize: '16px'
            }}
          />
        </div>
      </div>

      <div style={{ marginBottom: '16px' }}>
        <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: '#4a5568' }}>
          Categoria
        </label>
        <input
          type="text"
          name="category"
          value={formData.category}
          onChange={handleChange}
          required
          style={{
            width: '100%',
            padding: '10px',
            borderRadius: '4px',
            border: '1px solid #e2e8f0',
            fontSize: '16px'
          }}
        />
      </div>

      <div style={{ marginBottom: '16px' }}>
        <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: '#4a5568' }}>
          URL da Imagem (opcional)
        </label>
        <input
          type="url"
          name="imageUrl"
          value={formData.imageUrl}
          onChange={handleChange}
          style={{
            width: '100%',
            padding: '10px',
            borderRadius: '4px',
            border: '1px solid #e2e8f0',
            fontSize: '16px'
          }}
        />
      </div>

      <button
        type="submit"
        disabled={isSubmitting || !isFormValid}
        style={{
          backgroundColor: isFormValid ? '#4299e1' : '#a0aec0',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          padding: '12px 24px',
          fontSize: '16px',
          fontWeight: '600',
          cursor: isFormValid ? 'pointer' : 'not-allowed',
          width: '100%',
          opacity: isSubmitting ? '0.7' : '1'
        }}
      >
        {isSubmitting ? (
          <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <span style={{ marginRight: '8px' }}>Processando...</span>
            <svg
              style={{ animation: 'spin 1s linear infinite', width: '20px', height: '20px' }}
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle cx="12" cy="12" r="10" stroke="white" strokeOpacity="0.25" strokeWidth="4"></circle>
              <path d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" fill="white" fillOpacity="0.75"></path>
            </svg>
          </span>
        ) : initialData ? 'Atualizar Produto' : 'Cadastrar Produto'}
      </button>
    </form>
  );
};

export default ProductForm;