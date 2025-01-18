interface envProp {
  apiUrl: string;
  websocket: string;
  clintDomain: string;
  google_client_id: string;
  google_client_secret: string;
}

const env: envProp = {
  apiUrl: import.meta.env.VITE_API_URL,
  websocket: import.meta.env.VITE_APP_WEBSOCKET_URL,
  clintDomain: import.meta.env.VITE_API_DOMAIN,
  google_client_id: import.meta.env.VITE_API_GOOGLE_CLIENT_ID,
  google_client_secret: import.meta.env.VITE_API_GOOGLE_CLIENT_SECRET,
};

export default env;
