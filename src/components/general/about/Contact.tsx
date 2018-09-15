import {
  Button,
  createStyles,
  Paper,
  TextField,
  Theme,
  Typography,
  withStyles,
  WithStyles,
} from '@material-ui/core';
import Color from 'color';
import l_ from 'lodash';
import React from 'react';

import { colors } from '../../../common/theme';

interface ResponseError {
  message: string;
  path: string;
}

const styles = (theme: Theme) =>
  createStyles({
    container: {
      backgroundColor: Color(colors.secondary1[0])
        .lighten(3.25)
        .rgb()
        .string(),
      padding: 20,
      paddingRight: 40,
    },
    form: {
      display: 'flex',
      flexDirection: 'column',
    },
    singlelineText: {
      maxWidth: 500,
    },
    submitButton: {
      marginTop: theme.spacing.unit * 2,
      alignSelf: 'flex-start',
    },
    message: {},
    success: {
      marginTop: theme.spacing.unit * 2,
    },
    error: {
      marginTop: theme.spacing.unit * 2,
      border: '1px solid red',
    },
    resetButton: {
      marginTop: theme.spacing.unit,
    },
  });

interface Form {
  name: string;
  replyTo: string;
  message: string;
  theBomb: string;
}

type ContactProps = WithStyles<typeof styles>;

enum Status {
  Input = 0,
  Waiting,
  Succeeded,
}

interface ContactState {
  form: Form;
  errorMessage: string[] | undefined;
  status: Status;
}

function makeErrorMessage(error: ResponseError) {
  if (error.path === '') {
    return error.message[0].toUpperCase() + error.message.slice(1);
  } else {
    let path = error.path.replace(/^\//, '');
    path = path.replace(/^replyTo/, 'email');
    return (
      path[0].toUpperCase() + path.slice(1) + ' ' + error.message
    );
  }
}

class Contact extends React.Component<ContactProps, ContactState> {
  static getBlankState(): ContactState {
    return {
      form: {
        name: '',
        replyTo: '',
        message: '',
        theBomb: '',
      },
      errorMessage: undefined,
      status: Status.Input,
    };
  }

  constructor(props: ContactProps) {
    super(props);

    this.state = Contact.getBlankState();
  }

  handleChange: (
    name: keyof Form,
  ) => React.ChangeEventHandler<HTMLInputElement> = name => event => {
    const value = event.target.value;
    this.setState(prevState =>
      l_.merge({}, prevState, {
        form: {
          [name]: value,
        },
      }),
    );
  };

  handleSubmit: React.FormEventHandler = async event => {
    event.preventDefault();

    this.setState({
      status: Status.Waiting,
    });

    const response = await fetch(
      'https://hgqwnmfws8.execute-api.us-east-1.amazonaws.com/production/contact',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
        },
        body: JSON.stringify(this.state.form),
      },
    );

    if (!response.ok) {
      try {
        const parsed: ResponseError[] = await response.json();
        this.setState({
          status: Status.Input,
          errorMessage: parsed.map(makeErrorMessage),
        });
      } catch (e) {
        // tslint:disable-next-line:no-console
        console.error(`Malformed AWS response: ${response.body}`);
        this.setState({
          status: Status.Input,
          errorMessage: ['Bad server response'],
        });
      }
      return;
    }

    this.setState({
      status: Status.Succeeded,
    });
  };

  render() {
    const { classes } = this.props;
    const { status } = this.state;

    const wrapContent = (children: React.ReactNode) => (
      <Paper className={classes.container}>
        <Typography variant="display1">Contact me</Typography>
        {children}
      </Paper>
    );

    if (status === Status.Succeeded) {
      return wrapContent(
        <div className={classes.success}>
          <Typography variant="title" gutterBottom>
            Message sent successfully!
          </Typography>
          <Button
            color="primary"
            variant="outlined"
            size="large"
            onClick={() => this.setState(Contact.getBlankState())}
            className={classes.resetButton}
          >
            Send another message
          </Button>
        </div>,
      );
    }

    const disabled = status === Status.Waiting;

    return wrapContent(
      <>
        {this.state.errorMessage && (
          <div className={classes.error}>
            {this.state.errorMessage.map((msg, idx) => (
              <Typography key={idx}>{msg}</Typography>
            ))}
          </div>
        )}
        <form className={classes.form}>
          <TextField
            id="name"
            label="Name"
            margin="normal"
            className={classes.singlelineText}
            value={this.state.form.name}
            onChange={this.handleChange('name')}
            required
            disabled={disabled}
          />
          <TextField
            id="replyTo"
            label="Email"
            margin="normal"
            className={classes.singlelineText}
            value={this.state.form.replyTo}
            onChange={this.handleChange('replyTo')}
            required
            disabled={disabled}
          />
          <TextField
            id="theBomb"
            label="TheBomb"
            margin="normal"
            className={classes.singlelineText}
            inputProps={{ tabIndex: -1, autoComplete: 'off' }}
            value={this.state.form.theBomb}
            onChange={this.handleChange('theBomb')}
            style={{ display: 'none' }}
            disabled={disabled}
          />
          <TextField
            id="message"
            label="Message"
            margin="normal"
            className={classes.message}
            value={this.state.form.message}
            onChange={this.handleChange('message')}
            multiline
            fullWidth
            required
            disabled={disabled}
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            onClick={this.handleSubmit}
            className={classes.submitButton}
            disabled={disabled}
          >
            Submit
          </Button>
        </form>
      </>,
    );
  }
}

export default withStyles(styles)(Contact);
