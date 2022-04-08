const express = require('express');
const asyncHandler = require('express-async-handler');
const db = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router();

// const validateSpot = [
//   check('name')
//     .exists({ checkFalsy: true })
//     .withMessage('Please provide a valid name')
//     .isLength({ max: 50 })
//     .withMessage('50 character limit'),
//   check('price')
//     .isInt({ min: 100, max: 1000 })
//     .withMessage('Please provide a value between $100 to $1000')
//     .exists({ checkFalsy: true })
//     .withMessage('Please provide a valid price'),
//   check('address')
//     .exists({ checkFalsy: true })
//     .withMessage('Please provide a valid address')
//     .isLength({ max: 50 })
//     .withMessage('50 character limit'),
//   check('city')
//     .isLength({ max: 50 })
//     .withMessage('50 character limit')
//     .exists({ checkFalsy: true })
//     .withMessage('Please provide a valid city'),
//   check('state')
//     .exists({ checkFalsy: true })
//     .withMessage('Please provide a valid state')
//     .isString()
//     .withMessage('Please provide a valid state'),
//   check('country')
//     .isLength({ max: 50 })
//     .withMessage('50 character limit')
//     .isLength({ min: 2 })
//     .withMessage('2 character min'),
//   check('series')
//     .exists({ checkFalsy: true })
//     .withMessage('Please provide a valid series')
//     .isLength({ max: 50 })
//     .withMessage('50 character limit'),
//   check('description')
//     .exists({ checkFalsy: true })
//     .withMessage('Please provide a valid description')
//     .isLength({ max: 1000 })
//     .withMessage('1000 character limit'),
//   check('img1')
//     .exists({ checkFalsy: true })
//     .withMessage('Please provide a valid photo')
//     .isURL()
//     .withMessage('Please provide a valid photo'),
//   handleValidationErrors
// ];

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

// router.put('/:id/reviews', asyncHandler(async (req, res) => {
//   console.log('-----THIS ROUTE HITS-------')
//   const { userId, spotId, review, rating } = req.body;

//   const id = parseInt(req.params.id, 10);
//   console.log('id-------------------', id);

// }))


module.exports = router;
