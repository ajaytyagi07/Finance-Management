const { transectionModel } = require("../models/transectionModel");
const moment = require("moment");

const getAllTransection = async (req, res) => {
  try {
    const { frequency, selectedDate, type, userid } = req.body;
    let dateFilter = {};
    if (frequency !== "custom") {
      dateFilter = {
        date: {
          $gt: moment().subtract(Number(frequency), "days").toDate(),
        },
      };
    } else {
      dateFilter = {
        date: {
          $gte: selectedDate[0],
          $lte: selectedDate[1],
        },
      };
    }
    const transections = await transectionModel.find({
      ...dateFilter,
      userid,
      ...(type !== "all" && { type }),
    });
    res.status(200).json(transections);
  } catch (error) {
    console.error("Error fetching transactions:", error.message);
    res.status(500).json({ error: "Failed to fetch transactions" });
  }
};

const deleteTransection = async (req, res) => {
  try {
    await transectionModel.findOneAndDelete({ _id: req.body.transactionId });
    res.status(200).json({ message: "Transaction deleted" });
  } catch (error) {
    console.error("Error deleting transaction:", error.message);
    res.status(500).json({ error: "Failed to delete transaction" });
  }
};

const editTransection = async (req, res) => {
  try {
    await transectionModel.findOneAndUpdate(
      { _id: req.body.transactionId },
      req.body.payload
    );
    res.status(200).json({ message: "Transaction updated" });
  } catch (error) {
    console.error("Error editing transaction:", error.message);
    res.status(500).json({ error: "Failed to update transaction" });
  }
};

const addTransection = async (req, res) => {
  try {
    const newTransection = new transectionModel(req.body);
    await newTransection.save();
    res.status(201).json({ message: "Transaction created" });
  } catch (error) {
    console.error("Error adding transaction:", error.message);
    res.status(500).json({ error: "Failed to add transaction" });
  }
};

module.exports = {
  getAllTransection,
  addTransection,
  editTransection,
  deleteTransection,
};
