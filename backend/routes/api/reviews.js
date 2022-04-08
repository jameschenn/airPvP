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

// async function editReview(details) {
//   const id = details.id;
//   delete details.id;
//   console.log({details, id});
//   await db.Review.update(
//     details,
//     {
//       where: {id},
//       returning: true,
//       plain: true,
//     }
//   );
//   return await db.Review.findByPk(id);
// }

router.put('/:id', asyncHandler(async(req, res) => {
  console.log('-----THIS ROUTE HITS-------')
  const { userId, spotId, review, rating } = req.body;

  const id = parseInt(req.params.id, 10);
  console.log('id-------------------', id);

  const theReview = await db.Review.findByPk(id);
  console.log('review----------', theReview);

  const updatedReview = await theReview.update({
    userId,
    spotId,
    review,
    rating
  });
  return res.json(updatedReview);
}))

module.exports = router;
