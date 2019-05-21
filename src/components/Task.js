import "../css/Task.css";
import React from "react";
import moment from "moment";
import { Draggable } from "react-beautiful-dnd";
import { List, Typography, Icon } from "antd";
const { Paragraph } = Typography;

const Task = props => {
  const {
    taskTitle,
    startDate,
    endDate,
    updateTask,
    taskID,
    groupID,
    onClickTask,
    deleteTask,
    index
  } = props;
  let expired = moment(endDate, "DD/MM/YYYY");
  expired = expired.format("X");
  const now = moment().format("X");
  let classesName = "Task-Box";
  if (now > expired) {
    classesName += " Expired";
  }
  return (
    <Draggable draggableId={taskID} index={index}>
      {provided => {
        return (
          <div
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={provided.innerRef}
            className={classesName}
            id={taskID}
            onClick={onClickTask.bind(this, taskID, groupID)}
          >
            <Paragraph editable={{ onChange: updateTask }}>
              {taskTitle}
            </Paragraph>
            <Icon type="delete" onClick={deleteTask} style={{ color: "red" }} />
            <List
              size="small"
              dataSource={[startDate, endDate]}
              renderItem={item => <List.Item>{item}</List.Item>}
            />
          </div>
        );
      }}
    </Draggable>
  );
};

export default Task;
