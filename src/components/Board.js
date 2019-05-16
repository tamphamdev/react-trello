import React, { Component } from "react";
import { Col, Card } from "antd";
import TaskList from "./TaskList";

export default class Board extends Component {
  
  render() {
    const { groupTitle, onClickGroup, groupID } = this.props;
    return (
  
      <div >
        <Col
          lg={8}
          md={8}
          sm={24}
          xs={24}
          onClick={onClickGroup.bind(this, groupID)}
          id={groupID}
        >
          <Card hoverable={true} title={groupTitle} >
            <TaskList {...this.props} />
          </Card>
        </Col>
      </div>
    );
  }
}
