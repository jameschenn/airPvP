const express = require('express');
const asyncHandler = require('express-async-handler');
const db = require('../../db/models');

const router = express.Router();

router.delete('/:id', asyncHandler(async(req, res) => {

  const id = parseInt(req.params.id, 10);

  const review = await db.Review.findByPk(id);

  const deletedReview = await review.destroy();

  return res.json(id);
}))

router.put('/:id', asyncHandler(async(req, res) => {

  const { userId, spotId, review, rating } = req.body;

  const id = parseInt(req.params.id, 10);

  const theReview = await db.Review.findByPk(id);

  const updatedReview = await theReview.update({
    userId,
    spotId,
    review,
    rating
  });
  return res.json(updatedReview);
}))

module.exports = router;
