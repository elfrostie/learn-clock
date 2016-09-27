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
                this.possibleAnswers.clear();
                while (this.possibleAnswers.length < 4) {
                    const candidate = randomTime(this.resolution);
                    if (!this.possibleAnswers.find(item => item.hours === candidate.hours && item.minutes === candidate.minutes)) {
                        this.possibleAnswers.push(candidate);
                    }
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
