const models = require("../database/models");
const { ErrorHandler } = require("../utilities/errorHandler");
const { uploadImage } = require("../utilities/cloudinaryUpload");

const {
  User,
  States,
  Uploads,
  Product,
  Subscriptions,
  ProductSubCategory,
  ProductMainCategory,
  LocalGovernmentArea,
  SubscriptionPackage,
} = models;

const getAllProducts = async (req, res, next) => {
  try {
    const products = await Product.findAll({
      include: { all: true },
    });

    if (!products) {
      throw new ErrorHandler(404, "There are no products available");
    }
    if (products) {
      return res.status(200).json({
        status: "ok",
        code: 200,
        data: { products },
      });
    }

    next();
  } catch (error) {
    next(error);
  }
};

const getProductById = async (req, res, next) => {
  try {
    const product = await Product.findOne({
      where: { id: req.params.productId },
      include: { all: true },
    });

    if (!product || product.length === 0) {
      throw new ErrorHandler(404, "There are no products available");
    }

    if (product) {
      return res.status(200).json({
        status: "ok",
        code: 200,
        data: { product },
      });
    }

    next();
  } catch (error) {
    next(error);
  }
};

const getUserProductsByStatus = async (req, res, next) => {
  const { status, userId } = req.body;
  try {
    const products = await Product.findAll({
      where: { userId, status },
      include: { all: true },
    });

    if (!products) {
      throw new ErrorHandler(404, "There are no products available");
    }

    if (products) {
      return res.status(200).json({
        status: "ok",
        code: 200,
        data: { products },
      });
    }

    next();
  } catch (error) {
    next(error);
  }
};

const getProductsByCategoryId = async (req, res, next) => {
  const { categoryId } = req.params;

  try {
    const products = await Product.findAll({
      where: { categoryId },
      include: { all: true },
    });

    if (!products.length) {
      throw new ErrorHandler(404, "No products were found in this category");
    }

    if (products) {
      return res.status(200).json({
        status: "ok",
        message: "Product retrieved successfully",
        data: { products },
      });
    }
    next();
  } catch (error) {
    next(error);
  }
};

const getProductsBySubCategoryId = async (req, res, next) => {
  const { subCategoryId } = req.params;
  try {
    const products = await Product.findAll({
      where: { subCategoryId },
      include: { all: true },
    });

    if (!products) {
      throw new ErrorHandler(404, "No products were found in this category");
    }

    if (products) {
      return res.status(200).json({
        status: "ok",
        message: "Product retrieved successfully",
        data: { products },
      });
    }

    next();
  } catch (error) {
    next(error);
  }
};

const getProductsByUserId = async (req, res, next) => {
  try {
    const { userId } = req.params;

    const products = await Product.findAll({
      where: { userId },
      include: { all: true },
    });

    if (!products) {
      throw new ErrorHandler(404, "No products were found");
    }

    if (products) {
      return res.json({
        status: "ok",
        code: 200,
        message: "Products retrieved successfully",
        data: { products },
      });
    }

    next();
  } catch (error) {
    next(error);
  }
};

const createProduct = async (req, res, next) => {
  try {
    req.body.slug = req.body.title.replace(/\s/g, "-").toLowerCase();
    const product = await Product.create(req.body);

    if (product) {
      // upload image here
      if (req.files) {
        const productImages = [];
        const files = req.files;

        for (const file of files) {
          const { path } = file;
          const uploaded = await uploadImage(path);
          productImages.push({
            productId: product.id,
            filename: uploaded.secure_url,
          });
        }
        // save uploads reference
        await Uploads.bulkCreate(productImages);
      }
      // end upload

      const newProduct = await Product.findOne({
        where: { id: product.id },
        include: { all: true },
      });

      return res.status(201).json({
        status: "ok",
        code: 201,
        message: "Your product has been successfully created",
        data: {
          product: newProduct,
        },
      });
    }
    next();
  } catch (error) {
    next(error);
  }
};

const updateProduct = async (req, res, next) => {
  try {
    if (req.body.hasOwnProperty("title")) {
      req.body.slug = req.body.title.replace(/\s/g, "-").toLowerCase();
    }
    const { productId } = req.params;

    const product = await Product.update(req.body, {
      where: { id: productId },
    });

    if (!product) {
      throw new ErrorHandler(404, "No product was found.");
    }

    const updatedProduct = await Product.findOne({
      where: { id: productId },
      include: { all: true },
    });

    return res.status(200).json({
      status: "ok",
      code: 201,
      message: "Product has been updated successfully",
      data: { product: updatedProduct },
    });
  } catch (error) {
    next(error);
  }
};

const deleteProduct = async (req, res, next) => {
  const { productId } = req.params;
  try {
    const product = await Product.destroy({ where: { id: productId } });

    if (!product) {
      throw new ErrorHandler(404, "No products were found");
    }

    if (product) {
      res.status(204).json({
        status: "ok",
        code: 204,
        message: "Product has been deleted",
      });
    }
  } catch (error) {
    res.status(500).json({
      status: "error",
      code: 500,
      error: error.message,
    });
  }
};

const SearchForProduct = async (req, res, next) => {};

const AddSlugToProduct = async (req, res, next) => {
  try {
    const products = await Product.findAll();

    products.forEach((product) => {
      Product.findOne({
        where: { id: product.id },
      }).then((prod) => {
        prod.slug = prod.title.replace(/\s/g, "-").toLowerCase();
        prod.save();
      });
    });

    return res.status(200).send("Done");
  } catch (error) {
    return res.status(500).send({ err: error.message });
  }
};

module.exports = {
  getAllProducts,
  getProductById,
  getProductsByUserId,
  getUserProductsByStatus,
  getProductsByCategoryId,
  getProductsBySubCategoryId,
  createProduct,
  updateProduct,
  deleteProduct,
  AddSlugToProduct,
};
