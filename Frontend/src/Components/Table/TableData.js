import React, { useState, useEffect } from 'react';
import { Button, notification, Menu, Table, Row, Col, Tag } from 'antd';
import 'antd/dist/antd.css';
import styles from '../Home.module.css';
import moment from 'moment';

const TableData = ({ category, mailList }) => {
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
  });
  const handleTableChange = (value) => {
    console.log('UPDATE_TABLE', value?.current);

    setPagination((prev) => ({
      ...prev,
      total: mailList.length,
      current: value ? value.current : 1,
    }));
  };

  useEffect(() => {
    console.log('USEEFFECT');
    handleTableChange();
  }, [mailList]);

  const columns = [
    {
      title: '',
      dataIndex: 'copies',
      render: (text) => {
        return text > 1 && <Tag color='green'>{text}</Tag>;
      },
      width: '0.5%',
    },
    {
      title: 'Scheduled At',
      dataIndex: 'scheduledAt',
      render: (post) => `${moment(post).fromNow()}`,
      width: '15%',
    },
    {
      title: 'Scheduled for',
      dataIndex: 'scheduledFor',
      render: (post) => (post !== '' ? `${post}` : 'Not Scheduled'),
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
          rowKey={(record) => record._id}
          dataSource={mailList}
          pagination={pagination}
          onChange={handleTableChange}
        />
      </div>
    </div>
  );
};

export default TableData;
