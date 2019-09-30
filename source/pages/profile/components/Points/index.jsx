import React from "react";
import Typography from "@material-ui/core/Typography";
import Title from "../Title";
import { connect } from "react-redux";
import SLPAddressInput from "../SLPAddressInput";
import { loadAllUserInfoOperation } from "../../state/ducks/user";

class Deposits extends React.Component {
    componentDidMount() {
        this.props.loadAll();
    }

    render() {
        return (
            <React.Fragment>
                <Title>Total points</Title>
                <Typography component="p" variant="h4">
                    {this.props.points}
                </Typography>
                <div>
                    <SLPAddressInput />
                </div>
            </React.Fragment>
        );
    }
}
const DepositsConnected = connect(
    state => ({
        points: state.user.total_points
    }),
    {
        loadAll: loadAllUserInfoOperation
    }
)(Deposits);

export default DepositsConnected;
