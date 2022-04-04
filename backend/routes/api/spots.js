const express = require('express');
const asyncHandler = require('express-async-handler');
const db = require('../../db/models');

const router = express.Router();

router.get('/', asyncHandler(async (req, res) => {
  const spots = await db.Spot.findAll({
    include: db.Images
  });
  return res.json(spots);
}))

module.exports = router;
