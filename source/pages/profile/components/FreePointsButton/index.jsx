import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Fab from "@material-ui/core/Fab";
import { BubbleChart } from "@material-ui/icons";
import { connect } from "react-redux";
import {
    addFreePointsOperation,
} from "../../state/ducks/user";

const useStyles = makeStyles(theme => ({
    fab: {
        position: 'absolute',
        bottom: theme.spacing(2),
        right: theme.spacing(2),
    },
    extendedIcon: {
        marginRight: theme.spacing(1)
    }
}));

function FreePointsButton(props) {
    const classes = useStyles();

    return (
        <Fab
            variant="extended"
            className={classes.fab}
            disabled={!props.isFreePointsAvailable}
            onClick={props.addFreePoints}
        >
            <BubbleChart className={classes.extendedIcon} />
            Add free points
        </Fab>
    );
}

const FreePointsButtonConnected = connect(
    state => ({
        isFreePointsAvailable: state.user.is_free_points_available
    }),
    {
        addFreePoints: addFreePointsOperation
    }
)(FreePointsButton);

export default FreePointsButtonConnected;
