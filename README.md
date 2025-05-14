# 💎 Jewellery Product Management API

A robust backend API built with **Node.js**, **Express.js**, and **MongoDB** to manage authentication and CRUD operations for jewellery products. This API supports JWT-based authentication, file uploads, and optional pagination, search, and sorting.

---

## 🚀 Features

### 🔐 Authentication (JWT)
- Email and password authentication using **JWT**
- Secure login system
- Middleware to protect private routes

### 🛍️ Product Management (CRUD)
- **Create**, **Read**, **Update**, and **Delete** jewellery products
- Product fields:
  - Name (Text)
  - Price (Number)
  - Stock (Number)
  - Description (Text)
  - Category (Autocomplete support on frontend)
  - Manufacturing Date (Date)
  - Image (Single file upload with Multer)

### 🧰 Optional Features
- Server-side **pagination**, **search**, and **sorting**
- MongoDB aggregation or stored procedures (if applicable)

---

## 🛠️ Tech Stack

- **Node.js**
- **Express.js**
- **MongoDB** with **Mongoose**
- **JWT** for authentication
- **Multer** for image upload
- **dotenv** for environment variable management
- **CORS** for cross-origin support

---

## 📦 Installation

1. **Clone the Repository**

```bash
git clone https://github.com/Suhail156/Jewelo_Backend.git
cd jewellery-backend

Install Dependencies
npm install

create .env
PORT=3562
MONGO_URI=mongodb://localhost:27017/jewelleryDB
JWT_SECRET=your_jwt_secret_key

run the server
npm start


folder structure
backend/
├── controllers/
│   ├── authController.js
│   └── productController.js
├── middlewares/
│   ├── authMiddleware.js
│   └── uploadMiddleware.js
├── models/
│   ├── User.js
│   └── Product.js
├── routes/
│   ├── authRoutes.js
│   └── productRoutes.js
├── uploads/                 // stores uploaded images
├── .env
└── server.js

 Authentication
 user
 | Method | Endpoint          | Description                 |
| ------ | ----------------- | --------------------------- |
| POST   | `/user/login` | Login with email & password |
 Products
| Method | Endpoint            | Description                                         |
| ------ | ------------------- | --------------------------------------------------- |
| GET    | `/product/products`     | Get all products (with search, pagination, sorting) |
| GET    | `/product/products/:id` | Get a single product                                |
| POST   | `/product/products`     | Add new product (authenticated)                     |
| PUT    | `/product/products/:id` | Update product (authenticated)                      |
| DELETE | `/product/products/:id` | Delete product (authenticated)                      |

image upload
Single image upload using Multer

Uploaded images are saved to /uploads

URL: http://localhost:3562/uploads/<filename>

