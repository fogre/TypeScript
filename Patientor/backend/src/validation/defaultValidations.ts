export const isString = (text: unknown): text is string => {
  return typeof text === 'string' || text instanceof String;
};

export const parseString = (key: unknown, value: unknown): string => {
  if (!key || !isString(key)) {
    throw new Error (`Incorrect key given to function: ${key}`);
  }
  if (!value || !isString(value)) {
    throw new Error (`Incorrect or missing ${key}`);
  }
  return value;
};