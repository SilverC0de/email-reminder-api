const jwtService = require('../services/jwt.service');


module.exports = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  try {
    if (!authHeader) {
        return res.status(401).json({
            status: false,
            message: 'Authorization is required'
        });
    }
    
    const token = authHeader.split(' ')[1];
    const tokenIsValid = await jwtService.verifyToken(token);
    
    if(tokenIsValid) {
        const data = jwtService.decodeToken(token);
            
        req.uuid = data.uuid;
        req.name = data.name;
        req.email = data.email;
      
        next();
    } else {
        return res.status(401).json({
            status: false,
            message: 'Invalid authentication token',
        });
    }
  } catch (e) {
    return res.status(401).json({
        status: false,
        message: 'Authentication failed',
    });
  }
};