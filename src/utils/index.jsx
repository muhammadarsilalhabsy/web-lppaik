import axios from "axios";

const prodURL = "http://localhost:8080/api/v1";

export const customFetch = axios.create({
  baseURL: prodURL,
});

export const formatPriceUSD = (price) => {
  const dollar = Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format((price / 100).toFixed(2));
  return dollar;
};

export const generateAmountOptions = (number) => {
  return Array.from({ length: number }, (_, index) => {
    const amount = index + 1;
    return (
      <option key={amount} value={amount}>
        {amount}
      </option>
    );
  });
};

export function calculateNumber(page, count) {
  let number = count; // Nilai awal number

  if (page > 1) {
    // Jika halaman lebih dari 1, tambahkan (page - 1) * 10 ke number
    number += (page - 1) * 10;
  }

  return number;
}
