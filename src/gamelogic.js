/* @flow */
import { extendObservable, action } from 'mobx';
import randomTime from './time/randomtime.js';
import type { TimeType } from './time/randomtime.js';

class Logic {
    resolution = 5;
    possibleAnswers: Array<TimeType> = [];
    correctAnswer: number;
    newGame() : void {};
    correctGuesses: number;
    wrongGuesses: number;
    guess(index: number) : bool { return true; };

    constructor() {
        extendObservable(this, {
            possibleAnswers: [],
            correctAnswer: 0,
            correctGuesses: 0,
            wrongGuesses: 0,
            newGame: action(() => {
                this.possibleAnswers = [];
                for (let i = 0; i < 4; i++) {
                    this.possibleAnswers.push(randomTime(this.resolution));
                    this.correctAnswer = Math.floor(Math.random() * 4);
                }
            }),
            guess: action(index => {
                if (index === this.correctAnswer) {
                    this.correctGuesses++;
                    return true;
                } else {
                    this.wrongGuesses++;
                    return false;
                }
            }),
        });
    }
}

const logic = new Logic();

export default logic;
