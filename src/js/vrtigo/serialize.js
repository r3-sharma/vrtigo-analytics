import papaparse from 'papaparse';

const toCSV = function(data) {
  const papaConfig = {
    quotes: true
  };

  const formattedData = data.map(function(d) {
    // need to send pose data angles as JSON array.
    if(d.mt === 'euler_angle') {
      // may be given to us as an object (A-Frame) or an array (React VR)
      if(!Array.isArray(d.val)) {
        d.val = [d.val.x, d.val.y, d.val.z];
      } 

      d.val = JSON.stringify(d.val);

    } 
    return d;
  });
  return papaparse.unparse(formattedData, papaConfig);
};

export default toCSV;
