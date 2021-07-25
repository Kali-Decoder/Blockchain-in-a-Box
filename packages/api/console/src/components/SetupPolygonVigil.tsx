import React, { useReducer } from "react";
import {
  Button,
  Grid,
  makeStyles,
  TextField,
  Typography,
} from "@material-ui/core";
import { ActionResult } from "../models/Action";
import { IBasePayload, IStringPayload } from "../models/IPayloads";
import { useHistory } from "react-router-dom";
import Routes from "../constants/Routes";
import "../App.css";

const useStyles = makeStyles((theme) => ({
  parentBox: {
    marginTop: "10vh",
    marginBottom: theme.spacing(5),
    display: "flex",
    flexDirection: "column",
    alignItems: "stretch",
    width: 500,
  },
  heading: {
    textAlign: "center",
  },
  subHeading: {
    marginTop: theme.spacing(3),
  },
  button: {
    width: "100%",
  },
  textbox: {
    marginTop: theme.spacing(2),
  },
  marginTop2: {
    marginTop: theme.spacing(2),
  },
  marginTop4: {
    marginTop: theme.spacing(4),
  },
}));

// Local state
interface ILocalState {
  apiKey: string;
  isLoading: boolean;
  error: string;
}

// Local default state
const DefaultLocalState: ILocalState = {
  apiKey: "",
  isLoading: false,
  error: "",
};

// Local actions
const LocalAction = {
  ToggleLoading: "ToggleLoading",
  SetAPIKey: "SetAPIKey",
  SetError: "SetError",
};

// Local reducer
const LocalReducer = (
  state: ILocalState,
  action: ActionResult<IBasePayload>
): ILocalState => {
  switch (action.type) {
    case LocalAction.ToggleLoading: {
      return {
        ...state,
        isLoading: !state.isLoading,
      };
    }
    case LocalAction.SetAPIKey: {
      return {
        ...state,
        apiKey: (action.payload as IStringPayload).string,
      };
    }
    case LocalAction.SetError: {
      return {
        ...state,
        isLoading: false,
        error: (action.payload as IStringPayload).string,
      };
    }
    default: {
      return state;
    }
  }
};

const SetupPolygonVigil: React.FunctionComponent = () => {
  const classes = useStyles();
  const history = useHistory();
  const [{ apiKey, isLoading, error }, dispatch] = useReducer(
    LocalReducer,
    DefaultLocalState
  );

  return (
    <Grid container justifyContent="center">
      <Grid className={classes.parentBox} item>
        <Typography className={classes.heading} variant="h4">
          Polygon Vigil Setup
        </Typography>

        <Typography className={classes.subHeading}>
          The REST API interacts with Polygon via MaticVigil. You will need an
          API key from https://rpc.maticvigil.com/
        </Typography>

        <Typography className={classes.marginTop2}>
          MaticVigil is free to use, but you may with to upgrade if you intend
          on handling a lot of mainnet transactions.
        </Typography>

        <TextField
          className={`${classes.textbox} ${classes.marginTop4}`}
          variant="outlined"
          label="API Key"
          placeholder="Enter API key"
          value={apiKey}
          onChange={(event) =>
            dispatch({
              type: LocalAction.SetAPIKey,
              payload: { string: event.target.value },
            })
          }
        />

        {error && (
          <Typography variant="body2" color="error">
            {error}
          </Typography>
        )}

        <Grid className={classes.marginTop4} spacing={4} container>
          <Grid container item xs={6}>
            <Button
              className={classes.button}
              variant="contained"
              color="secondary"
              size="large"
              onClick={() => {
                history.push(Routes.SETUP_PINATA);
              }}
            >
              Skip
            </Button>
          </Grid>
          <Grid container item xs={6}>
            <Button
              className={classes.button}
              variant="contained"
              color="primary"
              size="large"
              onClick={() => {
                history.push(Routes.SETUP_PINATA);
              }}
            >
              Continue
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default SetupPolygonVigil;
