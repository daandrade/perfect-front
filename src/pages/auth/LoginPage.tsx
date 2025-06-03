import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const loginSchema = z.object({
  email: z.string().email("Por favor, insira um e-mail válido"),
  password: z.string().min(6, "A senha deve ter pelo menos 6 caracteres"),
});

type LoginFormData = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    try {
      const response = await axios.post("http://localhost:8000/api/auth/login", data);
      const token = response.data.token;
      localStorage.setItem("token", token);
      toast.success("Login realizado com sucesso!");
      navigate("/products");
    } catch (err: any) {
      const message = err?.response?.data?.message ?? "Erro ao fazer login. Verifique suas credenciais.";
      toast.error(message);
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
      padding: '20px',
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif"
    }}>
      <div style={{
        width: '100%',
        maxWidth: '420px',
        backgroundColor: 'white',
        borderRadius: '16px',
        boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)',
        overflow: 'hidden'
      }}>
        {/* Header */}
        <div style={{
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          padding: '32px',
          color: 'white',
          textAlign: 'center'
        }}>
          <h1 style={{
            fontSize: '28px',
            fontWeight: '700',
            marginBottom: '8px'
          }}>Bem-vindo de volta</h1>
          <p style={{
            fontSize: '14px',
            opacity: '0.9'
          }}>Faça login para acessar sua conta</p>
        </div>

        {/* Form */}
        <div style={{ padding: '32px' }}>
          <form onSubmit={handleSubmit(onSubmit)} style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '24px'
          }}>
            <div>
              <label htmlFor="email" style={{
                display: 'block',
                fontSize: '14px',
                fontWeight: '600',
                color: '#4a5568',
                marginBottom: '8px'
              }}>E-mail</label>
              <div style={{ position: 'relative' }}>
                <input
                  id="email"
                  type="email"
                  {...register("email")}
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    borderRadius: '8px',
                    border: errors.email ? '2px solid #e53e3e' : '2px solid #e2e8f0',
                    fontSize: '14px',
                    outline: 'none',
                    transition: 'all 0.3s ease',
                    boxSizing: 'border-box'
                  }}
                  placeholder="seu@email.com"
                />
                {errors.email && (
                  <div style={{
                    position: 'absolute',
                    right: '12px',
                    top: '50%',
                    transform: 'translateY(-50%)'
                  }}>
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M10 0C4.48 0 0 4.48 0 10C0 15.52 4.48 20 10 20C15.52 20 20 15.52 20 10C20 4.48 15.52 0 10 0ZM11 15H9V13H11V15ZM11 11H9V5H11V11Z" fill="#E53E3E"/>
                    </svg>
                  </div>
                )}
              </div>
              {errors.email && (
                <p style={{
                  marginTop: '8px',
                  fontSize: '12px',
                  color: '#e53e3e'
                }}>{errors.email.message}</p>
              )}
            </div>

            <div>
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '8px'
              }}>
                <label htmlFor="password" style={{
                  fontSize: '14px',
                  fontWeight: '600',
                  color: '#4a5568'
                }}>Senha</label>
                <a href="#" style={{
                  fontSize: '12px',
                  color: '#667eea',
                  textDecoration: 'none',
                  fontWeight: '500'
                }}>Esqueceu a senha?</a>
              </div>
              <div style={{ position: 'relative' }}>
                <input
                  id="password"
                  type="password"
                  {...register("password")}
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    borderRadius: '8px',
                    border: errors.password ? '2px solid #e53e3e' : '2px solid #e2e8f0',
                    fontSize: '14px',
                    outline: 'none',
                    transition: 'all 0.3s ease',
                    boxSizing: 'border-box'
                  }}
                  placeholder="••••••••"
                />
                {errors.password && (
                  <div style={{
                    position: 'absolute',
                    right: '12px',
                    top: '50%',
                    transform: 'translateY(-50%)'
                  }}>
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M10 0C4.48 0 0 4.48 0 10C0 15.52 4.48 20 10 20C15.52 20 20 15.52 20 10C20 4.48 15.52 0 10 0ZM11 15H9V13H11V15ZM11 11H9V5H11V11Z" fill="#E53E3E"/>
                    </svg>
                  </div>
                )}
              </div>
              {errors.password && (
                <p style={{
                  marginTop: '8px',
                  fontSize: '12px',
                  color: '#e53e3e'
                }}>{errors.password.message}</p>
              )}
            </div>

            <div style={{
              display: 'flex',
              alignItems: 'center'
            }}>
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                style={{
                  width: '16px',
                  height: '16px',
                  accentColor: '#667eea',
                  marginRight: '8px'
                }}
              />
              <label htmlFor="remember-me" style={{
                fontSize: '14px',
                color: '#4a5568'
              }}>Lembrar de mim</label>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              style={{
                width: '100%',
                padding: '14px',
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
                opacity: isSubmitting ? '0.7' : '1'
              }}
              onMouseOver={(e) => !isSubmitting && (e.currentTarget.style.backgroundColor = '#5a67d8')}
              onMouseOut={(e) => !isSubmitting && (e.currentTarget.style.backgroundColor = '#667eea')}
            >
              {isSubmitting ? (
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
                  Entrando...
                </>
              ) : 'Entrar'}
            </button>
          </form>

          <div style={{
            marginTop: '24px',
            position: 'relative'
          }}>
            <div style={{
              position: 'absolute',
              top: '50%',
              left: '0',
              right: '0',
              height: '1px',
              backgroundColor: '#e2e8f0',
              transform: 'translateY(-50%)'
            }}></div>
            <div style={{
              position: 'relative',
              textAlign: 'center'
            }}>
              <span style={{
                display: 'inline-block',
                padding: '0 12px',
                backgroundColor: 'white',
                color: '#718096',
                fontSize: '14px'
              }}>Ou continue com</span>
            </div>
          </div>

          <div style={{
            marginTop: '24px',
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '12px'
          }}>
            <button
              type="button"
              style={{
                width: '100%',
                padding: '10px',
                backgroundColor: 'white',
                border: '1px solid #e2e8f0',
                borderRadius: '8px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                transition: 'all 0.3s ease'
              }}
              onMouseOver={(e) => e.currentTarget.backgroundColor = '#f7fafc'}
              onMouseOut={(e) => e.currentTarget.backgroundColor = 'white'}
            >
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M10 0C4.477 0 0 4.477 0 10C0 15.523 4.477 20 10 20C15.523 20 20 15.523 20 10C20 4.477 15.523 0 10 0ZM10.999 15.932C10.999 16.52 10.511 17 9.916 17H9.074C8.48 17 7.991 16.52 7.991 15.932V15.089C7.991 14.501 8.48 14.021 9.074 14.021H9.916C10.511 14.021 10.999 14.501 10.999 15.089V15.932ZM12.567 10.412C12.308 11.248 11.547 11.826 10.672 11.826H9.328C8.453 11.826 7.692 11.248 7.433 10.412C7.317 10.042 7.574 9.667 7.958 9.667H8.235C8.699 9.667 9.089 9.982 9.227 10.426C9.342 10.798 9.685 11.042 10.072 11.042H10.672C11.059 11.042 11.402 10.798 11.517 10.426C11.655 9.982 12.045 9.667 12.509 9.667H12.786C13.17 9.667 13.427 10.042 13.311 10.412H13.311Z" fill="#4A5568"/>
              </svg>
            </button>
            <button
              type="button"
              style={{
                width: '100%',
                padding: '10px',
                backgroundColor: 'white',
                border: '1px solid #e2e8f0',
                borderRadius: '8px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                transition: 'all 0.3s ease'
              }}
              onMouseOver={(e) => e.currentTarget.backgroundColor = '#f7fafc'}
              onMouseOut={(e) => e.currentTarget.backgroundColor = 'white'}
            >
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M6.29 18.251C13.837 18.251 17.965 11.998 17.965 6.576C17.965 6.398 17.965 6.221 17.953 6.043C18.756 5.458 19.449 4.741 20 3.92C19.252 4.262 18.457 4.484 17.643 4.577C18.5 4.058 19.141 3.209 19.448 2.209C18.642 2.69 17.761 3.034 16.842 3.21C16.088 2.399 15.016 1.92 13.846 1.92C11.576 1.92 9.748 3.748 9.748 6.018C9.748 6.341 9.784 6.657 9.855 6.961C6.44 6.789 3.416 5.111 1.392 2.598C1.038 3.179 0.831 3.848 0.831 4.557C0.831 5.892 1.562 7.079 2.652 7.787C1.988 7.765 1.356 7.583 0.8 7.275V7.327C0.8 9.391 2.178 11.106 4.092 11.49C3.748 11.585 3.387 11.635 3.016 11.635C2.75 11.635 2.492 11.608 2.239 11.56C2.765 13.252 4.279 14.476 6.075 14.511C4.67 15.635 2.898 16.318 0.981 16.318C0.654 16.318 0.332 16.3 0 16.266C1.816 17.456 3.968 18.084 6.29 18.084" fill="#4A5568"/>
              </svg>
            </button>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}