import React, { Component } from "react";
import { Icon } from "antd";
import AddTask from "./AddTask";
import Task from './Task';

const taskStyle = {
  margin: '20px 0',
  fontSize: '1.1rem',
  
}
class TaskList extends Component {
  state = {
    isAddTask: false
  };

  handleClickAddTask = e => {
    this.setState({ isAddTask: true });
  };

  handleClickCancelAddTask = e => {
    e.preventDefault();
    this.setState({ isAddTask: false });
  };

  render() {
    const {groupTasks} = this.props;
  
    let taskElement = groupTasks.map((task) => 
        <Task style={taskStyle}
              key={task.id}
              taskID={task.id}
              taskTitle={task.title} 
              taskDate={task.date}
              {...this.props}
        />
      )
    return (
      <React.Fragment>
           {taskElement}
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
