const { KEY } = require('../config');


module.exports = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  try {
    if (!authHeader) {
        return res.status(401).json({
            status: false,
            message: 'Webhook authorization is required'
        });
    }
    
    const webhookKey = authHeader.split(' ')[1]; // key should match server KEY
    
    if(webhookKey !== KEY) {
      // wrong key from webhook
      return res.status(401).json({
        status: false,
        message: 'Invalid authentication token',
      });
    } 
    
    next();
  } catch (e) {
    return res.status(401).json({
        status: false,
        message: 'Webhook authentication failed',
    });
  }
};