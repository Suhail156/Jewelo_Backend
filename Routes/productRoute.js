import express from 'express'
import upload from '../Middleware/upload.js'
import { createProduct, deleteProduct, getProductById, getProducts, updateProduct } from '../Controller/productController.js'
import { verifyToken } from '../Middleware/userAuthentication.js'

const router=express.Router()
// router.use(verifyToken)
router.post('/products',upload.single('image'),createProduct)
router.get('/getproducts',getProducts)
router.get('/products/:id',getProductById)
router.patch('/products/:id',upload.single('image'),updateProduct)
router.delete('/products/:id',deleteProduct)

export default router