export const useFormatDate = (dateString: string) => {
  const months = [
    "января",
    "февраля",
    "марта",
    "апреля",
    "мая",
    "июня",
    "июля",
    "августа",
    "сентября",
    "октября",
    "ноября",
    "декабря",
  ];

  const date = new Date(dateString);
  const day = date.getDate();
  const month = months[date.getMonth()];
  const hours = date.getHours();
  const minutes = date.getMinutes();

  return `${day} ${month} ${hours}:${minutes}`;
};
