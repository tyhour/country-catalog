import React from "react";
import Country from "./pages/country";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();
const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="main">
        <div className="wrap-country">
          <Country />
        </div>
      </div>
    </QueryClientProvider>
  );
};

export default App;
