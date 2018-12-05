/* @flow */
/*
The shuffledCharacters array below is the set of all [a-zA-Z0-9] characters
shuffled randomly
*/

export function encodeObjectId(numberSystemArray: $ReadOnlyArray<string>, value: number): string {
  const numberSystem = numberSystemArray.length;
  let encodedString = '';
  let remainder = null;
  let nextValue = value;
  while (nextValue != null) {
    const quotient = Math.floor(nextValue / numberSystem);
    remainder = nextValue % numberSystem;
    if (quotient > 0) {
      nextValue = quotient;
    } else {
      nextValue = null;
    }
    encodedString = `${numberSystemArray[remainder]}${encodedString}`;
  }

  return encodedString;
}

export function decodeObjectId(numberSystemArray: $ReadOnlyArray<string>, value: string): number {
  const numberSystem = numberSystemArray.length;
  let decodedValue = 0;
  value.split('').reverse().forEach((val, i) => {
    const idx = numberSystemArray.indexOf(val);
    if (i === 0) {
      decodedValue += idx;
    } else {
      decodedValue += (i * idx * numberSystem);
    }
  });

  return decodedValue;
}
