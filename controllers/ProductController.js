const fs = require("fs");
const models = require("../database/models");
const { ErrorHandler } = require("../utilities/errorHandler");

const {
  User,
  States,
  Uploads,
  Product,
  Profile,
  Subscriptions,
  ProductSubCategory,
  ProductMainCategory,
  LocalGovernmentArea,
  SubscriptionPackage,
} = models;

const getAllProducts = async (req, res, next) => {
  try {
    const products = await Product.findAll({
      include: [
        { model: User, as: "creator" },
        { model: ProductMainCategory, as: "mainCategory" },
        { model: ProductSubCategory, as: "subCategory" },
        { model: States, as: "state" },
        { model: LocalGovernmentArea, as: "lga" },
        {
          model: Subscriptions,
          as: "subscription",
          include: { model: SubscriptionPackage, as: "package" },
        },
      ],
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
      include: [
        { model: User, as: "creator" },
        { model: ProductMainCategory, as: "mainCategory" },
        { model: ProductSubCategory, as: "subCategory" },
        { model: States, as: "state" },
        { model: LocalGovernmentArea, as: "lga" },
        {
          model: Subscriptions,
          as: "subscription",
          include: { model: SubscriptionPackage, as: "package" },
        },
      ],
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
      include: [
        { model: User, as: "creator" },
        { model: ProductMainCategory, as: "mainCategory" },
        { model: ProductSubCategory, as: "subCategory" },
        { model: States, as: "state" },
        { model: LocalGovernmentArea, as: "lga" },
        {
          model: Subscriptions,
          as: "subscription",
          include: { model: SubscriptionPackage, as: "package" },
        },
      ],
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
      include: [
        { model: User, as: "creator" },
        { model: ProductMainCategory, as: "mainCategory" },
        { model: ProductSubCategory, as: "subCategory" },
        { model: States, as: "state" },
        { model: LocalGovernmentArea, as: "lga" },
        {
          model: Subscriptions,
          as: "subscription",
          include: { model: SubscriptionPackage, as: "package" },
        },
      ],
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
      include: [
        { model: User, as: "creator" },
        { model: ProductMainCategory, as: "mainCategory" },
        { model: ProductSubCategory, as: "subCategory" },
        { model: States, as: "state" },
        { model: LocalGovernmentArea, as: "lga" },
        { model: Subscriptions, as: "subscription" },
        {
          model: Subscriptions,
          as: "subscription",
          include: { model: SubscriptionPackage, as: "package" },
        },
      ],
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
      include: [
        {
          model: User,
          as: "creator",
          include: { model: Profile, as: "profile" },
        },
        { model: ProductMainCategory, as: "mainCategory" },
        { model: ProductSubCategory, as: "subCategory" },
        { model: States, as: "state" },
        { model: LocalGovernmentArea, as: "lga" },
        {
          model: Subscriptions,
          as: "subscription",
          include: { model: SubscriptionPackage, as: "package" },
        },
      ],
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
      // start upload
      if (req.file) {
        const file = global.__basedir + "/uploads/" + req.file.filename;

        fs.rename(req.file.path, file, async function (err) {
          try {
            if (err) {
              res.status(500).send(err);
            } else {
              await Uploads.create({
                productId: product.id,
                filename: req.file.filename,
              });
            }
          } catch (err) {
            throw new ErrorHandler(500, err.message);
          }
        });
      }
      // end upload

      const newProduct = await Product.findOne({
        where: { id: product.id },
        include: [
          { model: User, as: "creator" },
          { model: ProductMainCategory, as: "mainCategory" },
          { model: ProductSubCategory, as: "subCategory" },
          { model: States, as: "state" },
          { model: LocalGovernmentArea, as: "lga" },
        ],
      });

      return res.status(201).json({
        status: "ok",
        code: 201,
        message: "Your product has been successfully created",
        data: { product: newProduct },
      });
    }

    next();
  } catch (error) {
    next(error);
  }
};

const updateProduct = async (req, res, next) => {
  try {
    const {
      categoryId,
      title,
      description,
      price,
      inspection_address,
    } = req.body;

    const { productId } = req.params;

    const product = await Product.findOne({ where: { id: productId } });

    if (!product) {
      throw new ErrorHandler(404, "No product was found.");
    }

    product.categoryId = categoryId;
    product.title = title;
    product.description = description;
    product.price = price;
    product.inspection_address = inspection_address;
    product.slug = title.replace(/\s/g, "-").toLowerCase();
    await product.save();

    const updatedProduct = await Product.findOne({
      where: { id: productId },
      include: [
        { model: User, as: "creator" },
        { model: ProductMainCategory, as: "mainCategory" },
        {
          model: Subscriptions,
          as: "subscription",
          include: { model: SubscriptionPackage, as: "package" },
        },
      ],
    });
    return res.status(200).json({
      status: "ok",
      code: 201,
      message: "Product has been updated successfully",
      data: { product: updatedProduct },
    });
  } catch (error) {
    return res.status(500).json({ err: error.message });
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
