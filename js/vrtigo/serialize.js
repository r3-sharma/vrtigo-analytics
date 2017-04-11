import papaparse from 'papaparse';

const toCSV = function(data) {
  console.log(data);
  return papaparse.unparse(data);
};

export default toCSV;
