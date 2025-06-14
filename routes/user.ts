import express, { Router } from 'express';
import { createUserControl } from '../controllers/user/create-user.controller';
import { loginUserControl } from '../controllers/user/login-user.controller';

const router: Router = express.Router();

/**
 * @swagger
 * /user:
 *   post:
 *     summary: Create a new user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [email, password]
 *             properties:
 *               email:
 *                 type: string
 *                 example: user@example.com
 *               password:
 *                 type: string
 *                 example: password123
 *     responses:
 *       200:
 *         description: User created successfully
 *       400:
 *         description: Invalid input or user exists
 *       500:
 *         description: Server error
 */

router.post('/', createUserControl);

/**
 * @swagger
 * /user/login:
 *   post:
 *     summary: Login user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [email, password]
 *             properties:
 *               email:
 *                 type: string
 *                 example: user@example.com
 *               password:
 *                 type: string
 *                 example: password123
 *     responses:
 *       200:
 *         description: Login successful, returns JWT token
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 successful:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: string
 *                   example: eyJhbGciOiJIUzI1NiIsInR5cCI6...
 *                 message:
 *                   type: string
 *                   example: Login Successful
 *       400:
 *         description: Invalid credentials or missing fields
 *       404:
 *         description: User not found
 *       500:
 *         description: Server error
 */

router.post('/login', loginUserControl)



module.exports = router