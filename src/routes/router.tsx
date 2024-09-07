import { createBrowserRouter } from "react-router-dom";
import App from "../App";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
          {
            index: true,
            element: <HomePage />,
          },
          {
            path: "/contact-us",
            element: <ContactUsPage />,
          },
          {
            path: "/about-us",
            element: <AboutUsPage />,
          },
        ],
      },
])