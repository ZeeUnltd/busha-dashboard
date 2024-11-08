import React, { ReactEventHandler, useEffect, useState } from "react";
import CloseIcon from "../icons/closeIcon";
import NetworkErrorIcon from "../icons/NetworkErrorIcon";
import { Button } from "../shared/button";
import Loader from "../shared/Loader";
import ErrorSpace from "./ErrorSpace";
// import PropTypes from "prop-types";

interface Account {
  currency: string;
  name: string;
  type: string;
  imgURL: string;
}
interface Props {
  setClose?: ReactEventHandler;
}
export const ErrorBoundary: React.FC = ({ children }) => {
  const [error, setError] = useState(null);
  
  return (
    <div>
      {error ? (
        <div className="modal flex flex-col items-center justify-center h-screen">
          <div className="text-center">
            <p>
              <NetworkErrorIcon />
            </p>
            {children}
          </div>
        </div>
      ) : (
        children
      )}
    </div>
  );
};
const AddWallet: React.FC<Props> = ({ setClose }:any) => {
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [loading, setLoading] = useState(true);
  const [networkError, setNetworkError] = useState<String | null>(null);
  const fetchAccounts = async () => {
    setLoading(true);
    try {
      const response = await fetch("http://localhost:3090/wallets");
      if (!response.ok) {
        setNetworkError("An unknown error occured");
      }
      const data = await response.json();
      setAccounts(data);
      setLoading(false);
    } catch (error: any) {
      console.error("Error:", error);
      setNetworkError(error?.message ?? "An unknown error occured");
      setLoading(false);
    }
  };
  const handleClose = () => {
    setClose()
  }
  useEffect(() => {
    fetchAccounts();
  }, []);

  return (
    <>
        <div className="relative">
          {loading ? (
            <div className="modal flex flex-col items-center justify-center h-screen">
              <div>
                <Loader />
              </div>
            </div>
          ) : (
            <>
              {networkError ? (
                <ErrorSpace error={`${networkError}`}>
                    <p className="mt-2 text-center">{networkError}</p>
                    <Button
                      onClick={() => fetchAccounts()}
                      className="rounded btn"
                    >
                      Try Again
                    </Button>
                </ErrorSpace>
              ) : (
                <div className="modal">
                  <div className="flex justify-end modal-header">
                    <h3>Add new wallet</h3>
                    <Button onClick={() => handleClose()}>
                      <CloseIcon />
                    </Button>
                  </div>
                  <h3>New Wallet</h3>
                  <form>
                    <input type="text" placeholder="Enter wallet name" />
                    <button type="submit">Add Wallet</button>
                  </form>
                </div>
              )}
            </>
          )}
        </div>
    </>
  );
};

// Wallet.propTypes = {
//   username: PropTypes.string.isRequired,
//   age: PropTypes.number.isRequired,
//   isLoggedIn: PropTypes.bool.isRequired,
// };

export default AddWallet;
