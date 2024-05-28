export const truncateString = (providedString : string) => {
  return providedString.length > 200
    ? providedString.substring(0, 200) + "..."
    : providedString;
};
