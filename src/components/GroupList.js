import Board from "./Board";
import { Row, Spin, message } from "antd";
import { getBoard } from "../service";
import React, { Component } from "react";
import { DragDropContext } from "react-beautiful-dnd";
export default class GroupList extends Component {
  state = {
    data: [],
    currentIDGroup: null,
    currentTitleGroup: null,
    currentIndexGroup: null,

    currentIDTask: null,
    currentIndexTask: null,
    currentTitleTask: null,

    isAddGroup: false,
    isLoading: true
  };

  // Fetch data thông qua file service
  componentDidMount() {
    getBoard().then(data => {
      this.setState({ data, isLoading: false });
    });
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
  // kiểm tra board có re-render ko
  shouldComponentUpdate(nextProps, nextState) {
    if (nextProps !== this.props || nextState !== this.state) {
      return true;
    }
    return false;
  }

  // lấy index hiện tại của Task và Group
  handleClickTask = (idTask, idGroup) => {
    console.log('Click task', idTask, idGroup);
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
    // tìm index của Task và Group hiện tại
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

  // tìm idTask và idGroup
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
  // tạo task mới
  createTask = item => {
    this.state.data[this.state.currentIndexGroup].tasks.push(item);
    this.setState({
      data: this.state.data
    });
  };

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
    this.setState({ data: this.state.data });
  };

  deleteTask = ( idTask, idGroup ) => {
    this.state.data[idGroup -1 ].tasks.splice(
      idTask -1,
      1
    );
    this.setState({ data: this.state.data });
    this.success();
  };


   success = (message) => {
    message.success(message);
  };
  
   error = (message) => {
    message.error(message);
  };
  
   warning = (message) => {
    message.warning(message);
  };

  onDragEnd = result => {
    const { destination, source } = result;
    // return nếu ko có đích đến
    if (!destination) return;
    // return nếu cột đi = cột đích
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }
    const { index } = source;
    const column = this.state.data;
    // lấy index cột gốc
    const sourceColumnIndex = column[source.droppableId - 1];
   
    let [updatedColumn] = sourceColumnIndex.tasks.splice(index, 1);
    // thêm task vào cột đích
    let demo = column[destination.droppableId - 1].tasks.splice(destination.index,0,updatedColumn);
   
    this.setState({
      data: [
        ...column,
       [sourceColumnIndex]: demo
      ],
      ...this.state
    });
  };

  render() {
    const { data, isLoading } = this.state;
    if (isLoading || !this.state.data) {
      return (
        <Row   text-align="center" style={{position:'fixed',top:'50%',left:'50%'}} >
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
