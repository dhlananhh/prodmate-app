// Utility functions for handling date and time in the system.


// Format a date object into an ISO (UTC) string.
export const formatToISO = (date: Date): string => {
  return date.toISOString();
}

// Format a Date object to the string YYYY-MM-DD.
export const formatToDateString = (date: Date): string => {
  return date.toISOString().split("T")[ 0 ];
}

// Get the current date as a string YYYY-MM-DD.
export const getTodayString = (): string => {
  return formatToDateString(new Date());
}

// Format a Date object to a DD-MM-YYYY string.
export const formatToDDMMYYYY = (date: Date): string => {
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();

  return `${day}-${month}-${year}`;
}

// Get the current date as a DD-MM-YYYY string.
export const getTodayDDMMYYYY = (): string => {
  return formatToDDMMYYYY(new Date());
}

// Flexible formatting function: 
// allows passing in patterns such as "DD/MM/YYYY" or "YYYY-MM-DD".
export const formatDate = (
  date: Date,
  pattern: string
): string => {
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = String(date.getFullYear());

  const separators = [ "-", "/", "." ];
  const separator = separators.find((sep) => pattern.includes(sep));
  if (!separator) {
    throw new Error("Unsupported date separator in pattern");
  }

  const patternParts = pattern.split(separator);

  const formattedParts = patternParts.map((token) => {
    if (token === "DD") return day;
    if (token === "MM") return month;
    if (token === "YYYY") return year;
    return token;
  });

  return formattedParts.join(separator);
}

// Parse the string "DD/MM/YYYY" into a Date object.
// Supported patterns: "DD/MM/YYYY", "YYYY-MM-DD", "MM-DD-YYYY", "DD-MM-YYYY", "YYYY/MM/DD"
export const parseDate = (
  dateString: string,
  pattern: string
): Date => {
  const separators = [ "-", "/", "." ];
  const separator = separators.find((sep) => pattern.includes(sep));
  if (!separator) {
    throw new Error("Unsupported date separator in pattern");
  }

  const parts = dateString.split(separator);
  const patternParts = pattern.split(separator);

  let day = 1, month = 1, year = 1970;

  patternParts.forEach((token, index) => {
    const value = Number(parts[ index ]);
    if (token === "DD") day = value;
    if (token === "MM") month = value;
    if (token === "YYYY") year = value;
  });

  return new Date(year, month - 1, day);
};

// Add the number of days to a Date.
export const addDays = (date: Date, days: number): Date => {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}

// Check if a date is in the past.
export const isPastDate = (date: Date): boolean => {
  return date.getDate() < new Date().getTime();
}

// Check if a date is in the future.
export const isFutureDate = (date: Date): boolean => {
  return date.getDate() > new Date().getTime();
}
