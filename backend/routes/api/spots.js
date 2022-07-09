const express = require('express');
const asyncHandler = require('express-async-handler');
const db = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const {multipleMulterUpload, multiplePublicFileUpload} = require("../../awsS3");

const Sequelize = require('sequelize');

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

router.post('/new', multipleMulterUpload("images"), asyncHandler(async(req, res) => {

  const { userId ,address, city, state, country, series, name, description, price, img1, img2, img3, img4 } = req.body;

  const images = await multiplePublicFileUpload(req.files)

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
    img1: images[0],
    img2: images[1],
    img3: images[2],
    img4: images[3]
  });
  return res.json({newSpot})
}))

router.put('/:id', multipleMulterUpload("images"), asyncHandler(async(req, res) => {
  const { userId, address, city, state, country, series, name, description, price, img1, img2, img3, img4 } = req.body;

  const id = parseInt(req.params.id, 10);

  const images = await multiplePublicFileUpload(req.files)

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
    img1: images[0],
    img2: images[1],
    img3: images[2],
    img4: images[3]
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

  const id = parseInt(req.params.id, 10);

  const reviews = await db.Review.findAll({
    include: [db.User],
    where: { spotId: id }
  });
  return res.json(reviews);
}))

router.post('/search', asyncHandler(async(req, res) => {
  const { searchParams } = req.body;

  if(searchParams === '') {
    const result = await db.Spot.findAll();
    return res.json(result)
  }
  const result = await db.Spot.findAll({
    where: {
      name: {
        [Sequelize.Op.iLike]: `%${searchParams}%`
      }
    }
  });
  return res.json(result);
}))

module.exports = router;
