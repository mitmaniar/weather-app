export const getMeridiemTime = (hours: number) => {
  return `${hours % 12} ${(hours/12)<1 ? 'AM' : 'PM'}`
}

export const getDateISO = (dt: number) => {
  const dateTimeStamp = new Date(dt*1000);
  return new Date(
    dateTimeStamp.getFullYear(),
    dateTimeStamp.getMonth(),
    dateTimeStamp.getDate()
  ).toISOString()
}