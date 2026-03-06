import { Users, CheckCircle, Clock, XCircle } from 'lucide-react';
import type { Table } from '../services/supabaseClient';

interface TableCardProps {
  table: Table;
  onStatusChange?: (id: number, status: string) => void;
}

const statusConfig = {
  available: { color: 'bg-green-100 text-green-800 border-green-300', icon: CheckCircle, label: 'Available' },
  reserved: { color: 'bg-yellow-100 text-yellow-800 border-yellow-300', icon: Clock, label: 'Reserved' },
  occupied: { color: 'bg-red-100 text-red-800 border-red-300', icon: XCircle, label: 'Occupied' },
};

export function TableCard({ table, onStatusChange }: TableCardProps) {
  const status = statusConfig[table.status];
  const StatusIcon = status.icon;

  return (
    <div className={`bg-white rounded-xl shadow-md p-5 border-2 ${status.color.split(' ')[2]}`}>
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-2xl font-bold text-slate-800">Table {table.table_number}</h3>
          <div className="flex items-center gap-1 text-slate-600 mt-1">
            <Users className="w-4 h-4" />
            <span className="text-sm">{table.seats} seats</span>
          </div>
        </div>
        <span className={`px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1 ${status.color}`}>
          <StatusIcon className="w-3 h-3" />
          {status.label}
        </span>
      </div>

      {onStatusChange && (
        <div className="flex gap-2 mt-4">
          <button
            onClick={() => onStatusChange(table.id, 'available')}
            className={`flex-1 py-2 rounded-lg text-sm font-medium transition ${
              table.status === 'available'
                ? 'bg-green-500 text-white'
                : 'bg-slate-100 hover:bg-green-100 text-slate-600'
            }`}
          >
            Available
          </button>
          <button
            onClick={() => onStatusChange(table.id, 'reserved')}
            className={`flex-1 py-2 rounded-lg text-sm font-medium transition ${
              table.status === 'reserved'
                ? 'bg-yellow-500 text-white'
                : 'bg-slate-100 hover:bg-yellow-100 text-slate-600'
            }`}
          >
            Reserved
          </button>
          <button
            onClick={() => onStatusChange(table.id, 'occupied')}
            className={`flex-1 py-2 rounded-lg text-sm font-medium transition ${
              table.status === 'occupied'
                ? 'bg-red-500 text-white'
                : 'bg-slate-100 hover:bg-red-100 text-slate-600'
            }`}
          >
            Occupied
          </button>
        </div>
      )}
    </div>
  );
}
