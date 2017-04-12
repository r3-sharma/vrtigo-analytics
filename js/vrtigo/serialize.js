import papaparse from 'papaparse';

const toCSV = function(data) {
  const papaConfig = {
    quotes: true
  };

  return papaparse.unparse(data, papaConfig);
};

export default toCSV;
