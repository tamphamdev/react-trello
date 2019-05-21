import React, { Component } from "react";
import { Col, Card } from "antd";
import TaskList from "./TaskList";

const styleBoard = {
  boxShadow: " 0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23)"
};
export default class Board extends Component {
  render() {
    const { groupTitle, onClickGroup, groupID } = this.props;
    return (
      <div>
        <Col
          lg={8}
          md={8}
          sm={24}
          xs={24}
          onClick={onClickGroup.bind(this, groupID)}
          id={groupID}
          >
          <Card style={styleBoard} hoverable={true} title={groupTitle}>
            <TaskList {...this.props} />
          </Card>
        </Col>
      </div>
    );
  }
}
