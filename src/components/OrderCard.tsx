import { Clock, CheckCircle, ChefHat, Package, Printer } from 'lucide-react';
import type { Order } from '../services/supabaseClient';

interface OrderCardProps {
  order: Order;
  onStatusChange?: (id: number, status: string) => void;
  showActions?: boolean;
}

const statusConfig = {
  pending: { color: 'bg-yellow-100 text-yellow-800', icon: Clock, label: 'Pending' },
  cooking: { color: 'bg-orange-100 text-orange-800', icon: ChefHat, label: 'Cooking' },
  ready: { color: 'bg-green-100 text-green-800', icon: Package, label: 'Ready' },
  completed: { color: 'bg-blue-100 text-blue-800', icon: CheckCircle, label: 'Completed' },
};

export function OrderCard({ order, onStatusChange, showActions = true }: OrderCardProps) {
  const status = statusConfig[order.status];
  const StatusIcon = status.icon;

  const handlePrint = () => {
    const printWindow = window.open('', '_blank');
    if (printWindow) {
      printWindow.document.write(`
        <html>
          <head><title>Receipt - Order #${order.id}</title></head>
          <body style="font-family: monospace; padding: 20px; max-width: 300px;">
            <h2 style="text-align: center;">GourmetHub</h2>
            <p style="text-align: center;">Receipt</p>
            <hr>
            <p>Order #${order.id}</p>
            <p>Table: ${order.table_number || 'N/A'}</p>
            <p>Customer: ${order.customer_name}</p>
            <p>Date: ${new Date(order.created_at).toLocaleString()}</p>
            <hr>
            <table style="width: 100%;">
              ${order.items.map(item => `
                <tr>
                  <td>${item.quantity}x ${item.name}</td>
                  <td style="text-align: right;">$${(item.price * item.quantity).toFixed(2)}</td>
                </tr>
              `).join('')}
            </table>
            <hr>
            <p style="text-align: right; font-size: 18px; font-weight: bold;">
              Total: $${order.total_price.toFixed(2)}
            </p>
            <p style="text-align: center; margin-top: 20px;">Thank you for dining with us!</p>
          </body>
        </html>
      `);
      printWindow.document.close();
      printWindow.print();
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-5">
      <div className="flex justify-between items-start mb-4">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-lg font-bold text-slate-800">Order #{order.id}</h3>
            <span className={`px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1 ${status.color}`}>
              <StatusIcon className="w-3 h-3" />
              {status.label}
            </span>
          </div>
          <p className="text-slate-600 text-sm">{order.customer_name} • {order.phone}</p>
          {order.table_number && <p className="text-slate-600 text-sm">Table #{order.table_number}</p>}
        </div>
        <span className="text-xl font-bold text-amber-600">${order.total_price.toFixed(2)}</span>
      </div>

      <div className="bg-slate-50 rounded-lg p-3 mb-4">
        <h4 className="text-sm font-medium text-slate-700 mb-2">Items:</h4>
        <ul className="space-y-1">
          {order.items.map((item, idx) => (
            <li key={idx} className="text-sm text-slate-600 flex justify-between">
              <span>{item.quantity}x {item.name}</span>
              <span>${(item.price * item.quantity).toFixed(2)}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="flex items-center justify-between">
        <p className="text-xs text-slate-400">
          {new Date(order.created_at).toLocaleString()}
        </p>
        <div className="flex gap-2">
          {order.status === 'completed' && (
            <button
              onClick={handlePrint}
              className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-sm font-medium flex items-center gap-1 transition"
            >
              <Printer className="w-4 h-4" />
              Print
            </button>
          )}
          {showActions && onStatusChange && order.status !== 'completed' && (
            <>
              {order.status === 'pending' && (
                <button
                  onClick={() => onStatusChange(order.id, 'cooking')}
                  className="px-3 py-1.5 bg-orange-500 hover:bg-orange-600 text-white rounded-lg text-sm font-medium transition"
                >
                  Start Cooking
                </button>
              )}
              {order.status === 'cooking' && (
                <button
                  onClick={() => onStatusChange(order.id, 'ready')}
                  className="px-3 py-1.5 bg-green-500 hover:bg-green-600 text-white rounded-lg text-sm font-medium transition"
                >
                  Mark Ready
                </button>
              )}
              {order.status === 'ready' && (
                <button
                  onClick={() => onStatusChange(order.id, 'completed')}
                  className="px-3 py-1.5 bg-blue-500 hover:bg-blue-600 text-white rounded-lg text-sm font-medium transition"
                >
                  Complete
                </button>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
