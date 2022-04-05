import express from 'express';
import productsController from '../controllers/productsController.js';

const router = express.Router();

router.get('/', productsController.productsAll)

router.get("/:pid",productsController.productId)


export default router;