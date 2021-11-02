const express = require("express");
const router = express.Router();
const { v4 } = require("uuid");
const { findDistance, convertToRadians } = require("../../utils/helpers");


let POINTS = [{
  '0': { lat: 44.00464279520184, lng: 22.818254599672308 },
  '1': { lat: 44.617818115655496, lng: 25.84249119679307 },
  id: 'f23b85ad-86f9-44af-bc95-40e2a5b539da',
  distance: 250
}];
 
router.get("/", (req, res) => {
  res.status(200).json(POINTS);
});

router.post('/', (req, res) => {
  const { ...coordinate } = req.body;
  let quantityPoints = Object.keys(coordinate).length - 1;
  let arrDistance = [];
  let distance = null;

  for (let i = 0; i < quantityPoints; i += 1) {
    const lat1 = convertToRadians(Number(coordinate[i].lat));
    const lng1 = convertToRadians(Number(coordinate[i].lng));

    const lat2 = convertToRadians(Number(coordinate[i + 1].lat));
    const lng2 = convertToRadians(Number(coordinate[i + 1].lng));

    const distance = findDistance(lat1, lng1, lat2, lng2);

    arrDistance.push(distance);
  }

  arrDistance.length > 1
    ? arrDistance.reduce((a, b) => (distance = a + b))
    : (distance = arrDistance[0]);

  const point = {
    ...coordinate,
    id: v4(),
    distance,
  };

  POINTS.push(point);
  res.status(201).json(point);
})

router.delete('/:id', (req, res) => {
  POINTS = POINTS.filter((point) => point.id !== req.params.id);
  res.status(200).json({ message: "Point delete" });
})

module.exports = router;
