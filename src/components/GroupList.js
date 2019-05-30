import Board from "./Board";
import { Row, Spin, message } from "antd";
import React, { Component } from "react";
import { DragDropContext } from "react-beautiful-dnd";
export default class GroupList extends Component {
  state = {
    data: [
      {
        id: 1,
        title: "To do",
        tasks: []
      },
      {
        id: 2,
        title: "Doing",
        tasks: []
      },
      {
        id: 3,
        title: "Done",
        tasks: []
      }
    ],
    currentIDGroup: null,
    currentTitleGroup: null,
    currentIndexGroup: null,

    currentIDTask: null,
    currentIndexTask: null,
    currentTitleTask: null,

    isAddGroup: false,
    isLoading: false
  };

  // Get data
  componentDidMount() {
    let local = JSON.parse(localStorage.getItem("task"));
    if (local) {
      this.setState({ data: local, isLoading: false });
    }
  }
  // get id of group & task
  handleClickGroup = id => {
    if (id === this.state.currentIDGroup) return;

    const { currentIndexGroup } = this.findIndex(id);
    const currentTitleGroup = this.state.data[currentIndexGroup].title;

    this.setState({
      currentIDGroup: id,
      currentIndexGroup,
      currentTitleGroup
    });
  };
  // Check component re-render
  shouldComponentUpdate(nextProps, nextState) {
    if (nextProps !== this.props || nextState !== this.state) {
      return true;
    }
    return false;
  }

  // Get current idnex of Task & Group
  handleClickTask = (idTask, idGroup) => {
    if (idTask === this.state.currentIDTask) return;

    const { currentIndexTask, currentIndexGroup } = this.findIndex(
      idGroup,
      idTask
    );

    const currentTitleTask = this.state.data[currentIndexGroup].tasks[
      currentIndexTask
    ].title;

    this.setState({
      currentIDTask: idTask,
      currentIndexTask,
      currentTitleTask
    });
  };

  handleAddTask = (idTask, idGroup) => {
    if (idTask === this.state.currentIDTask) return;
    // find current index of Task & Group
    const { currentIndexTask, currentIndexGroup } = this.findIndex(
      idTask,
      idGroup
    );
    const currentTitleTask = this.state.data[currentIndexGroup].tasks[
      currentIndexTask
    ].title;

    this.setState({
      currentIDTask: idTask,
      currentIndexTask,
      currentTitleTask
    });
  };

  // Find idTask & idGroup
  findIndex = (idGroup, idTask) => {
    let currentIndexGroup;
    let currentIndexTask;

    this.state.data.forEach((item, index) => {
      if (item.id === idGroup) {
        currentIndexGroup = index;

        item.tasks.forEach((task, index) => {
          if (task.id === idTask) {
            currentIndexTask = index;
          }
        });
      }
    });
    return { currentIndexGroup, currentIndexTask };
  };
  // Create task
  createTask = item => {
    let data = this.state.data;
    data[this.state.currentIndexGroup].tasks.push(item);
    this.setState(
      {
        data: data
      },
      () => localStorage.setItem("task", JSON.stringify(data))
    );
  };

  // Update task
  updateTask = title => {
    const taskClone = this.state.data[this.state.currentIndexGroup].tasks[
      this.state.currentIndexTask
    ];
    taskClone.title = title;
    this.state.data[this.state.currentIndexGroup].tasks.splice(
      this.state.currentIndexTask,
      1,
      taskClone
    );
    this.setState({ data: this.state.data }, () =>
      localStorage.setItem("task", JSON.stringify(this.state.data))
    );
  };

  deleteTask = (index, idGroup) => {
    this.state.data[idGroup - 1].tasks.splice(index, 1);

    this.setState({ data: this.state.data }, () =>
      localStorage.setItem("task", JSON.stringify(this.state.data))
    );
    this.success("Delete sucess");
  };
  // Message
  success = res => {
    message.success(res);
  };

  error = res => {
    message.error(res);
  };

  warning = res => {
    message.warning(res);
  };

  onDragEnd = result => {
    const { destination, source } = result;
    // return if no have destination
    if (!destination) return;
    // return column destination = column source
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }
    const { index } = source;
    const column = this.state.data;
    // find source column index
    const sourceColumnIndex = column[source.droppableId - 1];

    let [updatedColumn] = sourceColumnIndex.tasks.splice(index, 1);
    // add new task into destination column
    let taskGrag = column[destination.droppableId - 1].tasks.splice(
      destination.index,
      0,
      updatedColumn
    );

    this.setState(
      {
        data: [...column, ([sourceColumnIndex]: taskGrag)],
        ...this.state
      },
      () => localStorage.setItem("task", JSON.stringify(this.state.data))
    );
  };

  render() {
    const { data, isLoading } = this.state;
    if (isLoading || !this.state.data) {
      return (
        <Row
          text-align="center"
          style={{ position: "fixed", top: "50%", left: "50%" }}
        >
          <Spin tip="Loading..." size="large" />
        </Row>
      );
    }
    const groupElement = data.map(group => (
      <Board
        {...this.props}
        key={group.id}
        success={this.success}
        error={this.error}
        groupID={group.id}
        groupTitle={group.title}
        groupTasks={group.tasks}
        onClickGroup={this.handleClickGroup}
        onClickTask={this.handleClickTask}
        currentIndexTask={this.currentIndexTask}
        currentTitleGroup={this.state.currentTitleGroup}
        currentTitleTask={this.state.currentTitleTask}
        createTask={this.createTask}
        updateTask={this.updateTask}
        onChangeTask={({ target }) =>
          this.setState({ currentTitleTask: target.value })
        }
        deleteTask={this.deleteTask}
      />
    ));
    return (
      <div>
        <DragDropContext onDragEnd={this.onDragEnd}>
          <Row gutter={16} justify="space-around" style={{ padding: "1rem 0" }}>
            {groupElement}
          </Row>
        </DragDropContext>
      </div>
    );
  }
}
