export function formatTime(time: number) {
  let hour, minutes;
  if (time > 100) {
    hour = Math.floor(time / 60);
    minutes = time % 60;
    return `${hour} giờ ${minutes} phút`;
  }
  hour = time;
  return `${hour} phút`;
}

export function formatDate(date: any) {
  let today = new Date(Date.now());
  const [dateValue, time] = date.split(" ");
  let [day, month, year] = dateValue.split("-");
  let [hours, minutes, seconds] = time.split(":");
  let date1 = new Date(year, month - 1, day, hours, minutes, seconds);
  if (
    today.getMonth() === date1.getMonth() &&
    today.getFullYear() === date1.getFullYear()
  ) {
    if (today.getDate() === date1.getDate()) {
      if (today.getHours() === date1.getHours()) {
        return `${today.getMinutes() - minutes} phút trước`;
      } else {
        return `${today.getHours() - hours} giờ trước`;
      }
    } else if (today.getDate() - 1 === date1.getDate()) {
      return `Hôm qua`;
    } else {
      return `${date1.getDate() + "/" + month + "/" + date1.getFullYear()}`;
    }
  } else if (today.getFullYear() === date1.getFullYear()) {
    return `${today.getMonth() - date1.getMonth()} tháng trước 1`;
  } else {
    return `${today.getFullYear() - date1.getFullYear()} năm trước`;
  }
}
