import randomtime, { randomtimeworker } from './randomtime.js';

it('creates random times with five minues resolution', () => {
    const time = randomtime(5);
    expect(time.minutes % 5).toBe(0);
});

it ('has hours between 1 and 12', () => {
    const time = randomtime(5);
    expect(time.hours).toBeGreaterThanOrEqual(1);
    expect(time.hours).toBeLessThanOrEqual(12);
});

it ('rounds 59 minutes to 0', () => {
    const time = randomtimeworker(0, 59, 5);
    expect(time.minutes).toBe(0);
});

if ('rounds 7 minutes to 0', () => {
    const time = randomtimeworker(0, 7, 15);
    expect(time.minutes).toBe(0);
});
