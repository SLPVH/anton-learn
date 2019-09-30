import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import FormControl from "@material-ui/core/FormControl";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelActions from "@material-ui/core/ExpansionPanelActions";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Button from "@material-ui/core/Button";
import Divider from "@material-ui/core/Divider";
import { FormControlLabel, Radio, RadioGroup } from "@material-ui/core";
import { connect } from "react-redux";
import {
    makeAnswerOperation,
} from "../../state/ducks/user";

const useStyles = makeStyles(theme => ({
    root: {
        width: "100%",
        margin: theme.spacing(1)
    },
    heading: {
        fontSize: theme.typography.pxToRem(15)
    },
    secondaryHeading: {
        fontSize: theme.typography.pxToRem(15),
        color: theme.palette.text.secondary
    },
    icon: {
        verticalAlign: "bottom",
        height: 20,
        width: 20
    },
    details: {
        alignItems: "center"
    },
    columnBig: {
        flexBasis: "66.66%"
    },
    column: {
        flexBasis: "33.33%"
    },
    helper: {
        borderLeft: `2px solid ${theme.palette.divider}`,
        padding: theme.spacing(1, 2)
    },
    link: {
        color: theme.palette.primary.main,
        textDecoration: "none",
        "&:hover": {
            textDecoration: "underline"
        }
    }
}));

function Question(props) {
    const classes = useStyles();
    const [value, setValue] = React.useState();

    const handleChange = event => {
        setValue(event.target.value);
    };

    const answers = props.answers.map(answer => (
        <FormControlLabel
            value={`${answer.id}`}
            control={<Radio color="primary" />}
            label={answer.text}
            labelPlacement="end"
            key={answer.id}
        />
    ));
    return (
        <div className={classes.root}>
            <ExpansionPanel
                defaultExpanded={false}
                disabled={props.questionStatus !== 0}
            >
                <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                    <div className={classes.column}>
                        <Typography className={classes.heading}>
                            Question {props.questionId}
                        </Typography>
                    </div>
                    <div className={classes.column}>
                        <Typography className={classes.secondaryHeading}>
                            {props.questionTitle}
                        </Typography>
                    </div>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails className={classes.details}>
                    <Typography className={classes.secondaryHeading}>
                        {props.questionContent}
                    </Typography>
                </ExpansionPanelDetails>
                <Divider />
                <ExpansionPanelActions>
                    <FormControl component="fieldset">
                        <RadioGroup
                            name={`answers-for-question-${props.questionId}`}
                            value={value}
                            onChange={handleChange}
                            row
                        >
                            {answers}
                        </RadioGroup>
                    </FormControl>
                </ExpansionPanelActions>
                <Divider />
                {value ? (
                    <ExpansionPanelActions>
                        <Button
                            size="small"
                            color="primary"
                            onClick={() =>
                                props.sendAnswer(props.questionId, parseInt(value,10))
                            }
                        >
                            Submit
                        </Button>
                    </ExpansionPanelActions>
                ) : null}
            </ExpansionPanel>
        </div>
    );
}

function Questions(props) {
    const questions = props.questions.map(question => (
        <Question
            questionId={question.id}
            questionStatus={question.status}
            questionTitle={question.title}
            questionContent={question.content}
            answers={question.answers}
            sendAnswer={props.sendAnswer}
            key={question.id}
        />
    ));
    return <>{questions}</>;
}

const QuestionsConnected = connect(
    state => ({
        questions: state.user.questions
    }),
    {
        sendAnswer: makeAnswerOperation
    }
)(Questions);

export default QuestionsConnected;
