import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { Auth0Provider } from "@auth0/auth0-react";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Auth0Provider
      domain="dev-m2f3ppmzvnre585o.us.auth0.com"
      clientId="ihSZBYYkLrkknMZj9UiZGB4CRRaN0MJK"
      authorizationParams={{
        redirect_uri: "https://backend-real-estate-six.vercel.app",
      }}
      audience='https://backend-real-estate-six.vercel.app'
      // audience='this is the unique identifier'
      scope="openid profile email"
    >
      <App />
    </Auth0Provider>
  </React.StrictMode>
);
 