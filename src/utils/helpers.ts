export const upperFirst = (str: string): string => str.charAt(0).toUpperCase() + str.slice(1) ?? '';

export const removeSpaces = (str: string): string => str.replace(/\s/g, '') ?? '';
