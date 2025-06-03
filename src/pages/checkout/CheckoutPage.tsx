import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { useLocation } from 'react-router-dom';

type PaymentMethod = 'credit_card' | 'pix' | 'boleto';

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
}

interface OrderResponse {
  order: {
    id: string;
    order_number: string;
    status: string;
  };
  pix?: {
    encodedImage: string;
    payload: string;
  };
  boleto?: {
    identificationField: string;
    barCode: string;
    bankSlipUrl: string;
    dueDate: string;
  };
  credit_card?: {
    status: string;
    authorized: boolean;
    message: string;
    last4: string;
    brand: string;
  };
}

export default function CheckoutPage() {
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('credit_card');
  const [orderResponse, setOrderResponse] = useState<OrderResponse | null>(null);
  const [showPaymentDetails, setShowPaymentDetails] = useState(false);

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    document: "34547124086", 
    address: "",
    number: "",
    neighborhood: "",
    city: "",
    postalCode: "",
    country: "Brasil", 
    cardName: "",
    cardNumber: "",
    cardExpiry: "",
    cardCvc: "",
    installments: "1"
  });

  const location = useLocation();
  const product = location.state?.product as Product;

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
      const orderData = {
        customer: {
          name: formData.fullName,
          email: formData.email,
          phone: formData.phone,
          document: formData.document,
          address: {
            street: formData.address,
            number: formData.number,
            neighborhood: formData.neighborhood,
            city: formData.city,
            zip_code: formData.postalCode,
            country: formData.country
          }
        },
        payment_method: paymentMethod,
        installments: parseInt(formData.installments),
        items: [{
          product_id: product.id, 
          quantity: 1,
        }],
        credit_card: paymentMethod === 'credit_card' ? {
          holder_name: formData.cardName,
          number: formData.cardNumber.replace(/\s/g, ''),
          expiry_month: formData.cardExpiry.split("/")[0],
          expiry_year: "20" + formData.cardExpiry.split("/")[1],
          cvv: formData.cardCvc
        } : undefined
      };

      const response = await axios.post('http://localhost:8000/api/orders', orderData);
      setOrderResponse(response.data);
      setShowPaymentDetails(true);
      
      if (paymentMethod === 'credit_card') {
        toast.success("Pagamento com cartão processado com sucesso!");
      } else if (paymentMethod === 'pix') {
        toast.success("QR Code do PIX gerado com sucesso!");
      } else {
        toast.success("Boleto gerado com sucesso!");
      }
    } catch (error) {
      console.error('Error creating order:', error);
      toast.error("Erro ao processar o pagamento. Tente novamente.");
    } finally {
      setIsProcessing(false);
    }
  };

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
    },
    paymentDetails: {
      backgroundColor: '#f0fff4',
      padding: '20px',
      borderRadius: '8px',
      border: '1px solid #c6f6d5',
      marginTop: '20px'
    },
    qrCodeImage: {
      maxWidth: '200px',
      margin: '0 auto',
      display: 'block'
    },
    boletoInfo: {
      backgroundColor: '#fffaf0',
      padding: '15px',
      borderRadius: '5px',
      border: '1px solid #feebc8',
      marginTop: '10px'
    }
  };

  if (showPaymentDetails && orderResponse) {
    return (
      <div style={styles.container}>
        <div style={styles.mainCard}>
          <div style={styles.header}>
            <h1 style={styles.headerTitle}>Pedido Realizado com Sucesso!</h1>
            <p style={styles.headerSubtitle}>Aqui estão os detalhes do seu pagamento</p>
          </div>

          <div style={{ padding: '32px' }}>
            <h2 style={styles.sectionTitle}>Resumo do Pedido</h2>
            <p><strong>Número do Pedido:</strong> {orderResponse.order.order_number}</p>
            <p><strong>Status:</strong> {orderResponse.order.status}</p>
            <p><strong>Produto:</strong> {product?.name}</p>
            <p><strong>Valor:</strong> R$ {product?.price.toFixed(2)}</p>

            {paymentMethod === 'pix' && orderResponse.pix && (
              <div style={styles.paymentDetails}>
                <h3 style={styles.sectionTitle}>Pagamento via PIX</h3>
                <p>Escaneie o QR Code abaixo para realizar o pagamento:</p>
                <img 
                  src={`data:image/png;base64,${orderResponse.pix.encodedImage}`} 
                  alt="QR Code PIX" 
                  style={styles.qrCodeImage}
                />
                <p style={{ wordBreak: 'break-all', textAlign: 'center', marginTop: '10px' }}>
                  <strong>Código PIX:</strong> {orderResponse.pix.payload}
                </p>
              </div>
            )}

            {paymentMethod === 'boleto' && orderResponse.boleto && (
              <div style={styles.paymentDetails}>
                <h3 style={styles.sectionTitle}>Pagamento via Boleto</h3>
                <p>Linha digitável:</p>
                <div style={styles.boletoInfo}>
                  {orderResponse.boleto.identificationField}
                </div>
                <p style={{ marginTop: '10px' }}>
                  <strong>Vencimento:</strong> {new Date(orderResponse.boleto.dueDate).toLocaleDateString()}
                </p>
                <a 
                  href={orderResponse.boleto.bankSlipUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  style={{
                    display: 'inline-block',
                    marginTop: '15px',
                    backgroundColor: '#48bb78',
                    color: 'white',
                    padding: '10px 15px',
                    borderRadius: '5px',
                    textDecoration: 'none'
                  }}
                >
                  Visualizar Boleto
                </a>
              </div>
            )}

            {paymentMethod === 'credit_card' && orderResponse.credit_card && (
              <div style={styles.paymentDetails}>
                <h3 style={styles.sectionTitle}>Pagamento via Cartão de Crédito</h3>
                <p><strong>Status:</strong> {orderResponse.credit_card.message}</p>
                <p><strong>Bandeira:</strong> {orderResponse.credit_card.brand}</p>
                <p><strong>Final do cartão:</strong> **** **** **** {orderResponse.credit_card.last4}</p>
              </div>
            )}

            <button
              onClick={() => navigate('/')}
              style={{
                ...styles.submitButton,
                backgroundColor: '#48bb78',
                marginTop: '30px'
              }}
            >
              Voltar para a Loja
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <div style={styles.mainCard}>
        <div style={{ marginTop: '20px', backgroundColor: '#edf2f7', padding: '16px' }}>
          <h3 style={{ marginBottom: '10px', fontSize: '20px', color: '#2d3748' }}>Resumo do Produto</h3>
          {product ? (
            <>
              <p><strong>Produto:</strong> {product.name}</p>
              <p><strong>Descrição:</strong> {product.description}</p>
              <p><strong>Preço:</strong> R$ {product.price.toFixed(2)}</p>
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
          <div style={styles.formContainer}>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <h2 style={styles.sectionTitle}>Informações Pessoais</h2>

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
                <label htmlFor="phone" style={styles.inputLabel}>Telefone</label>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={handleChange}
                  style={styles.inputField}
                  placeholder="(00) 00000-0000"
                />
              </div>

              <h2 style={styles.sectionTitle}>Endereço de Entrega</h2>

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
                  placeholder="Rua, avenida, etc."
                />
              </div>

              <div style={styles.grid2Cols}>
                <div>
                  <label htmlFor="number" style={styles.inputLabel}>Número</label>
                  <input
                    id="number"
                    name="number"
                    type="text"
                    required
                    value={formData.number}
                    onChange={handleChange}
                    style={styles.inputField}
                    placeholder="Número"
                  />
                </div>

                <div>
                  <label htmlFor="neighborhood" style={styles.inputLabel}>Bairro</label>
                  <input
                    id="neighborhood"
                    name="neighborhood"
                    type="text"
                    required
                    value={formData.neighborhood}
                    onChange={handleChange}
                    style={styles.inputField}
                    placeholder="Bairro"
                  />
                </div>
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

              <h2 style={styles.sectionTitle}>Método de Pagamento</h2>

              <div 
                style={{ 
                  ...styles.paymentMethodCard, 
                  ...(paymentMethod === 'credit_card' ? styles.paymentMethodCardSelected : {}) 
                }}
                onClick={() => handlePaymentMethodChange('credit_card')}
              >
                <h3 style={styles.paymentMethodTitle}>
                  <svg style={styles.paymentIcon} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M20 4H4C2.89 4 2.01 4.89 2.01 6L2 18C2 19.11 2.89 20 4 20H20C21.11 20 22 19.11 22 18V6C22 4.89 21.11 4 20 4ZM20 18H4V12H20V18ZM20 8H4V6H20V8Z" fill="#4A5568"/>
                  </svg>
                  Cartão de Crédito
                </h3>
                <p style={styles.paymentMethodDescription}>Pague com cartão de crédito em até 12x</p>
                
                {paymentMethod === 'credit_card' && (
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

                    <div>
                      <label htmlFor="installments" style={styles.inputLabel}>Parcelas</label>
                      <select
                        id="installments"
                        name="installments"
                        value={formData.installments}
                        onChange={(e) => setFormData({...formData, installments: e.target.value})}
                        style={styles.inputField}
                      >
                        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map(num => (
                          <option key={num} value={num}>{num}x de R$ {(product.price / num).toFixed(2)}</option>
                        ))}
                      </select>
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