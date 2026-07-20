import { auth } from '../lib/auth.js';

export const requireAuth = async (req, res, next) => {
  try {
    const session = await auth.api.getSession({
      headers: req.headers
    });
    
    if (!session) {
      return res.status(401).json({ error: 'Unauthorized: No valid session found' });
    }
    
    // Attach user and session to request object
    req.user = session.user;
    req.session = session.session;
    
    next();
  } catch (err) {
    console.error('Auth Middleware Error:', err);
    res.status(500).json({ error: 'Internal server error during authentication' });
  }
};
