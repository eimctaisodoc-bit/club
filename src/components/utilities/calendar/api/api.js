import axios from 'axios';

const API_BASE_URL = "http://localhost:5000/api";

export const getAllOpenings = async () => {
  try {
    const res = await axios.get(`${API_BASE_URL}/openings`);
    return res.data;
  } catch (error) {
    console.log(error)
    throw new Error(error.response?.data?.error || "Failed to load calendar data");
  }
};
export const getAllReservation = async () => {
  try {
    const res = await axios.get(`${API_BASE_URL}/reserve`);
    return res.data;
  } catch (error) {
    console.log(error)
    throw new Error(error.response?.data?.error || "Failed to load calendar data");
  }
};










export const saveSeatOpenings = async (date, payloadData) => {
  try {

    const res = await axios.post(`${API_BASE_URL}/openings`, payloadData);

    return res.data;
  } catch (error) {
    console.error("RAW AXIOS ERROR:", error);
    throw new Error(error.response?.data?.error || "Failed to save configuration");
  }
};



export const booking = async (bookingData) => {
  try {
    const res = await axios.post(
      `${API_BASE_URL}/reserve`,
      bookingData
    );

    return res.data;
  } catch (error) {
    throw {
      status: error?.response?.status,
      message:
        error?.response?.data?.message ||
        error?.message 
    };
  }
};