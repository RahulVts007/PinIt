import jwt from 'jsonwebtoken';

// Sanitize token to prevent header injection
const sanitizeToken = (token) => {
  if (typeof token !== 'string') return null;
  return token.replace(/[^a-zA-Z0-9._-]/g, '');
};

export const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({
      success: false,
      message: 'No token provided',
    });
  }

  const token = sanitizeToken(authHeader.substring(7));

  if (!token) {
    return res.status(401).json({
      success: false,
      message: 'Invalid token format',
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.id;
    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: 'Invalid or expired token',
    });
  }
};

export const generateToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: '7d',
  });
};
