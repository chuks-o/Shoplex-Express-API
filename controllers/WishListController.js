const models = require("../database/models");

const { Wishlist, Product, User } = models;

const addToWishList = async (req, res, next) => {
  try {
    const wishlist = await Wishlist.create(req.body); // productId, userId

    if (wishlist) {
      return res.status(200).json({
        status: "ok",
        code: 200,
        message: "Wishlist added successfully",
        data: { wishlist }
      });
    }
  } catch (error) {
    res.status(500).json({
      status: "error",
      data: { error: error.message }
    });
  }
};

const getWishlistsByUser = async (req, res, next) => {
  const { userId } = req.params;

  try {
    const wishlists = await Wishlist.findAll({
      where: { userId },
      include: [{ model: Product, as: "product", include: { all: true } }]
    });

    if (wishlists) {
      return res.status(200).json({
        status: "ok",
        code: 200,
        message: "Wishlist retrieved successfully",
        data: { wishlists }
      });
    }
  } catch (error) {
    return res.status(500).json({
      status: "ok",
      data: { error: error.message }
    });
  }
};

const removeFromWishList = async (req, res, next) => {
  const { wishlistId } = req.body;
  try {
    const wishlist = await Wishlist.destroy({
      where: { id: wishlistId }
    });

    if (wishlist) {
      return res.status(204).send({
        status: "ok",
        message: "Wishlist has been removed from the list"
      });
    }
  } catch (error) {
    return res.status(500).send({
      status: "error",
      data: { error: error.message }
    });
  }
};

module.exports = {
  addToWishList,
  getWishlistsByUser,
  removeFromWishList
};
