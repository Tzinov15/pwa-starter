const nth = function (d: number) {
  if (d > 3 && d < 21) return "th";
  switch (d % 10) {
    case 1:
      return "st";
    case 2:
      return "nd";
    case 3:
      return "rd";
    default:
      return "th";
  }
};
export const formatDayOfMonth = (
  incomingValue: string,
  previousValue: string
) => {
  const noNumbersFound = !incomingValue.match(/\d/g);
  const newlyTypedCharacters = incomingValue.replace(previousValue, "");
  const noNewNumbersEntered = !newlyTypedCharacters.match(/\d/g);
  if (noNumbersFound) return "";
  const cleanPreviousValue = Number(previousValue.replace(/\D{2}/g, ""));
  const cleanIncomingValue = Number(
    incomingValue.replace(previousValue, "").replace(/\D/g, "")
  );

  if (noNewNumbersEntered) {
    if (String(cleanPreviousValue).length >= 1) {
      return previousValue;
    }
    return "";
  }
  // IF user enters something that is not a number, return to empty state
  if (Number.isNaN(cleanIncomingValue)) return "";

  // IF user backspaces (incoming is shorter than previous)
  // and they didn't have a double digit date, return to empty state
  if (
    incomingValue.length < previousValue.length &&
    String(cleanPreviousValue).length < 2
  ) {
    return "";
  }

  if (String(cleanPreviousValue).length === 2) {
    if (incomingValue.length > previousValue.length) {
      return previousValue;
    }
    const previousValueMinusLastCharacter = Number(
      String(cleanPreviousValue).slice(0, -1)
    );
    const formattedNewValue = `${previousValueMinusLastCharacter}${nth(
      previousValueMinusLastCharacter
    )}`;
    return formattedNewValue;
  }
  // IF user has 1, 2, or 3 entered
  if (cleanPreviousValue > 0 && cleanPreviousValue < 4) {
    let cleanNewValue = Number(
      String(cleanPreviousValue) + String(cleanIncomingValue)
    );
    if (cleanNewValue > 31) cleanNewValue = 31;
    const formattedNewValue = `${cleanNewValue}${nth(cleanNewValue)}`;
    return formattedNewValue;
  } else {
  }
  let newValue = incomingValue.replace(previousValue, "");
  newValue.replace(/\D/g, "");
  if (Number(newValue) > 31) return "31" + nth(31);
  if (Number(newValue) < 1) return "1st";
  if (newValue.length > 2) {
    newValue = newValue.slice(0, 2);
  }
  if (newValue === "") return "";

  return newValue + nth(Number(newValue));
};
