import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Alert from "@material-ui/lab/Alert";

const useStyles = makeStyles((theme) => ({
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const SubscriptionForm = () => {
  const classes = useStyles();
  const [status, setStatus] = useState(null);
  const [email, setEmail] = useState("");

  //FORM_URL should be the same as the form action url pointed out above
  const FORM_URL = `https://app.convertkit.com/forms/2173054/subscriptions`;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData(e.target);
    try {
      const response = await fetch(FORM_URL, {
        method: "post",
        body: data,
        headers: {
          accept: "application/json",
        },
      });
      setEmail("");
      const json = await response.json();
      if (json.status === "success") {
        setStatus("SUCCESS");
        return;
      }
    } catch (err) {
      setStatus("ERROR");
      console.log(err);
    }
  };

  const handleInputChange = (event) => {
    const { value } = event.target;
    setEmail(value);
  };

  return (
    <form
      className={classes.form}
      noValidate
      action={FORM_URL}
      method="post"
      onSubmit={handleSubmit}
    >
      <Grid container>
        <Grid item xs>
          <Typography variant="h5" gutterBottom id="emailSubscribe">
            Join Our Newsletter
          </Typography>
          <Typography variant="subtitle1">
            We will send you a curated list of your interests through a weekly
            email.
          </Typography>
        </Grid>
      </Grid>
      {status === "SUCCESS" && (
        <Alert severity="success">
          Email sent! — confirm the subscription in your inbox
        </Alert>
      )}
      {status === "ERROR" && (
        <Alert severity="error">
          Oops, Something went wrong! refresh the page and try again!
        </Alert>
      )}
      <TextField
        variant="outlined"
        margin="normal"
        onChange={handleInputChange}
        value={email}
        required
        fullWidth
        id="email"
        label="Email Address"
        name="email_address"
        autoComplete="email"
      />
      <Button
        type="submit"
        fullWidth
        variant="contained"
        color="primary"
        className={classes.submit}
      >
        Subscribe
      </Button>
      <Grid container>
        <Grid item xs align="center">
          <Typography variant="body2">
            We are Proffessionals. We wont spam you.
          </Typography>
        </Grid>
      </Grid>
    </form>
  );
};

export default SubscriptionForm;
