import "../css/Task.css";
import React from "react";
import { Draggable } from "react-beautiful-dnd";
import { List, Typography, Icon } from "antd";
const { Paragraph } = Typography;

const Task = props => {
  const {
    taskTitle,
    taskDate,
    updateTask,
    taskID,
    groupID,
    onClickTask,
    deleteTask,
    index
  } = props;

  return (
    <Draggable draggableId={taskID} index={index}  >
      {provided => (
        <div
        {...provided.draggableProps}
        {...provided.dragHandleProps}
        ref={provided.innerRef}
        className="Task-Box"
        id={taskID}
        onClick={onClickTask.bind(this, taskID, groupID)}
        >
          <Paragraph editable={{ onChange: updateTask }}>{taskTitle}</Paragraph>
          <Icon type="delete" onClick={deleteTask} />
          <List
            size="small"
            dataSource={[taskDate]}
            renderItem={item => <List.Item>{item}</List.Item>}
          />
        </div>
      )}
    </Draggable>
  );
};

export default Task;
