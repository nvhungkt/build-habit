// const host = 'https://stormy-earth.herokuapp.com';
const host = 'http://192.168.137.1:8080';
// const host = 'http://10.82.137.250:8080';

export const login = `${host}/login`;
export const getByDate = `${host}/habit/by-time`;
export const getByDateOffset = `${host}/habit/by-time-offset`;
export const getDetail = `${host}/habit/get-logs`;
export const getHabitTemplates = `${host}/suggestions`;
export const checkDoneHabit = `${host}/habit/check`;
export const unCheckDoneHabit = `${host}/habit/un-check`;
export const addHabit = `${host}/habit/add`;
export const updateHabit = `${host}/habit/update`;
