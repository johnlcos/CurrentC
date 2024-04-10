export const getTimeDifferenceInMinutes = (created_at: string): string => {
  const createdAtDate: any = new Date(created_at);
  const currentDate: any = new Date();
  const differenceInMilliseconds = currentDate - createdAtDate;
  const differenceInMinutes = Math.floor(
    differenceInMilliseconds / (1000 * 60)
  );
  if (differenceInMinutes > 1440) {
    const differenceInDays = Math.floor(differenceInMinutes / (60 * 24));
    return `${differenceInDays} days`;
  } else if (differenceInMinutes > 60) {
    const differenceInHours = Math.floor(differenceInMinutes / 60);
    return `${differenceInHours} hours`;
  } else {
    return `${differenceInMinutes} minutes`;
  }
};
