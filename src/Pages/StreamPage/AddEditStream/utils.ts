import { FrequencyType } from "../../../utilities/interfaces";

export const yyyy_mm_dd_regex = /\d{4}-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[01])/;

export const isStringDayOfWeek = (val: string): boolean => {
  return Number(val) <= 7 && Number(val) >= 1 && !isNaN(Number(val));
};

export const isStringDayOfMonth = (val: string): boolean => {
  return Number(val) <= 31 && Number(val) >= 1 && !isNaN(Number(val));
};

export const frequenciesWithFullDate = [
  FrequencyType.anually,
  FrequencyType.onetime,
  FrequencyType.biweekly,
  FrequencyType.quarterly,
  FrequencyType.semiannually,
];
export const isCompleteDate = (val: string): boolean => {
  return yyyy_mm_dd_regex.test(val);
};

export const getInputLabelForFrequency = (frequency: FrequencyType): string => {
  switch (frequency) {
    case FrequencyType.biweekly:
    case FrequencyType.quarterly:
    case FrequencyType.anually:
    case FrequencyType.semiannually:
      return "Next occurence date";
    case FrequencyType.weekly:
      return "Day of week (1-7)";
    case FrequencyType.monthly:
      return "Day of month (1-31)";
    case FrequencyType.onetime:
      return "One time date";
    default:
      return "input";
  }
};

export const getTypeForFrequency = (frequency: FrequencyType): string => {
  switch (frequency) {
    case FrequencyType.biweekly:
    case FrequencyType.quarterly:
    case FrequencyType.anually:
    case FrequencyType.semiannually:
    case FrequencyType.onetime:
      return "string";
    case FrequencyType.weekly:
      return "number";
    case FrequencyType.monthly:
      return "number";
    default:
      return "string";
  }
};

export const getPlaceholderForFrequency = (frequency: FrequencyType): string => {
  switch (frequency) {
    case FrequencyType.biweekly:
    case FrequencyType.quarterly:
    case FrequencyType.anually:
    case FrequencyType.semiannually:
    case FrequencyType.onetime:
      return "yyyy-mm-dd";
    case FrequencyType.weekly:
      return "3";
    case FrequencyType.monthly:
      return "24";
    default:
      return "yyyy-mm-dd";
  }
};
export const FrequencyToLabel = (frequency: FrequencyType): string => {
  switch (frequency) {
    case FrequencyType.onetime:
      return "onetime";
    case FrequencyType.monthly:
      return "monthly";
    case FrequencyType.weekly:
      return "weekly";
    case FrequencyType.anually:
      return "annual";
    case FrequencyType.daily:
      return "daily";
    case FrequencyType.biweekly:
      return "2 weeks";
    case FrequencyType.quarterly:
      return "quarterly";
    case FrequencyType.semiannually:
      return "semi-anually";

    default:
      return "default";
  }
};
