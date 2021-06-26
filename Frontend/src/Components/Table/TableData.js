import React, { useState, useEffect } from 'react';
import { Button, notification, Menu, Table, Row, Col } from 'antd';
import 'antd/dist/antd.css';
import styles from '../Home.module.css';
import moment from 'moment';

const TableData = ({ category, mailList }) => {
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 1,
  });
  const handleTableChange = () => {
    console.log('UPDATE_TABLE');
    setPagination((prev) => ({ ...prev, total: mailList.length }));
  };

  useEffect(() => {
    handleTableChange();
  }, [mailList]);

  const time = mailList.map((mail) => {
    const date = new Date(mail.scheduledAt);
    return date.toTimeString().substring(0, 8);
  });

  // console.log(time);

  const dates = mailList.map((mail) => {
    const date = new Date(mail.scheduledAt);
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let dt = date.getDate();

    if (dt < 10) {
      dt = '0' + dt;
    }
    if (month < 10) {
      month = '0' + month;
    }

    return dt + '/' + month + '/' + year;
  });

  // console.log(dates);

  const todayDate = new Date();

  const curTime = todayDate.toTimeString().substring(0, 8);
  // console.log(curTime);

  let year = todayDate.getFullYear();
  let month = todayDate.getMonth() + 1;
  let dt = todayDate.getDate();

  if (dt < 10) {
    dt = '0' + dt;
  }
  if (month < 10) {
    month = '0' + month;
  }

  const curDate = dt + '/' + month + '/' + year;
  // console.log(curDate);

  const columns = [
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
      filters: [
        { text: 'Every minute', value: 'male' },
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
          rowKey={(record) => record._id}
          dataSource={mailList}
          pagination={false}
        />
      </div>
    </div>
  );
};

export default TableData;
