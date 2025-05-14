import Product from '../Models/productSchema.js';
// import productSchema from '../Validation/productValidation.js';
import fs from 'fs';
import path from 'path';


export const createProduct = async (req, res) => {
  try {
    const { name, price, stock, description, category, manufactureDate } = req.body;
    const image = req.file ? req.file.filename : null;

    if (!image) {
      return res.status(400).json({ message: 'Image is required' });
    }

    const product = new Product({
      name,
      price,
      stock,
      description,
      category,
      manufactureDate,
      image, // Store just the filename or full path if needed
    });

    await product.save();
    res.status(201).json({ message: 'Product created', product });
  } catch (err) {
    console.error('Create product error:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
};


export const getProducts = async (req, res) => {
  try {
    const { page = 1, limit = 10, search = '', sortBy = 'createdAt', order = 'desc' } = req.query;

    const query = {
      name: { $regex: search, $options: 'i' }, // Search by product name
    };

    const sortOptions = { [sortBy]: order === 'asc' ? 1 : -1 };

    const products = await Product.find(query)
      .sort(sortOptions)
      .skip((page - 1) * limit)
      .limit(parseInt(limit));

    const total = await Product.countDocuments(query);

    res.json({
      products,
      total,
      totalPages: Math.ceil(total / limit),
      currentPage: parseInt(page),
    });
  } catch (err) {
    res.status(500).json({ message: 'Error fetching products', error: err.message });
  }
};

export const getProductById = async (req, res) => { 
  try {
     const productId=req.params.id
    const product = await Product.findById(productId);
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.status(200).json(product);
  } catch (err) {
    res.status(500).json({ message: "Error fetching product" });
  }
};
export const updateProduct = async (req, res) => {
  try {
    const productId = req.params.id;
    const existingProduct = await Product.findById(productId);

    if (!existingProduct) {
      return res.status(404).json({ message: 'Product not found' });
    }

    // Prepare update data
    const updateData = {
      name: req.body.name,
      price: req.body.price,
      description: req.body.description,
    };
    if (req.file) {

      const oldImagePath = path.join(process.cwd(), 'uploads', existingProduct.image);
      if (fs.existsSync(oldImagePath)) {
        fs.unlinkSync(oldImagePath); 
      }
    console.log('Uploaded file:', req.file);

      // Set the new image name
      updateData.image = req.file.filename;
      console.log('Final updateData:', updateData);

    } else {
      
      updateData.image = existingProduct.image;
    }

    const updatedProduct = await Product.findByIdAndUpdate(productId, updateData, { new: true });
    
    res.status(200).json({ message: 'Product updated successfully', product: updatedProduct });
    console.log('Image saved as:', updateData.image);

  } catch (err) {
    console.error('Error updating product:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
};


export const deleteProduct = async (req, res) => {
  try {
    const productId=req.params.id
    await Product.findByIdAndDelete(productId);
    res.status(200).json({ message: "Product deleted" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting product" });
  }
};

