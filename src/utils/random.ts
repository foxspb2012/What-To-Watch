export const generateRandomValue = (min:number, max: number, numAfterDigit = 0) =>
  +((Math.random() * (max - min)) + min).toFixed(numAfterDigit);

export const getRandomItems = <T>(items: T[]):T[] => {
  const startPosition = generateRandomValue(0, items.length - 1);
  const endPosition = startPosition + generateRandomValue(startPosition, items.length);
  return items.slice(startPosition, endPosition);
};

export const getRandomItem = <T>(items: T[]):T =>
  items[generateRandomValue(0, items.length -1)];

export const getRandomAlphaNumeric = (len= 1 ) => {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let result = '';
  let ifFirst = 0;
  for(let i=0;i<len;i++){
    if (i===0) {ifFirst = 10;} else {ifFirst = 0;}
    result += characters[Math.round(Math.random()*(characters.length-ifFirst-1))];
  }
  return result;
};

