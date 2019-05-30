import "../css/Task.css";
import React from "react";
import styled from "styled-components";
import moment from "moment";
import { Draggable } from "react-beautiful-dnd";
import { List, Typography, Icon, Popconfirm } from "antd";

const { Paragraph } = Typography;
const Container = styled.div`
  border: 1px solid ${props => (props.isDragging ? "lightgrey" : "none")};
  background-color: ${props => (props.isDragging ? "lightgreen" : "white")};
`;
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
      {(provided, snapshot) => {
        return (
          <Container
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            isDragging={snapshot.isDragging}
            ref={provided.innerRef}
            className={classesName}
            id={taskID}
          >
            <Paragraph
              editable={{ onChange: updateTask }}
              onClick={() => onClickTask(taskID, groupID)}
            >
              {taskTitle}
            </Paragraph>
            <List
              size="small"
              dataSource={[startDate, endDate]}
              renderItem={item => <List.Item>{item}</List.Item>}
            />
            <Popconfirm
              title="Are you sure delete task?"
              onConfirm={() => deleteTask(index, groupID)}
              okText="Yes"
              cancelText="No"
            >
              <Icon type="delete" style={{ color: "red" }} />
            </Popconfirm>
          </Container>
        );
      }}
    </Draggable>
  );
};

export default Task;
