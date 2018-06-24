
export const getOffsetMillis = () => {
    return new Date().getTimezoneOffset() * -1 * 60 * 1000;
}