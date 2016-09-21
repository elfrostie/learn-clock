import React, { Component } from 'react';
import { observer } from 'mobx-react';
import gamelogic from './gamelogic.js';
import translator from './time/translator.js';
import { Button, Col } from 'react-bootstrap';

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

class _AnswerButton extends Component<void, AnswerButtonProps, void> {

    onClick = () => {
        gamelogic.guess(this.props.index);
    }

    renderDefault = () => {
        return <Button className="animated bounce" style={buttonStyle} onClick={this.onClick}>{this.props.children}</Button>;
    }

    render() {
        return this.renderDefault();
    }
};

const AnswerButton : Class<_AnswerButton> = observer(_AnswerButton);
export default answers;

