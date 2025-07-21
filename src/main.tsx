import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter } from "react-router-dom";
import { GlobalProvider } from "./Context/Context.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: (failureCount, error: any) => {
        if (error.response?.status === 401) return false;
        if (error.response?.status === 404) return false;
        if (error.response?.status === 400) return false;
        if (error.response?.status === 403) return false;
        if (error.response?.status === 409) return false;
        return failureCount < 3;
      },
    },
  },
});
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <GlobalProvider>
        <QueryClientProvider client={queryClient}>
          <App />
        </QueryClientProvider>
      </GlobalProvider>
    </BrowserRouter>
  </StrictMode>
);
