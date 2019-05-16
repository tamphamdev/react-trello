import React from 'react';
import {List, Typography} from 'antd';
import '../css/Task.css';
const { Paragraph } = Typography;

const Task = (props) => {
   const {taskTitle,taskDate, updateTask, taskID, groupID ,onClickTask} = props

  return (
    <div className="Task-Box" onClick={onClickTask.bind(this, taskID, groupID)} id={taskID}>
      <Paragraph editable={{ onChange: updateTask }}>{taskTitle}</Paragraph>
       <List
      size="small"
      dataSource={[taskDate]}
      renderItem={item => <List.Item>{item}</List.Item>}
    />
    </div>
  );
};

export default Task;