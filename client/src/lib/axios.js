import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "/api",
  withCredentials: true,
  timeout: 10000,
});

// --- Retry logic: retry once on network error or 5xx ---
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const config = error.config;

    // Only retry once, skip if already retried or if it's a 4xx
    const status = error.response?.status;
    const isNetworkError = !error.response;
    const isServerError = status >= 500;

    if (!config._retried && (isNetworkError || isServerError)) {
      config._retried = true;
      await new Promise((r) => setTimeout(r, 800)); // wait 800ms before retry
      return axiosInstance(config);
    }

    // --- 401 interceptor: JWT expired or invalid → force logout ---
    if (status === 401) {
      // Lazy import to avoid circular dep at module load time
      const { useAuthStore } = await import("../store/useAuthStore");
      const { authUser, disconnectSocket } = useAuthStore.getState();

      if (authUser) {
        disconnectSocket();
        useAuthStore.setState({ authUser: null });

        const { default: toast } = await import("react-hot-toast");
        toast.error("Session expired — please sign in again");

        // Redirect to login
        window.location.href = "/login";
      }
    }

    return Promise.reject(error);
  }
);
