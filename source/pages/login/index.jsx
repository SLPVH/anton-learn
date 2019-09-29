import React from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Container from "@material-ui/core/Container";
import styles from "./styles";
import { withStyles } from "@material-ui/styles";
import { connect, Provider } from "react-redux";
import { configureStore } from "./state/store";
import { Box, Typography } from "@material-ui/core";
import {
    saveUserOperation,
    updateLoginOperation,
    updatePasswordOperation
} from "./state/ducks/user";


class Login extends React.Component {
    render() {
        return (
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box className={this.props.classes.paper}>
                    <Avatar src="/static/images/logo.svg" />
                    <form className={this.props.classes.form}>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required={true}
                            fullWidth={true}
                            label="Nickname"
                            autoFocus={true}
                            value={this.props.login}
                            onChange={e =>
                                this.props.updateLogin(e.target.value)
                            }
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required={true}
                            fullWidth={true}
                            label="Password"
                            type="password"
                            value={this.props.password}
                            onChange={e =>
                                this.props.updatePassword(e.target.value)
                            }
                        />
                        {this.props.error ? (
                            <Typography
                                variant="body2"
                                color="error"
                                align="center"
                            >
                                {this.props.error}
                            </Typography>
                        ) : null}
                        <Button
                            fullWidth={true}
                            variant="contained"
                            color="primary"
                            onClick={this.props.saveUser}
                            disabled={this.props.sending}
                            className={this.props.classes.submit}
                        >
                            {" "}
                            Get started
                        </Button>
                    </form>
                </Box>
            </Container>
        );
    }
}

const LoginConnected = connect(
    state => ({
        login: state.user.login,
        password: state.user.password,
        sending: state.ui.sending,
        error: state.ui.error
    }),
    {
        updateLogin: updateLoginOperation,
        updatePassword: updatePasswordOperation,
        saveUser: saveUserOperation
    }
)(withStyles(styles, { withTheme: true })(Login));

export default class LoginPage extends React.Component {
    render() {
        return (
            <Provider store={configureStore()}>
                <LoginConnected />
            </Provider>
        );
    }
}
