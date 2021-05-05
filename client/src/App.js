import "./App.css";
import { useState, useEffect } from "react";
import axios from "axios";

// Components
import Item from "./Components/Item";

// Icons
import { CgAddR } from "react-icons/cg";

const App = () => {
  const [state, setState] = useState({
    toDoList: [],
  });

  useEffect(() => {
    api_getAllItems();
  }, []);

  const api_getAllItems = () => {
    axios.get("/api/items").then((items) => {
      setState({ ...state, toDoList: items.data });
    });
  };

  const api_addNewItem = (item) => {
    axios
      .post("/api/item", item)
      .then((res) => {
        api_getAllItems();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const api_updateItem = (item) => {
    axios
      .post("/api/item/update", item)
      .then((res) => {
        api_getAllItems();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const api_deleteItem = (item) => {
    axios
      .post("/api/item/delete", item)
      .then((res) => {
        api_getAllItems();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getItem = (id) => {
    let index = state.toDoList.findIndex((obj) => obj._id == id);
    return state.toDoList[index];
  };

  const handleCBChange = (event) => {
    let toDoList = state.toDoList;
    let index = toDoList.findIndex((obj) => obj._id == event.target.name);
    let object = toDoList[index];

    object.isChecked = event.target.checked ? true : false;

    api_updateItem(object);
  };

  const handleRemove = (event) => {
    let toDoList = state.toDoList;
    let index = toDoList.findIndex((obj) => obj._id == event.target.name);
    let object = toDoList[index];
    api_deleteItem(object);
  };

  const handleChange = (event) => {
    let toDoList = state.toDoList;
    let index = toDoList.findIndex((obj) => obj._id == event.target.name);
    let object = toDoList[index];
    object.item = event.target.value;
    toDoList[index] = object;
    setState({
      ...setState,
      toDoList,
    });
  };

  const addNewItem = () => {
    const object = {
      item: "",
      isChecked: false,
    };
    api_addNewItem(object);
  };

  return (
    <div className="App">
      <div className="add-list" onClick={addNewItem}>
        <p className="add-list-title">Add New Item</p>
        <CgAddR className="add-list-icon" />
      </div>

      {state.toDoList.length > 0 && (
        <div className="items-wrapper">
          {state.toDoList.map((listObject) => {
            return (
              <Item
                key={listObject._id}
                listObject={listObject}
                handleCBChange={handleCBChange}
                handleChange={handleChange}
                handleRemove={handleRemove}
                getItem={getItem}
                api_updateItem={api_updateItem}
              />
            );
          })}
        </div>
      )}
    </div>
  );
};

export default App;
