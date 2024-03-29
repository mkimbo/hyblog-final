import React, { useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import SvgIcon from "@material-ui/core/SvgIcon";
import Typography from "@material-ui/core/Typography";
import { navigate } from "gatsby";
import { ModalContext } from "../context/modal/modal";
import { AuthContext } from "../context/auth/auth";
function LightBulbIcon(props) {
  return (
    <SvgIcon {...props}>
      <path d="M9 21c0 .55.45 1 1 1h4c.55 0 1-.45 1-1v-1H9v1zm3-19C8.14 2 5 5.14 5 9c0 2.38 1.19 4.47 3 5.74V17c0 .55.45 1 1 1h6c.55 0 1-.45 1-1v-2.26c1.81-1.27 3-3.36 3-5.74 0-3.86-3.14-7-7-7zm2.85 11.1l-.85.6V16h-4v-2.3l-.85-.6C7.8 12.16 7 10.63 7 9c0-2.76 2.24-5 5-5s5 2.24 5 5c0 1.63-.8 3.16-2.15 4.1z" />
    </SvgIcon>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    margin: theme.spacing(6, 0, 3),
  },
  lightBulb: {
    verticalAlign: "middle",
    marginRight: theme.spacing(1),
  },
}));

export default function ProTip() {
  const { state } = useContext(AuthContext);
  const { handleOpenLoginModal } = useContext(ModalContext);
  const classes = useStyles();
  const onLink = (link) => {
    if (state.isAuthenticated && !state.isLoading) {
      navigate(link);
    } else {
      handleOpenLoginModal();
    }
  };
  return (
    <Typography className={classes.root} color="textSecondary">
      <LightBulbIcon className={classes.lightBulb} />
      Pro tip: Get an after thought of this article and many others{" "}
      <span
        style={{ color: "#1489cc", cursor: "pointer" }}
        onClick={() =>
          onLink("/assets/BBI-Fact-Fiction-or-Falacy-chapter-1.docx")
        }
        onKeyDown={() =>
          onLink("/assets/BBI-Fact-Fiction-or-Falacy-chapter-1.docx")
        }
        role="button"
      >
        here
      </span>
    </Typography>
  );
}
