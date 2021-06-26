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
  const history = useHistory();
  const dispatch = useDispatch();
  const mailList = useSelector((state) => state.mails.mailList);
  const isLogged = localStorage.getItem("isLogged");
  console.log(mailList);

  useEffect(() => {
    dispatch(getMails());
    // dispatch({ type: "LOGIN", payload: true });
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
          <TableData category="All Mails" mailList={data} />
        )}
        {keyValue === "3" && <Scheduled mailList={data} />}
        {keyValue === "4" && <History mailList={data} />}
      </div>
    </>
  );
};

export default Home;
