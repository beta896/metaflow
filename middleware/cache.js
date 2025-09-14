const cache = new Map();

const cacheMiddleware = (req, res, next) => {
  const key = req.originalUrl;
  if (cache.has(key)) {
    return res.json(cache.get(key));
  }
  
  res.sendResponse = res.json;
  res.json = (data) => {
    cache.set(key, data);
    res.sendResponse(data);
  };

  next();
};

module.exports = cacheMiddleware;