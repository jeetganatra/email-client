import React, { useState, useEffect } from "react";
import { Button, notification, Menu } from "antd";
import "antd/dist/antd.css";
import styles from "../Home.module.css";
import {
  DesktopOutlined,
  ContainerOutlined,
  MailFilled,
  BarsOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import TableData from "../Table/TableData";
import History from "../History/History";
import Scheduled from "../Scheduled/Scheduled";
import Compose from "../Compose/Compose";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getMails } from "../../actions/mails";
import { useSelector } from "react-redux";

const Home = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [keyValue, setKeyValue] = useState("2");
  let historyData = [];
  let scheduledData = [];
  const history = useHistory();
  const dispatch = useDispatch();
  const mailList = useSelector((state) => state.mails.mailList);
  const isLogged = localStorage.getItem("isLogged");
  const user = JSON.parse(localStorage.getItem("profile"));
  console.log(mailList);

  useEffect(() => {
    dispatch(getMails());
  }, [keyValue]);

  console.log(typeof isLogged);

  if (isLogged === "false") {
    alert("Enter credentials first!!");
    console.log("kicked");
    history.push("/");
    return <div>login required</div>;
  }

  const data = Object.keys(mailList).map(function (key, index) {
    return mailList[key];
  });
  // console.log(mailList);
  console.log(data);
  const filteredData = data.filter(
    (mail, idx) =>
      mail.creator === user.profile._id ||
      mail.creator === user.profile.googleId
  );
  console.log(filteredData);

  for (let i = 0; i < filteredData.length; i++) {
    const mail = filteredData[i];
    const curTime = new Date().getTime();
    const det = new Date(mail.scheduledAt).getTime();
    const toCheck = parseFloat((curTime - det) / (1000 * 60));
    console.log(mail.scheduledFor);

    if (mail.scheduledFor === "Every minute" && toCheck > 1.0) {
      historyData.push(mail);
    } else if (mail.scheduledFor === "Every week" && toCheck > 10080.0) {
      historyData.push(mail);
    } else if (mail.scheduledFor === "Every month" && toCheck > 43200.0) {
      historyData.push(mail);
    } else if (mail.scheduledFor === "Every year" && toCheck > 525600.0) {
      historyData.push(mail);
    } else if (mail.scheduledFor === "") {
      historyData.push(mail);
    } else {
      scheduledData.push(mail);
    }
  }

  return (
    <>
      <div className={styles["header"]}>
        <div className={styles["header-left"]}>
          <Button onClick={() => setIsCollapsed(!isCollapsed)}>
            <BarsOutlined />
          </Button>
          <MailFilled style={{ fontSize: "2rem", color: "black" }} />
          <div>
            <h1>notGmail</h1>
          </div>
        </div>
        <div className={styles["header-right"]}>
          <h2>Avatar</h2>
          <Button
            type="primary"
            danger
            shape="round"
            onClick={() => {
              dispatch({ type: "LOGOUT", payload: false });
              localStorage.setItem("isLogged", false);
              history.push("/");
            }}
          >
            Logout
          </Button>
        </div>
      </div>
      <div className={styles["container"]}>
        <div className={styles["container-left"]}>
          <Menu
            defaultSelectedKeys={["2"]}
            mode="inline"
            inlineCollapsed={isCollapsed}
          >
            <Button
              type="primary"
              shape="round"
              size="large"
              icon={<PlusOutlined />}
              onClick={() => setKeyValue("1")}
              style={{ margin: "10px", alignItems: "center" }}
            >
              {!isCollapsed && `Compose`}
            </Button>
            <Menu.Item
              key="2"
              icon={<ContainerOutlined />}
              onClick={() => setKeyValue("2")}
            >
              All Mails
            </Menu.Item>
            <Menu.Item
              key="3"
              icon={<DesktopOutlined />}
              onClick={() => setKeyValue("3")}
            >
              Scheduled
            </Menu.Item>
            <Menu.Item
              key="4"
              icon={<ContainerOutlined />}
              onClick={() => setKeyValue("4")}
            >
              History
            </Menu.Item>
          </Menu>
        </div>
        {keyValue === "1" && <Compose setKeyValue={setKeyValue} />}
        {(keyValue === "2" || keyValue === "1") && (
          <TableData category="All Mails" mailList={filteredData} />
        )}
        {keyValue === "3" && <Scheduled mailList={scheduledData} />}
        {keyValue === "4" && <History mailList={historyData} />}
      </div>
    </>
  );
};

export default Home;
