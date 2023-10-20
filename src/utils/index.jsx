import axios from "axios";

const prodURL = "https://strapi-store-server.onrender.com/api";

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
