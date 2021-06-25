import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  appBar: {
    padding: "10px",
    marginTop: "10px",
    borderRadius: "50px 20px",
    background: "black",
    //boxShadow: "0 1px 10px #cc2b5e, 0 0 20px  #753a88"
    ["@media (max-width:1240px)"]: {
      padding: "8px",
    },
    ["@media (max-width:1130px)"]: {
      padding: "6px",
    },

    ["@media (max-width:1060px)"]: {
      padding: "4px",
    },
  },
  typoGraphy: {
    fontFamily: "'Ubuntu', sans-serif",
    color: "#FF6037",
    fontSize: "50px",
    "&:hover": {
      cursor: "pointer",
    },
    ["@media (max-width:890px)"]: {
      fontSize: "30px",
      marginLeft: "11%",
    },
    ["@media (max-width:611px)"]: {
      fontSize: "20px",
      marginLeft: "9%",
    },
  },
  avatar: {
    marginRight: "20px",
    height: "75px",
    width: "75px",
    ["@media (max-width:890px)"]: {
      height: "45px",
      width: "45px",
    },
    ["@media (max-width:611px)"]: {
      height: "30px",
      width: "30px",
    },
  },
}));

export default useStyles;
