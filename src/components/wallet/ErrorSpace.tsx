import React, { ReactNode, useState } from "react";
import NetworkErrorIcon from "../icons/NetworkErrorIcon";
import { Button } from "../shared/button";

interface ErrorSpaceProps {
  error: string | null; // Define the type of error
  children?: ReactNode;
}
const ErrorSpace: React.FC<ErrorSpaceProps> = ({ error, children }) => {
  const [errorWrapper, setError] = useState(error);
  return (
    <>
      {!errorWrapper ? (
        <>{children}</>
      ) : (
        <>
          <div className="modal flex flex-col items-center justify-center h-screen">
            <div className="text-center">
              <p>
                <NetworkErrorIcon />
              </p>
              {children}
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default ErrorSpace;
