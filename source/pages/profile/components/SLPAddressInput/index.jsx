import { makeStyles, Paper, Divider } from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import AccountBalanceWalletIcon from "@material-ui/icons/AccountBalanceWallet";
import Send from "@material-ui/icons/Send";
import InputBase from "@material-ui/core/InputBase";
import React from "react";
import { connect } from "react-redux";
import {
    slpAddressUpdateOperation,
    withdrawOperation
} from "../../state/ducks/user";

const useStyles = makeStyles(theme => ({
    root: {
        marginTop: "15px",
        padding: "2px 4px",
        display: "flex",
        alignItems: "center"
    },
    input: {
        marginLeft: theme.spacing(1),
        flex: 1
    },
    iconButton: {
        padding: 10
    },
    divider: {
        height: 28,
        margin: 4
    }
}));

function SLPAddressInput(props) {
    const classes = useStyles();

    return (
        <Paper className={classes.root}>
            <IconButton className={classes.iconButton} aria-label="menu">
                <AccountBalanceWalletIcon />
            </IconButton>
            <InputBase
                className={classes.input}
                placeholder="SLP Address"
                value={props.slpAddress}
                onChange={e => props.updateSlpAddress(e.target.value) }
            />
            <Divider className={classes.divider} orientation="vertical" />
            <IconButton
                color="primary"
                className={classes.iconButton}
                aria-label="directions"
                onClick={props.withdraw}
                disabled={!props.isWithdrawAvailable}
            >
                <Send />
            </IconButton>
        </Paper>
    );
}

const SLPAddressInputConnected = connect(
    state => ({
        slpAddress: state.user.slp_address,
        isWithdrawAvailable: state.user.is_withdraw_available
    }),
    {
        updateSlpAddress: slpAddressUpdateOperation,
        withdraw: withdrawOperation
    }
)(SLPAddressInput);

export default SLPAddressInputConnected;
