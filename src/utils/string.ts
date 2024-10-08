export const kebabCaseToFancyCase = (text: string) => {
    const replaced = text.replace('-', ' ');
    return replaced.charAt(0).toUpperCase() + replaced.slice(1);
};