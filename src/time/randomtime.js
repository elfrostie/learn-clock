export default function randomtime(resolution) {
    const hours = Math.floor(Math.random() * 12 + 1);
    const minutes = Math.floor(Math.random() * 60);
    return randomtimeworker(hours, minutes, resolution);
}

export function randomtimeworker(hours, minutes, resolution) {
    let min = Math.round(minutes / resolution) * resolution;
    if (min >= 60) min -= 60;

    return {
        hours,
        minutes: min,
    }
}
