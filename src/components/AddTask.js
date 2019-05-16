import React from "react";
import { Input, Button } from "antd";
import moment from "moment";
const AddTask = props => {

  const addTaskStyle = {
    padding: "10px 0"
  };
  
 
  const { cancelAddTask, createTask } = props;

  const handleSubmit = event => {
    event.preventDefault();
    const input = event.target.querySelector("input");
    let text = input.value;
    if (!text) return;
    text = text.trim();
    let date = Date.now();
    let time = moment(date).format("MMMM Do YYYY, h:mm:ss a");

    const item = {
      id: date,
      title: text,
      date: time
    };

    console.log({ item });
    createTask(item);
    cancelAddTask(event);
  };

  return (
    <div>
      <form onSubmit={handleSubmit} stlye={addTaskStyle}>
        <Input type="text" placeholder="New task" style={{ margin: "15px" }} />
        <Button htmlType="submit" style={{ marginRight: "20px" }}>
          Add
        </Button>
        <Button onClick={cancelAddTask}>Cancel</Button>
      </form>
    </div>
  );
};

export default AddTask;
