const LOCAL_API_URL = "https://localhost:5000/api/book";
const PRODUCTION_API_URL =
    "https://book-morgan-backend-c2h0azdzascva2cg.francecentral-01.azurewebsites.net";

const defaultApiUrl =
    window.location.hostname === "localhost" ? LOCAL_API_URL : PRODUCTION_API_URL;

export const API_URL = import.meta.env.VITE_API_BASE_URL ?? defaultApiUrl;
