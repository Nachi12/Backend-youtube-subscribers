const express = require("express");
const router = express.Router();
const Subscriber = require("../models/subscribers");

/**
 * @swagger
 * components:
 *   schemas:
 *     Subscriber:
 *       type: object
 *       required:
 *         - name
 *         - subscribedChannel
 *       properties:
 *         _id:
 *           type: string
 *           description: The auto-generated id of the subscriber
 *         name:
 *           type: string
 *           description: The subscriber's name
 *         subscribedChannel:
 *           type: string
 *           description: The YouTube channel they subscribed to
 *         subscribeDate:
 *           type: string
 *           format: date
 *           description: The date the subscription occurred
 *       example:
 *         _id: 6523b28b9127c512fc4e6b21
 *         name: John
 *         subscribedChannel: TechWorld
 *         subscribeDate: 2025-10-15T12:00:00Z
 */

/**
 * @swagger
 * /subscribers:
 *   get:
 *     summary: Returns all subscribers
 *     tags: [Subscribers]
 *     responses:
 *       200:
 *         description: The list of all subscribers
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Subscriber'
 */
router.get("/", async (req, res) => {
  try {
    const subscribers = await Subscriber.find();
    res.json(subscribers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

/**
 * @swagger
 * /subscribers/names:
 *   get:
 *     summary: Get only subscriber names and their subscribed channels
 *     tags: [Subscribers]
 *     responses:
 *       200:
 *         description: Array of subscribers with only name and subscribedChannel
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   name:
 *                     type: string
 *                   subscribedChannel:
 *                     type: string
 */
router.get("/names", async (req, res) => {
  try {
    const subscribers = await Subscriber.find({}, { name: 1, subscribedChannel: 1, _id: 0 });
    res.json(subscribers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

/**
 * @swagger
 * /subscribers/{id}:
 *   get:
 *     summary: Get subscriber by ID
 *     tags: [Subscribers]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The subscriber ID
 *     responses:
 *       200:
 *         description: Subscriber data by ID
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Subscriber'
 *       400:
 *         description: Subscriber not found or invalid ID
 */
router.get("/:id", async (req, res) => {
  try {
    const subscriber = await Subscriber.findById(req.params.id);
    if (!subscriber) {
      return res.status(400).json({ message: "Subscriber not found" });
    }
    res.json(subscriber);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
