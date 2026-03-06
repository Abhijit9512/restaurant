import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { OrderCard } from '../components/OrderCard';
import { TableCard } from '../components/TableCard';
import { Loader2, Plus, Trash2, Edit2, Package, Utensils, Calendar, Table } from 'lucide-react';
import type { Order, MenuItem, Reservation, Table as TableType } from '../services/supabaseClient';

function AdminOverview() {
  const [stats, setStats] = useState({ orders: 0, menu: 0, reservations: 0, tables: 0 });
  const [recentOrders, setRecentOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const [ordersRes, menuRes, reservRes, tablesRes] = await Promise.all([
        fetch('/api/orders'),
        fetch('/api/menu-items'),
        fetch('/api/reservations'),
        fetch('/api/tables'),
      ]);
      const [orders, menu, reservations, tables] = await Promise.all([
        ordersRes.json(),
        menuRes.json(),
        reservRes.json(),
        tablesRes.json(),
      ]);
      setStats({ orders: orders.length, menu: menu.length, reservations: reservations.length, tables: tables.length });
      setRecentOrders(orders.slice(0, 5));
    } catch (err) {
      console.error('Failed to fetch stats:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="w-8 h-8 animate-spin text-amber-600" />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Stats Cards */}
      <div className="grid md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-500 text-sm">Total Orders</p>
              <p className="text-3xl font-bold text-slate-800">{stats.orders}</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
              <Package className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-500 text-sm">Menu Items</p>
              <p className="text-3xl font-bold text-slate-800">{stats.menu}</p>
            </div>
            <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center">
              <Utensils className="w-6 h-6 text-amber-600" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-500 text-sm">Reservations</p>
              <p className="text-3xl font-bold text-slate-800">{stats.reservations}</p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
              <Calendar className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-500 text-sm">Tables</p>
              <p className="text-3xl font-bold text-slate-800">{stats.tables}</p>
            </div>
            <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
              <Table className="w-6 h-6 text-purple-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Recent Orders */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <h2 className="text-xl font-bold text-slate-800 mb-4">Recent Orders</h2>
        <div className="space-y-4">
          {recentOrders.map(order => (
            <OrderCard key={order.id} order={order} showActions={false} />
          ))}
        </div>
      </div>
    </div>
  );
}

function AdminOrders() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const res = await fetch('/api/orders');
      const data = await res.json();
      setOrders(data);
    } catch (err) {
      console.error('Failed to fetch orders:', err);
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id: number, status: string) => {
    try {
      const res = await fetch('/api/orders', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, status }),
      });
      if (res.ok) fetchOrders();
    } catch (err) {
      console.error('Failed to update order:', err);
    }
  };

  const deleteOrder = async (id: number) => {
    if (!confirm('Delete this order?')) return;
    try {
      const res = await fetch('/api/orders', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id }),
      });
      if (res.ok) fetchOrders();
    } catch (err) {
      console.error('Failed to delete order:', err);
    }
  };

  const filteredOrders = filter === 'all' ? orders : orders.filter(o => o.status === filter);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="w-8 h-8 animate-spin text-amber-600" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap gap-2">
        {['all', 'pending', 'cooking', 'ready', 'completed'].map(status => (
          <button
            key={status}
            onClick={() => setFilter(status)}
            className={`px-4 py-2 rounded-lg font-medium transition capitalize ${
              filter === status
                ? 'bg-amber-600 text-white'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            {status}
          </button>
        ))}
      </div>
      <div className="grid lg:grid-cols-2 gap-6">
        {filteredOrders.map(order => (
          <div key={order.id} className="relative">
            <OrderCard order={order} onStatusChange={updateStatus} />
            <button
              onClick={() => deleteOrder(order.id)}
              className="absolute top-2 right-2 p-2 text-red-500 hover:bg-red-50 rounded-lg transition"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

function AdminMenu() {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<MenuItem | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    category: 'Main Course',
    image_url: '',
  });

  useEffect(() => {
    fetchMenuItems();
  }, []);

  const fetchMenuItems = async () => {
    try {
      const res = await fetch('/api/menu-items');
      const data = await res.json();
      setMenuItems(data);
    } catch (err) {
      console.error('Failed to fetch menu:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const url = editing ? '/api/menu-items' : '/api/menu-items';
      const method = editing ? 'PUT' : 'POST';
      const body = editing
        ? { ...formData, id: editing.id, price: parseFloat(formData.price) }
        : { ...formData, price: parseFloat(formData.price) };

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      if (res.ok) {
        setFormData({ name: '', description: '', price: '', category: 'Main Course', image_url: '' });
        setEditing(null);
        fetchMenuItems();
      }
    } catch (err) {
      console.error('Failed to save menu item:', err);
    }
  };

  const deleteItem = async (id: number) => {
    if (!confirm('Delete this item?')) return;
    try {
      const res = await fetch('/api/menu-items', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id }),
      });
      if (res.ok) fetchMenuItems();
    } catch (err) {
      console.error('Failed to delete item:', err);
    }
  };

  const startEdit = (item: MenuItem) => {
    setEditing(item);
    setFormData({
      name: item.name,
      description: item.description,
      price: item.price.toString(),
      category: item.category,
      image_url: item.image_url || '',
    });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="w-8 h-8 animate-spin text-amber-600" />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Add/Edit Form */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <h2 className="text-xl font-bold text-slate-800 mb-4">
          {editing ? 'Edit Menu Item' : 'Add Menu Item'}
        </h2>
        <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="Name"
            value={formData.name}
            onChange={e => setFormData({ ...formData, name: e.target.value })}
            className="px-4 py-2 border border-slate-300 rounded-lg"
            required
          />
          <input
            type="number"
            step="0.01"
            placeholder="Price"
            value={formData.price}
            onChange={e => setFormData({ ...formData, price: e.target.value })}
            className="px-4 py-2 border border-slate-300 rounded-lg"
            required
          />
          <select
            value={formData.category}
            onChange={e => setFormData({ ...formData, category: e.target.value })}
            className="px-4 py-2 border border-slate-300 rounded-lg"
          >
            <option>Appetizer</option>
            <option>Main Course</option>
            <option>Dessert</option>
            <option>Beverage</option>
          </select>
          <input
            type="url"
            placeholder="Image URL"
            value={formData.image_url}
            onChange={e => setFormData({ ...formData, image_url: e.target.value })}
            className="px-4 py-2 border border-slate-300 rounded-lg"
          />
          <textarea
            placeholder="Description"
            value={formData.description}
            onChange={e => setFormData({ ...formData, description: e.target.value })}
            className="px-4 py-2 border border-slate-300 rounded-lg md:col-span-2"
            rows={2}
          />
          <div className="md:col-span-2 flex gap-2">
            <button
              type="submit"
              className="bg-amber-600 hover:bg-amber-700 text-white px-6 py-2 rounded-lg font-medium transition"
            >
              {editing ? 'Update' : 'Add'} Item
            </button>
            {editing && (
              <button
                type="button"
                onClick={() => {
                  setEditing(null);
                  setFormData({ name: '', description: '', price: '', category: 'Main Course', image_url: '' });
                }}
                className="bg-slate-200 hover:bg-slate-300 text-slate-700 px-6 py-2 rounded-lg font-medium transition"
              >
                Cancel
              </button>
            )}
          </div>
        </form>
      </div>

      {/* Menu Items List */}
      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <table className="w-full">
          <thead className="bg-slate-50">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-medium text-slate-600">Item</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-slate-600">Category</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-slate-600">Price</th>
              <th className="px-6 py-3 text-right text-sm font-medium text-slate-600">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200">
            {menuItems.map(item => (
              <tr key={item.id} className="hover:bg-slate-50">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <img src={item.image_url} alt={item.name} className="w-10 h-10 rounded-lg object-cover" />
                    <div>
                      <p className="font-medium text-slate-800">{item.name}</p>
                      <p className="text-sm text-slate-500 truncate max-w-xs">{item.description}</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 text-slate-600">{item.category}</td>
                <td className="px-6 py-4 font-medium text-amber-600">${item.price.toFixed(2)}</td>
                <td className="px-6 py-4 text-right">
                  <button
                    onClick={() => startEdit(item)}
                    className="text-blue-600 hover:bg-blue-50 p-2 rounded-lg transition mr-1"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => deleteItem(item.id)}
                    className="text-red-600 hover:bg-red-50 p-2 rounded-lg transition"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function AdminTables() {
  const [tables, setTables] = useState<TableType[]>([]);
  const [loading, setLoading] = useState(true);
  const [newTable, setNewTable] = useState({ table_number: '', seats: '' });

  useEffect(() => {
    fetchTables();
  }, []);

  const fetchTables = async () => {
    try {
      const res = await fetch('/api/tables');
      const data = await res.json();
      setTables(data);
    } catch (err) {
      console.error('Failed to fetch tables:', err);
    } finally {
      setLoading(false);
    }
  };

  const addTable = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/tables', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          table_number: parseInt(newTable.table_number),
          seats: parseInt(newTable.seats),
        }),
      });
      if (res.ok) {
        setNewTable({ table_number: '', seats: '' });
        fetchTables();
      }
    } catch (err) {
      console.error('Failed to add table:', err);
    }
  };

  const updateStatus = async (id: number, status: string) => {
    try {
      const res = await fetch('/api/tables', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, status }),
      });
      if (res.ok) fetchTables();
    } catch (err) {
      console.error('Failed to update table:', err);
    }
  };

  const deleteTable = async (id: number) => {
    if (!confirm('Delete this table?')) return;
    try {
      const res = await fetch('/api/tables', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id }),
      });
      if (res.ok) fetchTables();
    } catch (err) {
      console.error('Failed to delete table:', err);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="w-8 h-8 animate-spin text-amber-600" />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Add Table Form */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <h2 className="text-xl font-bold text-slate-800 mb-4">Add New Table</h2>
        <form onSubmit={addTable} className="flex gap-4">
          <input
            type="number"
            placeholder="Table Number"
            value={newTable.table_number}
            onChange={e => setNewTable({ ...newTable, table_number: e.target.value })}
            className="px-4 py-2 border border-slate-300 rounded-lg"
            required
          />
          <input
            type="number"
            placeholder="Seats"
            value={newTable.seats}
            onChange={e => setNewTable({ ...newTable, seats: e.target.value })}
            className="px-4 py-2 border border-slate-300 rounded-lg"
            required
          />
          <button
            type="submit"
            className="bg-amber-600 hover:bg-amber-700 text-white px-6 py-2 rounded-lg font-medium transition flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            Add Table
          </button>
        </form>
      </div>

      {/* Tables Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tables.map(table => (
          <div key={table.id} className="relative">
            <TableCard table={table} onStatusChange={updateStatus} />
            <button
              onClick={() => deleteTable(table.id)}
              className="absolute top-2 right-2 p-2 text-red-500 hover:bg-red-50 rounded-lg transition"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

function AdminReservations() {
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchReservations();
  }, []);

  const fetchReservations = async () => {
    try {
      const res = await fetch('/api/reservations');
      const data = await res.json();
      setReservations(data);
    } catch (err) {
      console.error('Failed to fetch reservations:', err);
    } finally {
      setLoading(false);
    }
  };

  const deleteReservation = async (id: number) => {
    if (!confirm('Delete this reservation?')) return;
    try {
      const res = await fetch('/api/reservations', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id }),
      });
      if (res.ok) fetchReservations();
    } catch (err) {
      console.error('Failed to delete reservation:', err);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="w-8 h-8 animate-spin text-amber-600" />
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden">
      <table className="w-full">
        <thead className="bg-slate-50">
          <tr>
            <th className="px-6 py-3 text-left text-sm font-medium text-slate-600">Name</th>
            <th className="px-6 py-3 text-left text-sm font-medium text-slate-600">Phone</th>
            <th className="px-6 py-3 text-left text-sm font-medium text-slate-600">Date</th>
            <th className="px-6 py-3 text-left text-sm font-medium text-slate-600">Time</th>
            <th className="px-6 py-3 text-left text-sm font-medium text-slate-600">People</th>
            <th className="px-6 py-3 text-right text-sm font-medium text-slate-600">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-200">
          {reservations.map(reservation => (
            <tr key={reservation.id} className="hover:bg-slate-50">
              <td className="px-6 py-4 font-medium text-slate-800">{reservation.name}</td>
              <td className="px-6 py-4 text-slate-600">{reservation.phone}</td>
              <td className="px-6 py-4 text-slate-600">{reservation.date}</td>
              <td className="px-6 py-4 text-slate-600">{reservation.time}</td>
              <td className="px-6 py-4">
                <span className="bg-amber-100 text-amber-800 px-2 py-1 rounded-full text-sm font-medium">
                  {reservation.people} people
                </span>
              </td>
              <td className="px-6 py-4 text-right">
                <button
                  onClick={() => deleteReservation(reservation.id)}
                  className="text-red-600 hover:bg-red-50 p-2 rounded-lg transition"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function AdminDashboard() {
  return (
    <div className="min-h-screen bg-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Routes>
          <Route path="/" element={<AdminOverview />} />
          <Route path="/orders" element={<AdminOrders />} />
          <Route path="/menu" element={<AdminMenu />} />
          <Route path="/tables" element={<AdminTables />} />
          <Route path="/reservations" element={<AdminReservations />} />
        </Routes>
      </div>
    </div>
  );
}
