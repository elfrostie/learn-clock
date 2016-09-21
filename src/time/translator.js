/* @flow */
import upperCaseFirst from 'upper-case-first';
import type { TimeType } from './randomtime.js';

function translateNumberBelow20(number) {
    switch (number) {
        case 1:
            return 'et';
        case 2:
            return 'to';
        case 3:
            return 'tre';
        case 4:
            return 'fire';
        case 5:
            return 'fem';
        case 6:
            return 'seks';
        case 7:
            return 'syv';
        case 8:
            return 'otte';
        case 9:
            return 'ni';
        case 10:
            return 'ti';
        case 11:
            return 'elleve';
        case 12:
            return 'tolv';
        case 13:
            return 'tretten';
        case 14:
            return 'fjorten';
        case 15:
            return 'femten';
        case 16:
            return 'seksten';
        case 17:
            return 'sytten';
        case 18:
            return 'atten';
        case 19:
            return 'nitten';
        case 20:
            return 'tyve';
        default:
            throw new Error("Cannot handle numbers > 20");
    }
}

function translateNumber(number) {
    if (number <= 20) return translateNumberBelow20(number);

    const tiere = Math.floor(number / 10);
    let tieretekst;
    switch (tiere) {
        case 2:
            tieretekst = 'tyve';
            break;
        case 3:
            tieretekst = 'tredive';
            break;
        case 4:
            tieretekst = 'fyrre';
            break;
        case 5:
            tieretekst = 'halvtreds';
            break;
        default:
            throw new Error("Invalid hour");
    }

    const enere = number % 10;
    const eneretekst = translateNumberBelow20(enere);

    return `${eneretekst}og${tieretekst}`;
}

export default function translate(time : TimeType) {
    if (time.minutes === 0) {
        return upperCaseFirst(handleHours(time.hours));
    }

    if (time.minutes % 15 === 0) {
        return handleQuarters(time);
    }

    if (time.minutes < 25) {
        return upperCaseFirst(`${translateNumber(time.minutes)} minutter over ${translateNumber(time.hours)}`);
    }

    if (time.minutes >= 25 && time.minutes < 30) {
        const remaining = 30 - time.minutes;
        return upperCaseFirst(`${translateNumber(remaining)} minutter i halv ${handleHours(time.hours + 1)}`);
    }

    if (time.minutes > 30 && time.minutes <= 35) {
        const past = time.minutes - 30;
        return upperCaseFirst(`${translateNumber(past)} minutter over halv ${handleHours(time.hours + 1)}`);
    }

    if (time.minutes >= 36) {
        const remaining = 60 - time.minutes;
        return upperCaseFirst(`${translateNumber(remaining)} minutter i ${handleHours(time.hours + 1)}`);
    }
}

function handleQuarters(time) {
    if (time.minutes === 15) {
        return `Kvart over ${handleHours(time.hours)}`;
    }

    if (time.minutes === 30) {
        return `Halv ${handleHours(time.hours + 1)}`;
    }

    if (time.minutes === 45) {
        return `Kvart i ${handleHours(time.hours + 1)}`;
    }

}


function handleHours(hours) {
    if (hours > 12) hours -= 12;
    return translateNumber(hours);
}
