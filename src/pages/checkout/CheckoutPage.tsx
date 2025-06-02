import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { useLocation } from 'react-router-dom';

type PaymentMethod = 'credit-card' | 'pix' | 'boleto';

export default function CheckoutPage() {
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('credit-card');

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    address: "",
    city: "",
    postalCode: "",
    country: "",
    // Campos de cartão de crédito
    cardName: "",
    cardNumber: "",
    cardExpiry: "",
    cardCvc: ""
  });
  const location = useLocation();
  const product = location.state?.product as Product;
    type Product = {
      name: string;
      description: string;
      price: number;
    };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handlePaymentMethodChange = (method: PaymentMethod) => {
    setPaymentMethod(method);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Simular diferentes mensagens baseadas no método de pagamento
      if (paymentMethod === 'credit-card') {
        toast.success("Pagamento com cartão processado com sucesso!");
      } else if (paymentMethod === 'pix') {
        toast.success("QR Code do PIX gerado com sucesso!");
      } else {
        toast.success("Boleto gerado com sucesso!");
      }
      
      navigate("/order-confirmation");
    } catch (error) {
      toast.error("Erro ao processar o pagamento. Tente novamente.");
    } finally {
      setIsProcessing(false);
    }
  };

  // Estilos
  const styles = {
    container: {
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
      padding: '20px',
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif"
    },
    mainCard: {
      width: '100%',
      maxWidth: '800px',
      backgroundColor: 'white',
      borderRadius: '16px',
      boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)',
      overflow: 'hidden'
    },
    header: {
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      padding: '28px',
      color: 'white',
      textAlign: 'center'
    },
    headerTitle: {
      fontSize: '28px',
      fontWeight: '700',
      marginBottom: '8px'
    },
    headerSubtitle: {
      fontSize: '14px',
      opacity: '0.9'
    },
    contentWrapper: {
      display: 'flex',
      flexDirection: 'column' as const,
    },
    formContainer: {
      padding: '32px',
      flex: '1.5'
    },
    summaryContainer: {
      padding: '32px',
      backgroundColor: '#f8fafc',
      flex: '1',
      borderTop: '1px solid #e2e8f0'
    },
    inputLabel: {
      display: 'block',
      fontSize: '14px',
      fontWeight: '600',
      color: '#4a5568',
      marginBottom: '8px'
    },
    inputField: {
      width: '100%',
      padding: '12px 16px',
      borderRadius: '8px',
      border: '2px solid #e2e8f0',
      fontSize: '14px',
      outline: 'none',
      transition: 'all 0.3s ease',
      boxSizing: 'border-box' as const
    },
    sectionTitle: {
      fontSize: '18px',
      fontWeight: '600',
      color: '#4a5568',
      marginBottom: '16px'
    },
    grid2Cols: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: '16px'
    },
    submitButton: {
      width: '100%',
      padding: '16px',
      backgroundColor: '#667eea',
      color: 'white',
      border: 'none',
      borderRadius: '8px',
      fontSize: '16px',
      fontWeight: '600',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: '20px'
    },
    deliveryInfo: {
      backgroundColor: '#ebf8ff',
      padding: '16px',
      borderRadius: '8px',
      border: '1px solid #bee3f8',
      color: '#4a5568',
      fontSize: '14px',
      marginTop: '20px'
    },
    paymentMethodCard: {
      border: '2px solid #e2e8f0',
      borderRadius: '8px',
      padding: '16px',
      marginBottom: '16px',
      cursor: 'pointer',
      transition: 'all 0.2s ease'
    },
    paymentMethodCardSelected: {
      border: '2px solid #667eea',
      backgroundColor: '#f0f4ff'
    },
    paymentMethodTitle: {
      fontSize: '16px',
      fontWeight: '600',
      color: '#4a5568',
      marginBottom: '8px',
      display: 'flex',
      alignItems: 'center',
      gap: '8px'
    },
    paymentMethodDescription: {
      fontSize: '14px',
      color: '#718096'
    },
    paymentIcon: {
      width: '24px',
      height: '24px'
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.mainCard}>
        {/* Header */}
          <div style={{ marginTop: '20px', backgroundColor: '#edf2f7', padding: '6px',}}>
        <h3 style={{ marginBottom: '10px', fontSize: '26px', color: '#2d3748' }}>Resumo do Produto</h3>
        {product ? (
          <>
            <p><strong>Produto:</strong> {product.name}</p>
            <p><strong>Descrição:</strong> {product.description}</p>
            <p><strong>Preço:</strong> R$ {Number(product.price).toFixed(2)}</p>
          </>
        ) : (
          <p style={{ color: '#e53e3e' }}>Produto não carregado corretamente. Volte e selecione um produto.</p>
        )}
      </div>
        <div style={styles.header}>
          <h1 style={styles.headerTitle}>Finalize seu Pedido</h1>
          <p style={styles.headerSubtitle}>Preencha os detalhes para concluir sua compra</p>
        </div>

        <div style={styles.contentWrapper}>
          {/* Formulário */}
          <div style={styles.formContainer}>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <h2 style={styles.sectionTitle}>Informações de Entrega</h2>

              <div>
                <label htmlFor="fullName" style={styles.inputLabel}>Nome Completo</label>
                <input
                  id="fullName"
                  name="fullName"
                  type="text"
                  required
                  value={formData.fullName}
                  onChange={handleChange}
                  style={styles.inputField}
                  placeholder="Digite seu nome completo"
                />
              </div>

              <div>
                <label htmlFor="email" style={styles.inputLabel}>E-mail</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  style={styles.inputField}
                  placeholder="seu@email.com"
                />
              </div>

              <div>
                <label htmlFor="address" style={styles.inputLabel}>Endereço</label>
                <input
                  id="address"
                  name="address"
                  type="text"
                  required
                  value={formData.address}
                  onChange={handleChange}
                  style={styles.inputField}
                  placeholder="Rua, número, complemento"
                />
              </div>

              <div style={styles.grid2Cols}>
                <div>
                  <label htmlFor="city" style={styles.inputLabel}>Cidade</label>
                  <input
                    id="city"
                    name="city"
                    type="text"
                    required
                    value={formData.city}
                    onChange={handleChange}
                    style={styles.inputField}
                    placeholder="Sua cidade"
                  />
                </div>

                <div>
                  <label htmlFor="postalCode" style={styles.inputLabel}>CEP</label>
                  <input
                    id="postalCode"
                    name="postalCode"
                    type="text"
                    required
                    value={formData.postalCode}
                    onChange={handleChange}
                    style={styles.inputField}
                    placeholder="00000-000"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="country" style={styles.inputLabel}>País</label>
                <input
                  id="country"
                  name="country"
                  type="text"
                  required
                  value={formData.country}
                  onChange={handleChange}
                  style={styles.inputField}
                  placeholder="Seu país"
                />
              </div>

              <h2 style={styles.sectionTitle}>Método de Pagamento</h2>

              {/* Opções de Pagamento */}
              <div 
                style={{ 
                  ...styles.paymentMethodCard, 
                  ...(paymentMethod === 'credit-card' ? styles.paymentMethodCardSelected : {}) 
                }}
                onClick={() => handlePaymentMethodChange('credit-card')}
              >
                <h3 style={styles.paymentMethodTitle}>
                  <svg style={styles.paymentIcon} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M20 4H4C2.89 4 2.01 4.89 2.01 6L2 18C2 19.11 2.89 20 4 20H20C21.11 20 22 19.11 22 18V6C22 4.89 21.11 4 20 4ZM20 18H4V12H20V18ZM20 8H4V6H20V8Z" fill="#4A5568"/>
                  </svg>
                  Cartão de Crédito
                </h3>
                <p style={styles.paymentMethodDescription}>Pague com cartão de crédito em até 12x</p>
                
                {paymentMethod === 'credit-card' && (
                  <div style={{ marginTop: '16px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    <div>
                      <label htmlFor="cardName" style={styles.inputLabel}>Nome no Cartão</label>
                      <input
                        id="cardName"
                        name="cardName"
                        type="text"
                        required
                        value={formData.cardName}
                        onChange={handleChange}
                        style={styles.inputField}
                        placeholder="Como no cartão"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="cardNumber" style={styles.inputLabel}>Número do Cartão</label>
                      <input
                        id="cardNumber"
                        name="cardNumber"
                        type="text"
                        required
                        value={formData.cardNumber}
                        onChange={handleChange}
                        style={styles.inputField}
                        placeholder="0000 0000 0000 0000"
                      />
                    </div>

                    <div style={styles.grid2Cols}>
                      <div>
                        <label htmlFor="cardExpiry" style={styles.inputLabel}>Validade</label>
                        <input
                          id="cardExpiry"
                          name="cardExpiry"
                          type="text"
                          required
                          value={formData.cardExpiry}
                          onChange={handleChange}
                          style={styles.inputField}
                          placeholder="MM/AA"
                        />
                      </div>

                      <div>
                        <label htmlFor="cardCvc" style={styles.inputLabel}>Código de Segurança</label>
                        <input
                          id="cardCvc"
                          name="cardCvc"
                          type="text"
                          required
                          value={formData.cardCvc}
                          onChange={handleChange}
                          style={styles.inputField}
                          placeholder="CVC"
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <div 
                style={{ 
                  ...styles.paymentMethodCard, 
                  ...(paymentMethod === 'pix' ? styles.paymentMethodCardSelected : {}) 
                }}
                onClick={() => handlePaymentMethodChange('pix')}
              >
                <h3 style={styles.paymentMethodTitle}>
                  <svg style={styles.paymentIcon} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 20C7.59 20 4 16.41 4 12C4 7.59 7.59 4 12 4C16.41 4 20 7.59 20 12C20 16.41 16.41 20 12 20Z" fill="#4A5568"/>
                    <path d="M12 6C8.69 6 6 8.69 6 12C6 15.31 8.69 18 12 18C15.31 18 18 15.31 18 12C18 8.69 15.31 6 12 6ZM12 16C9.79 16 8 14.21 8 12C8 9.79 9.79 8 12 8C14.21 8 16 9.79 16 12C16 14.21 14.21 16 12 16Z" fill="#4A5568"/>
                  </svg>
                  PIX
                </h3>
                <p style={styles.paymentMethodDescription}>Pagamento instantâneo com chave PIX</p>
                
                {paymentMethod === 'pix' && (
                  <div style={{ marginTop: '16px', textAlign: 'center' }}>
                    <p style={{ color: '#718096', marginBottom: '16px' }}>Ao confirmar o pedido, geraremos um QR Code para pagamento</p>
                    <div style={{ 
                      backgroundColor: '#f0f4ff', 
                      padding: '20px', 
                      borderRadius: '8px',
                      display: 'inline-block'
                    }}>
                      <svg width="120" height="120" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect x="3" y="3" width="18" height="18" rx="2" stroke="#667eea" strokeWidth="2"/>
                        <rect x="7" y="7" width="4" height="4" fill="#667eea"/>
                        <rect x="7" y="13" width="4" height="4" fill="#667eea"/>
                        <rect x="13" y="7" width="4" height="4" fill="#667eea"/>
                        <rect x="13" y="13" width="4" height="4" fill="#667eea"/>
                      </svg>
                    </div>
                  </div>
                )}
              </div>

              <div 
                style={{ 
                  ...styles.paymentMethodCard, 
                  ...(paymentMethod === 'boleto' ? styles.paymentMethodCardSelected : {}) 
                }}
                onClick={() => handlePaymentMethodChange('boleto')}
              >
                <h3 style={styles.paymentMethodTitle}>
                  <svg style={styles.paymentIcon} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M20 4H4C2.89 4 2 4.89 2 6V18C2 19.11 2.89 20 4 20H20C21.11 20 22 19.11 22 18V6C22 4.89 21.11 4 20 4ZM20 18H4V12H20V18ZM20 8H4V6H20V8Z" fill="#4A5568"/>
                    <path d="M14 15H16V17H14V15Z" fill="#4A5568"/>
                    <path d="M10 15H12V17H10V15Z" fill="#4A5568"/>
                  </svg>
                  Boleto Bancário
                </h3>
                <p style={styles.paymentMethodDescription}>Pague em qualquer agência bancária ou internet banking</p>
                
                {paymentMethod === 'boleto' && (
                  <div style={{ marginTop: '16px', textAlign: 'center' }}>
                    <p style={{ color: '#718096', marginBottom: '16px' }}>Ao confirmar o pedido, geraremos um boleto para pagamento</p>
                    <div style={{ 
                      backgroundColor: '#f0f4ff', 
                      padding: '20px', 
                      borderRadius: '8px',
                      display: 'inline-block'
                    }}>
                      <svg width="120" height="60" viewBox="0 0 120 60" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect x="1" y="1" width="118" height="58" rx="2" stroke="#667eea" strokeWidth="2"/>
                        <rect x="10" y="10" width="100" height="10" rx="1" fill="#667eea" opacity="0.3"/>
                        <rect x="10" y="25" width="80" height="5" rx="1" fill="#667eea" opacity="0.3"/>
                        <rect x="10" y="35" width="60" height="5" rx="1" fill="#667eea" opacity="0.3"/>
                        <rect x="10" y="45" width="40" height="5" rx="1" fill="#667eea" opacity="0.3"/>
                      </svg>
                    </div>
                  </div>
                )}
              </div>

              <button
                type="submit"
                disabled={isProcessing}
                style={{
                  ...styles.submitButton,
                  opacity: isProcessing ? '0.7' : '1',
                  backgroundColor: isProcessing ? '#5a67d8' : '#667eea'
                }}
              >
                {isProcessing ? (
                  <>
                    <svg style={{
                      animation: 'spin 1s linear infinite',
                      marginRight: '8px',
                      width: '20px',
                      height: '20px'
                    }} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <circle cx="12" cy="12" r="10" stroke="white" strokeOpacity="0.25" strokeWidth="4"></circle>
                      <path d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" fill="white" fillOpacity="0.75"></path>
                    </svg>
                    Processando...
                  </>
                ) : 'Finalizar Compra'}
              </button>
            </form>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @media (min-width: 768px) {
          .content-wrapper {
            flex-direction: row;
          }
        }
      `}</style>
    </div>
  );
}