import React, {
  lazy,
  Suspense,
  createContext,
  useState,
  useContext,
} from "react";
import Loader from "./Loader";
import { ErrorBoundary } from "../wallet/AddWallet";
// Define the context interface
interface DashboardContextType {
  isSidebarOpen: boolean;
  setSidebarOpen: () => void;
  activeMenu: string;
  // setTitle: (newTitle: string) => void;
}

// Create the context
const DashboardContext = createContext<DashboardContextType>(
  {} as DashboardContextType
);

// Create the context provider
export const DashboardProvider: React.FC = ({ children }) => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const activeMenu = window.location?.pathname.replace("/", "") ?? "";

  return (
    <DashboardContext.Provider
      value={{
        isSidebarOpen,
        setSidebarOpen: () => setSidebarOpen(!isSidebarOpen),
        activeMenu,
      }}
    >
      <ErrorBoundary>
        <Suspense fallback={<Loader />}>{children}</Suspense>
      </ErrorBoundary>
    </DashboardContext.Provider>
  );
};

// Create a custom hook to use the context
export const useDashboardContext = () => {
  return useContext(DashboardContext);
};
