import papaparse from 'papaparse';

const toCSV = function(data) {
  const papaConfig = {
    quotes: true
  };

  const formattedData = data.map(function(d) {
    // need to send pose data angles as JSON.
    if(d.mt === 'euler_angle') {
      console.log(d);
      d.val = JSON.stringify(d.val);
    } 
    return d;
  });

  return papaparse.unparse(formattedData, papaConfig);
};

export default toCSV;
