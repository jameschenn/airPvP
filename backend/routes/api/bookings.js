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
}));

router.post('/', asyncHandler(async(req, res) => {
  const { spotId, userId, startDate, endDate } = req.body;

  const booking = await db.Booking.create({
    spotId,
    userId,
    startDate,
    endDate
  });

  return res.json(booking);
}))

router.delete('/:id', asyncHandler(async(req, res) => {
  const id = parseInt(req.params.id, 10);
  const booking = await db.Booking.findByPk(id);
  const deletedBooking = await booking.destroy();

  return res.json(id)
}));

module.exports = router;
