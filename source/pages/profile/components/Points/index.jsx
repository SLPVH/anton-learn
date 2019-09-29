import React from "react";
import Typography from "@material-ui/core/Typography";
import Title from "../Title";
import { connect } from "react-redux";
import SLPAddressInput from "../SLPAddressInput";

function Deposits(props) {
    return (
        <React.Fragment>
            <Title>Total points</Title>
            <Typography component="p" variant="h4">
                {props.points}
            </Typography>
            <div>
                <SLPAddressInput/>
            </div>
        </React.Fragment>
    );
}
const DepositsConnected = connect(state => ({
    points: state.user.total_points,
    totalQuestions: state.user.questions.length
}))(Deposits);

export default DepositsConnected;
