import React from 'react';
import { observer } from 'mobx-react';
import gamelogic from './gamelogic.js';

const GuessLabel = (props) => (
    <h3>Du har gættet rigtigt {props.number} gange!</h3>
);

const NewGameLabel = () => (
    <h3>Du har lige startet et spil</h3>
);

const label = observer(() => {
    if (gamelogic.correctGuesses > 0) return <GuessLabel number={gamelogic.correctGuesses} />;
    return <NewGameLabel />;
});

export default label;
