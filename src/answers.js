/* @flow */
import React, { Component } from 'react';
import { observer } from 'mobx-react';
import gamelogic from './gamelogic.js';
import translator from './time/translator.js';
import { Button } from 'react-bootstrap';

const buttonStyle = {
    marginRight: "30px",
    marginBottom: "15px",
    width: "40%",
};

const headlineStyle = {
    marginTop: 0,
};

const answers = observer(() => {
    return (
        <div>
        <h1 style={headlineStyle}>Hvad er klokken?</h1>
        {gamelogic.possibleAnswers.map((answer, index) => <AnswerButton index={index} key={index}>{translator(answer)}</AnswerButton>)}</div>
    );
});

type AnswerButtonProps = {
    index: number,
    children?: React.Element<*>,
};

class _AnswerButton extends Component {
    props: AnswerButtonProps;
    state: { correct: "default" | "correct" | "wrong" }

    constructor(props) {
        super(props);
        this.state = { correct: "default" };
    }

    onClick = () => {
        const correct = gamelogic.guess(this.props.index);
        this.setState({
            correct: correct ? "correct" : "wrong",
        });
        if (correct) {
            window.setTimeout(() => {
                this.setState({ correct: 'default' });
                gamelogic.newGame();
            }, 2000);
        } else {
            window.setTimeout(() => {
                this.setState({ correct: 'default' });
            }, 2000);
        }
    }

    render() {
        let className : string;
        let style : string;
        if (this.state.correct === "correct") {
            className = "animated pulse";
            style = "success";
        }

        if (this.state.correct === "wrong") {
            className = "animated bounce";
            style = "danger";
        }

        return <Button className={className} bsStyle={style} style={buttonStyle} onClick={this.onClick}>{this.props.children}</Button>;
    }
};

const AnswerButton : Class<_AnswerButton> = observer(_AnswerButton);
export default answers;

