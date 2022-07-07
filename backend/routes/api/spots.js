const express = require('express');
const asyncHandler = require('express-async-handler');
const db = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router();

router.get('/', asyncHandler(async (req, res) => {
  const spots = await db.Spot.findAll({
  });
  return res.json(spots);
}))

router.get('/:id', asyncHandler(async(req, res) => {

  const id = parseInt(req.params.id, 10);
  const spot = await db.Spot.findByPk(id, {
    include: [db.User, { model: db.Review, include: db.User }]
  })
  return res.json(spot);
}))

router.post('/new', asyncHandler(async(req, res) => {

  const { userId ,address, city, state, country, series, name, description, price, img1, img2, img3, img4 } = req.body;

  const newSpot = await db.Spot.create({
    userId,
    address,
    city,
    state,
    country,
    series,
    name,
    description,
    price,
    img1,
    img2,
    img3,
    img4
  });
  return res.json({newSpot})
}))

router.put('/:id', asyncHandler(async(req, res) => {

  const { userId, address, city, state, country, series, name, description, price, img1, img2, img3, img4 } = req.body;

  const id = parseInt(req.params.id, 10);

  const spot = await db.Spot.findByPk(id);

  const updatedSpot = await spot.update({
    userId,
    address,
    city,
    state,
    country,
    series,
    name,
    description,
    price,
    img1,
    img2,
    img3,
    img4
  });

  return res.json(updatedSpot);
}))

router.delete('/:id', asyncHandler(async(req, res) => {

  const id = parseInt(req.params.id, 10);

  const spot = await db.Spot.findByPk(id);

  const deletedSpot = await spot.destroy();

  return res.json(deletedSpot);
}))

router.post('/:id/reviews', asyncHandler(async(req, res) => {
  const { userId, spotId, review, rating } = req.body;

  const newReview = await db.Review.create({
    userId,
    spotId,
    review,
    rating
  });
  return res.json(newReview);
}))

router.get('/:id/reviews', asyncHandler(async (req, res) => {
  console.log('WORKING');

  const id = parseInt(req.params.id, 10);

  console.log('IDDDDDD', id);
  const reviews = await db.Review.findAll({
    include: [db.User],
    where: { spotId: id }
  });
  return res.json(reviews);
}))

module.exports = router;
