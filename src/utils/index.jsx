import axios from "axios";
import dayjs from "dayjs";
import "dayjs/locale/id";
dayjs.locale("id");

const prodURL = "http://localhost:8080/api/v1";

export const customFetch = axios.create({
  baseURL: prodURL,
});

export function calculateNumber(page, count) {
  let number = count; // Nilai awal number

  if (page > 1) {
    // Jika halaman lebih dari 1, tambahkan (page - 1) * 10 ke number
    number += (page - 1) * 10;
  }

  return number;
}

export function getFormatDateDayAMonth(date) {
  return dayjs(date).format("dddd");
}
export function getFormatDateWithoutDay(date) {
  return dayjs(date).format("D MMMM YYYY");
}
export function getFormatDate(date) {
  return dayjs(date).format("dddd, D MMMM YYYY");
}

export function getTimeWITA(time) {
  const zonaWaktu = "WITA";

  return `${time} ${zonaWaktu}`;
}
