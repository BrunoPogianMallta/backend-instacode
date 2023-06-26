const formatData = (data) => {
    const formattedData = {};
  
    for (const key in data) {
      if (data.hasOwnProperty(key)) {
        const formattedKey = key.replace(/\s+/g, '').toLowerCase();
        const formattedValue = typeof data[key] === 'string' ? data[key].trim().toLowerCase() : data[key];
        formattedData[formattedKey] = formattedValue;
      }
    }
  
    return formattedData;
  };
  
  module.exports = formatData;