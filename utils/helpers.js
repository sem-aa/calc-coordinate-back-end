// рассчтитывает дистанцию между координатами
function findDistance(lat1, lon1, lat2, lon2) {
    // Радиус земли
    const R = 6372.795;
  
    const distance =
      R *
      Math.acos(
        Math.sin(lat1) * Math.sin(lat2) +
          Math.cos(lat1) * Math.cos(lat2) * Math.cos(lon2 - lon1)
      );
    return Math.round(distance);
  }

  function convertToRadians(coordinate) {
    const radian = coordinate * (Math.PI / 180);
    return radian;
  }


  module.exports = {
      findDistance,
      convertToRadians 
  }