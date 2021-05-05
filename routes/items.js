
const Item = require("../models/item.model");

// Get all Items
exports.getAllItems = (request, response) => {
  Item.find()
    .then((items) => {
      response.status(200).json(items);
    })
    .catch((err) =>
      response.status(500).json({ code: "INTERNAL_SERVER_ERROR", err: err })
    );
};

// Add new Item
exports.addItem = (request, response) => {
  const item = {
    item: request.body.item,
    isChecked: request.body.isChecked,
  };

  const newItem = new Item(item);

  newItem
    .save()
    .then(() => response.status(200).json({ code: "SUCCESS" }))
    .catch((err) => {
      console.log(err);
      response.status(500).json({ code: "INTERNAL SERVER ERROR" });
    });
};

// Update an Item
exports.updateItem = (request, response) => {
  Item.updateOne(
    { _id: request.body._id },
    {
      $set: {
        item: request.body.item,
        isChecked: request.body.isChecked,
      },
    }
  )
    .then(() => {
      response.status(200).json({ code: "SUCCESS" });
    })
    .catch((err) => {
      response.status(500).json({ code: "INTERNAL SERVER ERROR" });
    });
};

// Delete an Item
exports.deleteItem = (request, response) => {
  Item.deleteOne({ _id: request.body._id })
    .then(() => {
      response.status(200).json({ code: "SUCCESS" });
    })
    .catch((err) => {
      console.log(err);
      response.status(500).json({ code: "INTERNAL SERVER ERROR" });
    });
};
