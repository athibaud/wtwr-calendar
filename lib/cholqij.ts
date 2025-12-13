import { differenceInDays } from 'date-fns';
import { TNahual, TNahualNameId, TNahualNumber } from '../types/index.js';

// Maximum values for Mayan calendar cycles
const MAX_NAHUAL_NUMBER = 13;  // Maximum value for the 13-day cycle (Tone)
const MAX_NAHUAL_NAME_ID = 20;  // Maximum value for the 20-day cycle (Nahual)

export const addDays = (nahual: TNahual, days: number): TNahual => {
  // Calculate new number (13-day cycle)
  const totalNumberDays = nahual.number + days;
  const newNumber = ((totalNumberDays - 1) % MAX_NAHUAL_NUMBER) + 1;
  
  // Calculate new name (20-day cycle)
  const totalNameDays = nahual.nameId + days;
  const newNameId = ((totalNameDays - 1) % MAX_NAHUAL_NAME_ID) + 1;
  
  return { number: newNumber as TNahualNumber, nameId: newNameId as TNahualNameId };
};

export const subtractDays = (nahual: TNahual, days: number): TNahual => {
  // Calculate new number (13-day cycle)
  const totalNumberDays = nahual.number - days;
  const newNumber = ((totalNumberDays - 1) % MAX_NAHUAL_NUMBER + MAX_NAHUAL_NUMBER) % MAX_NAHUAL_NUMBER + 1;
  
  // Calculate new name (20-day cycle)
  const totalNameDays = nahual.nameId - days;
  const newNameId = ((totalNameDays - 1) % MAX_NAHUAL_NAME_ID + MAX_NAHUAL_NAME_ID) % MAX_NAHUAL_NAME_ID + 1;
  
  return { number: newNumber as TNahualNumber, nameId: newNameId as TNahualNameId };
};

const REFERENCE_DATE: {
  Nahual: TNahual;
  Date: Date;
} = {
  Nahual: { number: 13, nameId: 5 },
  Date: new Date(1970, 0, 1), // January 1st, 1970
};

export const fromGregorianDate = (date: Date): TNahual => {
  const diffDays = differenceInDays(date, REFERENCE_DATE.Date);
  
  // If the date is before the reference date, use subtractDays
  if (diffDays < 0) {
    return subtractDays(REFERENCE_DATE.Nahual, Math.abs(diffDays));
  }
  
  // Otherwise, add days as before
  return addDays(REFERENCE_DATE.Nahual, diffDays);
};

