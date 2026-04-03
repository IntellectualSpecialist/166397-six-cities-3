const getRaitingPercentage = (raiting: number): string => `${Math.round(raiting) / 5 * 100}%`;

const capitalizeValue = (value: string): string => value[0].toUpperCase() + value.slice(1, value.length);

const isEscKey = (evt: KeyboardEvent) => evt.key === 'Escape' || evt.key === 'Esc';

export {getRaitingPercentage, capitalizeValue, isEscKey};
