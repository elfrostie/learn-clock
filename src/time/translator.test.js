import translateTime from './translator.js';

it ('correctly handles whole hours', () => {
    expect(translateTime({ hours: 11, minutes: 0})).toBe("Elleve");
});

it ('corrently handles quarter past', () => {
    expect(translateTime({ hours: 8, minutes: 15 })).toBe('Kvart over otte');
});

it ('corrently handles half past', () => {
    expect(translateTime({ hours: 9, minutes: 30 })).toBe('Halv ti');
});

it ('correctly handles quarter to', () => {
    expect(translateTime({ hours: 12, minutes: 45 })).toBe('Kvart i et');
});

it ('corrently handles minutes up til 25', () => {
    expect(translateTime({ hours: 12, minutes: 23 })).toBe('Treogtyve minutter over tolv');
});

it ('correctly handles minutes between 25 and 30', () => {
    expect(translateTime({ hours: 12, minutes: 28 })).toBe('To minutter i halv et');
});

it ('correctly handles minutes between 30 and 35', () => {
    expect(translateTime({ hours: 1, minutes: 35 })).toBe('Fem minutter over halv to');
});

it ('corrently handles minutes between 35 and 60', () => {
    expect(translateTime({ hours: 4, minutes: 40 })).toBe('Tyve minutter i fem');
});

it ('corrently handles minutes between 35 and 60', () => {
    expect(translateTime({ hours: 4, minutes: 36 })).toBe('Fireogtyve minutter i fem');
});
