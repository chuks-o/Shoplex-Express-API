const models = require("../database/models");
const { ProductMainCategory, ProductSubCategory } = models;
const { ErrorHandler } = require("../utilities/errorHandler");

const getMainCategories = async (req, res, next) => {
  try {
    const categories = await ProductMainCategory.findAll({
      include: [{ model: ProductSubCategory, as: "subCategory" }],
    });

    if (!categories) {
      throw new ErrorHandler(404, "There are no categories available");
    }

    if (categories) {
      return res.status(200).json({
        status: "ok",
        code: 200,
        data: { categories },
      });
    }

    next();
  } catch (error) {
    next(error);
  }
};

const getMainCategoryById = async (req, res, next) => {
  try {
    const { categoryId } = req.params;
    const category = await ProductMainCategory.findOne({
      where: { id: categoryId },
    });

    if (!category) {
      throw new ErrorHandler(404, "This category does not exist");
    }

    if (category) {
      return res.status(200).json({
        status: "ok",
        code: 200,
        data: { category },
      });
    }

    next();
  } catch (error) {
    next(error);
  }
};

const createMainCategory = async (req, res, next) => {
  try {
    const { title, slug } = req.body;
    const category = await ProductMainCategory.create({ title, slug });

    if (category) {
      return res.status(201).json({
        status: "ok",
        code: 201,
        message: "Product Category has been created successfully",
        data: { category },
      });
    }
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const updateMainCategory = async (req, res, next) => {
  try {
    const { title, slug } = req.body;
    const category = await ProductMainCategory.update(
      { title, slug },
      { where: { id: req.params.categoryId } }
    );

    if (category) {
      const newCategory = await ProductMainCategory.findOne({
        where: { id: req.params.categoryId },
      });
      return res.status(200).json({
        status: "ok",
        code: 200,
        message: "Product Category has been updated successfully",
        data: { category: newCategory },
      });
    }
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const deleteMainCategory = async (req, res, next) => {
  try {
    const { categoryId } = req.params;
    const category = await ProductMainCategory.destroy({
      where: { id: categoryId },
    });

    if (category) {
      return res.status(204).json({
        status: "ok",
        code: 204,
        message: "Product Category has been deleted successfully",
      });
    }
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getMainCategories,
  getMainCategoryById,
  createMainCategory,
  updateMainCategory,
  deleteMainCategory,
};
