const models = require("../database/models");
const { States, LocalGovernmentArea } = models;
const { ErrorHandler } = require("../utilities/errorHandler");

const getStates = async (req, res, next) => {
  try {
    const states = await States.findAll({
      include: [{ model: LocalGovernmentArea, as: "lga" }],
    });

    if (states) {
      return res.status(200).json({
        status: "ok",
        code: 200,
        message: "All states retrieved successfully",
        data: { states },
      });
    }

    next();
  } catch ({ message }) {
    next(error);
  }
};

const getStateById = async (req, res, next) => {
  try {
    const { stateId } = req.params;

    const state = await States.findOne({
      where: { id: stateId },
      include: [{ model: LocalGovernmentArea, as: "lga" }],
    });

    if (!state) throw new ErrorHandler(404, "This state was not found");

    if (state) {
      return res.status(200).json({
        status: "ok",
        code: 200,
        message: "State retrieved successfully",
        data: { state },
      });
    }
    next();
  } catch (error) {
    next(error);
  }
};

const getLgaByState = async (req, res, next) => {
  try {
    const { stateId } = req.params;

    const state = await States.findOne({ where: { id: stateId } });
    if (!state) throw new ErrorHandler(404, "This state was not found");

    const lga = await LocalGovernmentArea.findAll({
      where: { stateId },
      include: [{ model: States, as: "state" }],
    });

    if (lga) {
      return res.status(200).json({
        status: "ok",
        code: 200,
        data: { lga },
      });
    }
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getStates,
  getStateById,
  getLgaByState,
};
