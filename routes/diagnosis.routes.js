const express = require("express");
const router = express.Router();
const { diagnose, getHistory } = require("../controllers/diagnosis.controller");

/**
 * @swagger
 * /api/diagnose:
 *   post:
 *     summary: Diagnose based on symptoms
 *     description: Returns possible medical conditions using AI
 *     tags: [Diagnosis]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               symptoms:
 *                 type: string
 *                 example: fever, cough, chest pain
 *     responses:
 *       200:
 *         description: Successful diagnosis
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       condition:
 *                         type: string
 *                       probability:
 *                         type: string
 *                       next_steps:
 *                         type: string
 *       400:
 *         description: Invalid input
 *       500:
 *         description: Server error
 */
router.post("/diagnose", diagnose);

/**
 * @swagger
 * /api/history:
 *   get:
 *     summary: Get diagnosis history
 *     description: Fetch past diagnosis records
 *     tags: [Diagnosis]
 *     responses:
 *       200:
 *         description: List of past diagnoses
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 count:
 *                   type: number
 *                 data:
 *                   type: array
 *       500:
 *         description: Server error
 */
router.get("/history", getHistory);

module.exports = router;