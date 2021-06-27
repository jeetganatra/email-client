import React, { useState, useEffect } from "react";
import { Button, notification, Menu, Table, Row, Col } from "antd";
import "antd/dist/antd.css";
import styles from "../Home.module.css";
import moment from "moment";

const TableData = ({ category, mailList }) => {
  console.log("table called");
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
  });
  const handleTableChange = () => {
    // console.log('UPDATE_TABLE');
    setPagination((prev) => ({ ...prev, total: mailList.length }));
  };

  useEffect(() => {
    console.log("USEEFFECT table");
    handleTableChange();
  }, [mailList]);

  const columns = [
    {
      title: "Scheduled At",
      dataIndex: "scheduledAt",
      render: (post) => `${moment(post).fromNow()}`,
      width: "15%",
    },
    {
      title: "Scheduled for",
      dataIndex: "scheduledFor",
      render: (post) => (post !== "" ? `${post}` : "Not Scheduled"),
      width: "15%",
    },
    {
      title: "To",
      dataIndex: "to",
      width: "15%",
    },
    {
      title: "Subject",
      dataIndex: "subject",
    },
  ];

  return (
    <div className={styles["container-right"]}>
      <div>
        <h1>{category}</h1>
        <Table
          columns={columns}
          rowKey={(record) => record._id}
          dataSource={mailList}
          pagination={false}
        />
      </div>
    </div>
  );
};

export default TableData;
