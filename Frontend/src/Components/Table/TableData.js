import React, { useState } from 'react';
import { Button, notification, Menu, Table, Row, Col } from 'antd';
import 'antd/dist/antd.css';
import styles from '../Home.module.css';

const TableData = ({ category }) => {
  const [data, setData] = useState([]);
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    total: 10,
    alignmentBottom: 'center',
  });

  const columns = [
    {
      title: 'Created At',
      dataIndex: 'createdAt',
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
      title: 'Receipent',
      dataIndex: 'receipent',
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
          rowKey={(record) => record.xyz}
          pagination={pagination}
          dataSource={data}
          loading={false}
          // onChange={this.handleTableChange}
        />
      </div>
    </div>
  );
};

export default TableData;
