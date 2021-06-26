import React from "react";
import TableData from "../Table/TableData";

const Scheduled = ({ mailList }) => {
  return <TableData category="Scheduled" mailList={mailList} />;
};

export default Scheduled;
