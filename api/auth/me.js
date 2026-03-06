import supabase from '../_supabase.js';

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  if (req.method === 'OPTIONS') return res.status(204).end();

  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ error: 'No token provided' });
    }

    const token = authHeader.slice(7);
    const now = new Date().toISOString();

    const { data: session, error } = await supabase
      .from('auth_sessions')
      .select('user_id, auth_users(id, email)')
      .eq('id', token)
      .gt('expires_at', now)
      .single();

    if (error || !session) {
      return res.status(401).json({ error: 'Invalid or expired session' });
    }

    res.status(200).json({ user: session.auth_users });
  } catch (err) {
    console.error('Auth check error:', err);
    res.status(500).json({ error: err.message });
  }
}
