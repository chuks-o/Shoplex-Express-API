const models = require("../database/models");
const { User, Profile } = models;

const getUser = async (req, res, next) => {
  try {
    const user = await User.findOne({
      where: { id: req.params.id },
      include: { model: Profile, as: "profile" }
    });

    if (!user) {
      return res
        .status(400)
        .json({ status: "error", code: 400, message: "No user found" });
    }

    return res.status(200).json({ status: "error", code: 200, data: { user } });
  } catch (error) {}
};

const updateUser = async (req, res, next) => {
  try {
    const user = await User.findOne({ where: { id: req.params.userId } });
    if (!user) {
      return res.status(400).json({
        status: "error",
        code: 400,
        message: "This user was not found"
      });
    }

    const {
      firstname,
      lastname,
      phone,
      address,
      state,
      city,
      country,
      dob
    } = req.body;

    await user.update({ lastname, firstname });
    const profile = await Profile.findOne({
      where: { userId: req.params.userId }
    });

    if (!profile) await Profile.create(req.body);
    else await profile.update({ phone, address, state, city, country, dob });

    const updatedUser = await User.findOne({
      where: { id: user.id },
      include: { model: Profile, as: "profile" }
    });

    return res.status(200).json({
      status: "ok",
      code: 200,
      message: "User profile has been updated successfully",
      data: { user: updatedUser }
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = { getUser, updateUser };
