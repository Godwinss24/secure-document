import express, { Router } from 'express';
import { TestControl } from '../controllers/test.controller';

const router: Router = express.Router();

router.get('/', TestControl);


module.exports = router;
