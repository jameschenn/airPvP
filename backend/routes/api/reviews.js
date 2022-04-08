const express = require('express');
const asyncHandler = require('express-async-handler');
const db = require('../../db/models');

const router = express.Router();

router.delete('/:id', asyncHandler(async(req, res) => {

  const id = parseInt(req.params.id, 10);

  const review = await db.Review.findByPk(id);

  const deletedReview = await review.destroy();

  console.log('----------DELETED REVIEW----------', deletedReview);
  return res.json(id);
}))

module.exports = router;
