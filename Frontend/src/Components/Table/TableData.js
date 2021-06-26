import React, { useState } from 'react';
import { Button, notification, Menu, Table, Row, Col } from 'antd';
import 'antd/dist/antd.css';
import styles from '../Home.module.css';

const TableData = ({ category, mailList }) => {
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    total: 10,
    alignmentBottom: 'center',
  });

  console.log(mailList);

  const columns = [
    {
      title: 'Scheduled At',
      dataIndex: 'scheduledAt',
      width: '15%',
    },
    {
      title: 'Scheduled for',
      dataIndex: 'scheduledFor',
      filters: [
        { text: 'Male', value: 'male' },
        { text: 'Female', value: 'female' },
      ],
      width: '15%',
    },
    {
      title: 'To',
      dataIndex: 'to',
      width: '15%',
    },
    {
      title: 'Subject',
      dataIndex: 'subject',
    },
  ];

  return (
    <div className={styles['container-right']}>
      <div>
        <h1>{category}</h1>
        <Table
          columns={columns}
          // rowKey={(record) => record.scheduledAt}
          pagination={pagination}
          dataSource={mailList}
          loading={false}
          // onChange={this.handleTableChange}
        />
      </div>
    </div>
  );
};

export default TableData;
