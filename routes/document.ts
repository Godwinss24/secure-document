import express, { Router } from 'express';
import multer from 'multer';
import authenticateToken from '../utilities/auth';
import { createDocumentControl } from '../controllers/document/create-document.controller';
import { findAllDocumentsControl, findDocumentByIDControl } from '../controllers/document/get-document.controller';
import { findOneDocumentByID } from '../services/document/document.service';


const router: Router = express.Router();
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

/**
 * @swagger
 * /document:
 *   post:
 *     summary: Upload a document
 *     tags: [Documents]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required: [file]
 *             properties:
 *               file:
 *                 type: string
 *                 format: binary
 *                 description: File to upload
 *               description:
 *                 type: string
 *                 description: Description of the file
 *                 example: Sample document for processing
 *               title:
 *                 type: string
 *                 description: title of the document
 *                 example: A&B contract
 *     responses:
 *       201:
 *         description: Document uploaded successfully
 *       400:
 *         description: Invalid file or missing fields
 *       401:
 *         description: Unauthorized - Invalid or missing token
 *       500:
 *         description: Server error
 */

router.post('/', authenticateToken, upload.single('file'), createDocumentControl);


/**
 * @swagger
 * /document/all:
 *   get:
 *     summary: Get all documents for the authenticated user
 *     tags: [Documents]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: Page number
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *         description: Number of documents per page
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *         description: Search by title
 *     responses:
 *       200:
 *         description: List of user documents
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 successful:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: object
 *                   properties:
 *                     data:
 *                       type: array
 *                      
 *                     total:
 *                       type: integer
 *                     page:
 *                       type: integer
 *                     limit:
 *                       type: integer
 *                     totalPages:
 *                       type: integer
 *                 message:
 *                   type: string
 *                   example: null
 *       401:
 *         description: Unauthorized - JWT token missing or invalid
 *       500:
 *         description: Server error
 */
router.get('/all', authenticateToken, findAllDocumentsControl);

/**
 * @swagger
 * /document/{id}:
 *   get:
 *     summary: Get a document by ID
 *     tags: [Documents]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the document to retrieve
 *     responses:
 *       200:
 *         description: Document retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 successful:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: object
 *                 message:
 *                   type: string
 *                   example: Document retrieved
 *       400:
 *         description: Invalid ID format
 *       401:
 *         description: Unauthorized - Invalid or missing token
 *       404:
 *         description: Document not found
 *       500:
 *         description: Server error
 */

router.get('/:id', authenticateToken, findDocumentByIDControl);

module.exports = router;