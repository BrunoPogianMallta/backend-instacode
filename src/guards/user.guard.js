exports.validateCustomerData = (req, res, next) => {
    const { name, city, state, address } = req.body;
  
    if (!name || !city || !state || !address) {
      return res.status(400).json({ error: 'Missing required customer data' });
    }
  
    next();
  };