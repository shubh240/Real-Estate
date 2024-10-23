import { toast } from "react-toastify";
import CryptoJS from 'crypto-js';
import Cookies from "js-cookie";
import { useOutletContext } from "react-router-dom";

const CRYPTO_KEY = 'VLaEQrkAjtcyayabGsadsAbFdBMiMZmV'
const CRYPTO_IV = 'VLaEQrkAjtcyayab'


const KEY = CryptoJS.enc.Utf8.parse(CRYPTO_KEY);
const IV = CryptoJS.enc.Utf8.parse(CRYPTO_IV);

const TOAST_SUCCESS = (message) => {
  return toast.success(message);
};

const TOAST_INFO = (message) => {
  return toast.info(message);
};

const TOAST_ERROR = (message) => {
  return toast.error(message);
};

const TOAST_WARNING = (message) => {
  return toast.warning(message);
};

export const Encryption = (request = {}, isStringify) => {
  const requestData = isStringify ? JSON.stringify(request) : request;
  let encrypted = CryptoJS.AES.encrypt(requestData, KEY, { iv: IV }).toString();
  return encrypted
}

export const Decryption = async (response) => {
  let decrypted = await CryptoJS.AES.decrypt(response.toString(), KEY, { iv: IV });
  let decryptedData = await JSON.parse(decrypted.toString(CryptoJS.enc.Utf8));
  return decryptedData;
}

export const DecryptionSearch = async (response) => {
  try {

    // Decrypt the response
    const decrypted = CryptoJS.AES.decrypt(response.toString(CryptoJS.enc.Utf8), KEY, { iv: IV });

    // Convert the decrypted data to a UTF-8 string
    const decryptedStr = decrypted.toString(CryptoJS.enc.Utf8);

    return decryptedStr;
  } catch (error) {
    console.error('Error during decryption:', error);
    return null;
  }
};

export const PUBLICURL = process.env.PUBLIC_URL

const convertToBase64 = async (file) => {
  if (file.type.includes("video")) return URL.createObjectURL(file);
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader();
    fileReader.onload = () => {
      resolve(fileReader.result);
    };
    fileReader.onerror = reject;
    file && fileReader.readAsDataURL(file);
  });
};

const getTimeValues = (count) => {
  const days = Math.floor(count / (1000 * 60 * 60 * 24));
  const hours = Math.floor((count % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((count % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((count % (1000 * 60)) / 1000);
  if (days + hours + minutes + seconds <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  }
  return {
    days: isNaN(days) ? 0 : days,
    hours: isNaN(hours) ? 0 : hours,
    minutes: isNaN(minutes) ? 0 : minutes,
    seconds: isNaN(seconds) ? 0 : seconds,
  };
};

export const logoutRedirection = () => {
  Cookies.remove('isLoginCA');
  Cookies.remove('dataCA');
  Cookies.remove('tokenCA');

  // Dispatch custom event
  const tokenChangeEvent = new Event('tokenChanged');
  window.dispatchEvent(tokenChangeEvent);

}

const formatDate = (dateString, format) => {
  const date = new Date(dateString);

  let hours = date.getHours();
  const minutes = date.getMinutes();
  const ampm = hours >= 12 ? 'PM' : 'AM';

  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'

  const minutesStr = minutes < 10 ? '0' + minutes : minutes;

  return `${hours}:${minutesStr} ${ampm}`;
}

export {
  TOAST_SUCCESS,
  TOAST_INFO,
  TOAST_ERROR,
  TOAST_WARNING,
  convertToBase64,
  getTimeValues,
  formatDate
};


