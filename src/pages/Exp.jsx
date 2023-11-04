import axios from "axios";
import React from "react";

export const loader = async () => {
  const api1 = async () => {
    try {
      const response = await axios(
        "https://6351779adfe45bbd55c0ffd1.mockapi.io/activitsy"
      );
      console.log(response);
      return response;
    } catch (error) {
      console.log(error, "ERROR 2 bro");
    }
  };
  const api2 = async () => {
    try {
      const response = await axios(
        "https://6351779adfe45bbd55c0ffd1.mockapi.io/btq"
      );
      console.log(response);
      return response;
    } catch (error) {
      console.log(error, "ERROR 1 bro");
    }
  };
  try {
    const response = await Promise.all([api1(), api2()]);

    console.log(response[0]);
    console.log(response[1]);
    return null;
  } catch (error) {
    console.log(error);
    return null;
  }
};
const Exp = () => {
  return <div>Exp</div>;
};

export default Exp;
