import React, { Component } from "react";
import { Icon } from "antd";
import { Droppable } from "react-beautiful-dnd";
import AddTask from "./AddTask";
import Task from "./Task";

const taskStyle = {
  margin: "20px 0",
  fontSize: "1.1rem"
};
class TaskList extends Component {
  state = {
    isAddTask: false
  };

  handleClickAddTask = e => {
    this.setState({ isAddTask: true });
  };
  // cancel add task
  handleClickCancelAddTask = e => {
    e.preventDefault();
    this.setState({ isAddTask: false });
  };

  render() {
    const { groupTasks, groupID } = this.props;

    let taskElement = groupTasks.map((task, index) => (
      <Task
        style={taskStyle}
        key={task.id}
        taskID={task.id}
        taskTitle={task.title}
        taskDate={task.date}
        index={index}
        {...this.props}
      />
    ));
    return (
      <React.Fragment>
        <Droppable droppableId={groupID}>
          {provided => (
            <div ref={provided.innerRef}
              {...provided.droppableProps}
            >
              {taskElement}

              {provided.placeholder}
            </div>
          )}
        </Droppable>
        {this.state.isAddTask ? (
          <AddTask
            {...this.props}
            cancelAddTask={this.handleClickCancelAddTask}
          />
        ) : (
          <div onClick={this.handleClickAddTask} style={taskStyle}>
            <Icon type="plus-circle" theme="twoTone" /> Add new task
          </div>
        )}
      </React.Fragment>
    );
  }
}

export default TaskList;
