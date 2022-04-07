const express = require('express');
const asyncHandler = require('express-async-handler');
const db = require('../../db/models');

const router = express.Router();

// router.delete('/:id', asyncHandler(async(req, res) => {

//   const id = parseInt(req.params.id, 10);

//   const review = await db.Review.findByPk(id);

//   console.log('-----id-----', id);
//   console.log('-----review-----', review);
// }))

module.exports = router;
