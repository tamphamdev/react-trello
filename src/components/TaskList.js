import React, { Component } from "react";
import { Icon } from "antd";
import { Droppable } from "react-beautiful-dnd";
import AddTask from "./AddTask";
import styled from "styled-components";
import Task from "./Task";

const taskStyle = {
  margin: "20px 0",
  fontSize: "1.1rem"
};
const Container = styled.div`
  transition: background-color: .3 ease;
  background-color: ${props => (props.isDraggingOver ? "skyblue" : "white")};
`;
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
        startDate={task.startDate}
        endDate={task.endDate}
        index={index}
        {...this.props}
      />
    ));
    return (
      <React.Fragment>
        <Droppable droppableId={groupID}>
          {(provided, snapshot) => (
            <Container
              ref={provided.innerRef}
              {...provided.droppableProps}
              isDraggingOver={snapshot.isDraggingOver}
            >
              {taskElement}
              {provided.placeholder}
            </Container>
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
