import React, { Component } from "react";
import axios from "axios";

import "../Styles/Item.css";

// MUI Stuff
import Checkbox from "@material-ui/core/Checkbox";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Chip from "@material-ui/core/Chip";

export class Item extends Component {
  state = {
    isEdit: false,
  };

  toggleEditMode = () => {
    this.setState({
      isEdit: !this.state.isEdit,
    });
  };

  handleSave = () => {
    const id = this.props.listObject._id;
    const item = this.props.getItem(id);
    this.props.api_updateItem(item);
    this.toggleEditMode();
  };

  formatDate = (old_date) => {
    let current_date = new Date(old_date)
    let year = current_date.getFullYear();
    let month = current_date.getMonth() + 1 < 10 ? "0" + (current_date.getMonth() + 1) : current_date.getMonth() + 1;
    let date = current_date.getDate() < 10 ? "0" + current_date.getDate() : current_date.getDate();
    let hours = current_date.getHours() < 10 ? "0" + current_date.getHours() : current_date.getHours();
    let mins = current_date.getMinutes() < 10 ? "0" + current_date.getMinutes() : current_date.getMinutes();
    let secs = current_date.getSeconds() < 10 ? "0" + current_date.getSeconds() : current_date.getSeconds();

    return year + "-" + month + "-" + date + " | " + hours + ":" + mins + ":" + secs;
  }



  render() {
    const {
      listObject,
      handleCBChange,
      handleChange,
      handleRemove,
    } = this.props;
    const { isEdit } = this.state;

    return (
      <div className="al-list-item">
        <Checkbox
          checked={listObject.isChecked}
          onChange={handleCBChange}
          name={listObject._id}
          color="primary"
        />
        {!listObject.isChecked ? (
          !isEdit ? (
            <Typography
              variant="body1"
              onClick={this.toggleEditMode}
              label="Click to edit"
            >
              {listObject.item === "" ? "Click to edit" : listObject.item}
            </Typography>
          ) : (
            <>
              <TextField
                name={listObject._id}
                variant="outlined"
                value={listObject.item}
                onChange={handleChange}
                autoFocus
              />
              <button onClick={this.handleSave} className="save-btn">
                Save
              </button>
            </>
          )
        ) : (
          <>
            <Typography
              variant="body1"
              onClick={this.toggleEditMode}
              label="Click to edit"
              className="strikeout"
            >
              {listObject.item === "" ? "Uncheck to edit" : listObject.item}
            </Typography>

            <button
              name={listObject._id}
              onClick={handleRemove}
              className="remove-btn"
            >
              Remove
            </button>
          </>
        )}
        <Chip label={this.formatDate(listObject.createdAt)} variant="outlined" size="small" style={{ marginLeft: "1rem", fontSize: "10px" }} />
      </div>
    );
  }
}

export default Item;
