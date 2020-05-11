const models = require("../database/models");
const { ProductSubCategory } = models;

const getSubCategoriesByMainCategoryId = async (req, res, next) => {
  try {
    const { categoryId } = req.params;
    const subcategories = await ProductSubCategory.findAll({
      where: { productMainCategoryId: categoryId }
    });

    if (subcategories) {
      return res.status(200).json({
        status: "ok",
        code: 200,
        message: "Sub categories retrieved",
        data: { subcategories }
      });
    }
  } catch ({ message }) {
    return res.status(500).json({
      status: "ok",
      code: 500,
      data: { error: message }
    });
  }
};

const createSubCategories = async (req, res, next) => {
  try {
    const subcategory = await ProductSubCategory.create(req.body);

    if (subcategory) {
      return res.status(200).json({
        status: "ok",
        code: 200,
        message: "Sub categories created successfully",
        data: { subcategory }
      });
    }
  } catch ({ message }) {
    return res.status(500).json({
      status: "ok",
      code: 500,
      data: { error: message }
    });
  }
};

module.exports = {
  createSubCategories,
  getSubCategoriesByMainCategoryId
};
