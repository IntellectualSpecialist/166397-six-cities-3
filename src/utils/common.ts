const getRaitingPercentage = (raiting: number): string => `${Math.round(raiting) / 5 * 100}%`;

const capitalizeValue = (value: string): string => value[0].toUpperCase() + value.slice(1, value.length);

export {getRaitingPercentage, capitalizeValue};
