const express = require('express');
const asyncHandler = require('express-async-handler');
const db = require('../../db/models');

const router = express.Router();

router.get('/:id', asyncHandler(async(req, res) => {
  const id = parseInt(req.params.id, 10);
  const bookings = await db.Booking.findAll({
    include: [ db.Spot, db.User ],
    where: { userId: id }
  });
  return res.json(bookings);
}))

module.exports = router;
