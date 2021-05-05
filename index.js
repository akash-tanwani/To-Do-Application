const { app, port } = require("./utils/admin");

// Route variables
const {
  getAllItems,
  addItem,
  updateItem,
  deleteItem,
} = require("./routes/items");

// Connection
app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});

// Routes
app.get("/api/items", getAllItems);
app.post("/api/item", addItem);
app.post("/api/item/update", updateItem);
app.post("/api/item/delete", deleteItem);
