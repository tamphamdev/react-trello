import React, { Component } from "react";
import { Input, Button, DatePicker } from "antd";
import moment from "moment";
const { RangePicker } = DatePicker;
const addTaskStyle = {
  textalign: "center",
  padding: "10px 0"
};
const margin = {
  margin: "1rem 0"
};
moment().format();
class AddTask extends Component {
  state = {
    startDate: "",
    endDate: ""
  };

  onChange = (date, dateString) => {
    this.setState({
      startDate: dateString[0],
      endDate: dateString[1]
    });
  };

  handleSubmit = event => {
    event.preventDefault();
    const input = event.target.querySelector("input");
    let text = input.value;
    if (!text) return;
    text = text.trim();
    let startDate = this.state.startDate;
    let endDate = this.state.endDate;
    let miliSecond = String(moment().valueOf(startDate));

    const item = {
      id: miliSecond,
      title: text,
      startDate,
      endDate
    };

    this.props.createTask(item);
    this.props.success("Add sucess");
    this.props.cancelAddTask(event);
  };

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit} stlye={addTaskStyle}>
          <Input
            required
            type="text"
            placeholder="New task"
            style={{ margin: "10px 0" }}
          />
          <RangePicker
            onChange={this.onChange}
            format={"DD/MM/YYYY"}
            style={margin}
          />
          <Button htmlType="submit" style={{ marginRight: "20px" }}>
            Add
          </Button>
          <Button onClick={this.props.cancelAddTask}>Cancel</Button>
        </form>
      </div>
    );
  }
}

export default AddTask;
