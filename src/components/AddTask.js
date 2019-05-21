import React, { Component } from "react";
import { Input, Button, DatePicker } from "antd";
import moment from "moment";
const { RangePicker } = DatePicker;
const addTaskStyle = {
  padding: "10px 0"
};

moment().format();
class AddTask extends Component {
  state = {
    startDate: "",
    endDate: ""
  };

  onChange = (date, dateString) => {
    console.log(dateString);
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
    console.log({ item });
    this.props.createTask(item);
    this.props.cancelAddTask(event);
  };

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit} stlye={addTaskStyle}>
          <Input
            type="text"
            placeholder="New task"
            style={{ margin: "15px" }}
          />
          <RangePicker onChange={this.onChange} format={"DD/MM/YYYY"} />
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
