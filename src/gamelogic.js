/* @flow */
import { extendObservable, action } from 'mobx';
import randomTime from './time/randomtime.js';
import type { TimeType } from './time/randomtime.js';

class Logic {
    resolution = 5;
    possibleAnswers: Array<TimeType> = [];
    correctAnswer: number;
    guessWrong: bool;
    guessRight: bool;
    newGame() : void {};
    guess(index: number) : void {};

    constructor() {
        extendObservable(this, {
            possibleAnswers: [],
            correctAnswer: 0,
            guessRight: false,
            guessWrong: false,
            correctGuesses: 0,
            newGame: action(() => {
                this.possibleAnswers = [];
                for (let i = 0; i < 4; i++) {
                    this.possibleAnswers.push(randomTime(this.resolution));
                    this.correctAnswer = Math.floor(Math.random() * 4);
                }
            }),
            guess: action(index => {
                if (index === this.correctAnswer) {
                    this.guessRight = true;
                    this.correctGuesses++;
                } else {
                    this.guessWrong = true;
                }
            }),
            reset: action(() => {
                this.guessWrong = false;
                this.guessRight = false;
            }),

        });
    }
}

const logic = new Logic();

export default logic;
