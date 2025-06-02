import React from "react";

const orders = [
  {
    id: 1,
    customer: "João Silva",
    product: "Plano Mensal",
    amount: 49.90,
    status: "Pago",
    date: "2025-06-02"
  },
  {
    id: 2,
    customer: "Maria Oliveira",
    product: "Plano Anual",
    amount: 499.90,
    status: "Pendente",
    date: "2025-06-01"
  },
  {
    id: 3,
    customer: "Carlos Souza",
    product: "Plano Trimestral",
    amount: 139.90,
    status: "Cancelado",
    date: "2025-05-29"
  }
];

export default function OrdersPage() {
  return (
    <div style={{ padding: "40px", backgroundColor: "#f7fafc", minHeight: "100vh" }}>
      <h1 style={{ fontSize: "28px", fontWeight: "700", marginBottom: "24px", color: "#2d3748" }}>
        Lista de Pedidos
      </h1>

      <div style={{
        backgroundColor: "white",
        borderRadius: "8px",
        boxShadow: "0 0 12px rgba(0, 0, 0, 0.05)",
        overflow: "hidden"
      }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead style={{ backgroundColor: "#edf2f7", textAlign: "left" }}>
            <tr>
              <th style={thStyle}>#</th>
              <th style={thStyle}>Cliente</th>
              <th style={thStyle}>Produto</th>
              <th style={thStyle}>Valor</th>
              <th style={thStyle}>Status</th>
              <th style={thStyle}></th>
            </tr>
          </thead>
          <tbody>
            {orders.map(order => (
              <tr key={order.id} style={{ borderBottom: "1px solid #e2e8f0" }}>
                <td style={tdStyle}>{order.id}</td>
                <td style={tdStyle}>{order.customer}</td>
                <td style={tdStyle}>{order.product}</td>
                <td style={tdStyle}>R$ {order.amount.toFixed(2)}</td>
                <td style={tdStyle}>
                  <span style={{
                    padding: "4px 10px",
                    borderRadius: "12px",
                    backgroundColor: getStatusColor(order.status),
                    color: "#fff",
                    fontSize: "12px",
                    fontWeight: 600
                  }}>
                    {order.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

const thStyle = {
  padding: "16px",
  fontWeight: "600",
  fontSize: "14px",
  color: "#4a5568"
};

const tdStyle = {
  padding: "16px",
  fontSize: "14px",
  color: "#2d3748"
};

function getStatusColor(status: string): string {
  switch (status) {
    case "Pago": return "#38a169";      // Verde
    case "Pendente": return "#d69e2e";  // Amarelo
    case "Cancelado": return "#e53e3e"; // Vermelho
    default: return "#718096";          // Cinza
  }
}
