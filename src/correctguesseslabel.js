/* @flow */
import React from 'react';
import { observer } from 'mobx-react';
import gamelogic from './gamelogic.js';

const GuessLabel = (props: { number: number }) => {
    if (props.number === 0) return <h3>Du har ikke svaret rigtigt endnu.</h3>;

    return props.number === 1
    ? <h3>Du har gættet rigtigt 1 gang!</h3>
    :  <h3>Du har gættet rigtigt {props.number} gange!</h3>
};

const WrongGuessLabel = (props : { number: number }) => {
    if (props.number === 0) return <h3>Du har ikke svaret forkert endnu.</h3>;

    return props.number === 1
    ? <h4>Du har gættet forkert 1 gang!</h4>
    : <h4>Du har gættet forkert {props.number} gange!</h4>
};

const NewGameLabel = () => (
    <h3>Du har lige startet et spil</h3>
);

const label = observer(() => {
    if (gamelogic.correctGuesses > 0 || gamelogic.wrongGuesses > 0) return (
        <div>
            <GuessLabel number={gamelogic.correctGuesses} />
            <WrongGuessLabel number={gamelogic.wrongGuesses} />
        </div>);

    return <NewGameLabel />;
});

export default label;
