import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { router } from "./routes.tsx";
import { RouterProvider } from "react-router";
import CartProvider from "./contexts/CartContext.tsx";
import { Toaster } from "react-hot-toast";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <CartProvider>
      <Toaster position="top-right" reverseOrder={false} />
      <RouterProvider router={router} />
    </CartProvider>
  </StrictMode>
);
