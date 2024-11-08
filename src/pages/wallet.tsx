import React, { useEffect, useState, lazy, Suspense } from "react";
import WalletCard, { WalletCardProps } from "../components/wallet/WalletCard";
import AddWallet, { ErrorBoundary } from "../components/wallet/AddWallet";
import ErrorSpace from "../components/wallet/ErrorSpace";
// import PropTypes from "prop-types";

// interface Props {
//   username: string;
//   age: number;
//   isLoggedIn: boolean;
// }
const Loader = lazy(() => import("../components/shared/Loader"));

const Wallet: React.FC = () => {
  const Modal = lazy(() => import("../components/shared/Modal"));
  const [accounts, setAccounts] = useState<WalletCardProps[]>([]);
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const fetchAccounts = async () => {
    setLoading(true);
    const response = await fetch("http://localhost:3090/accounts");
    if (!response.ok) {
      setError("An unknown error occurred");
      return;
    }
    const data = await response.json();
    setAccounts(data);
    setLoading(false);
  };
  useEffect(() => {
    fetchAccounts();
  }, []);
  return (
    <>
      <div className="flex justify-between items-center rounded-full font-medium">
        <h2> Wallets</h2>
        <button onClick={() => setOpenModal(true)}>+ Add new wallet</button>
      </div>
      {
        <ErrorSpace error={error}>
          {loading ? (
            <div className="modal flex flex-col items-center justify-center h-screen">
              <div>
                <Loader />
              </div>
            </div>
          ) : (
            <>
              <article className="wallet grid relative">
                {accounts &&
                  accounts?.map((account: WalletCardProps) => (
                    <WalletCard key={account.id} {...account} />
                  ))}
              </article>
            </>
          )}
        </ErrorSpace>
      }
      {openModal && (
        <Modal isOpen={openModal}>
          <AddWallet setClose={() => setOpenModal(false)} />
        </Modal>
      )}
    </>
  );
};

// Wallet.propTypes = {
//   username: PropTypes.string.isRequired,
//   age: PropTypes.number.isRequired,
//   isLoggedIn: PropTypes.bool.isRequired,
// };

export default Wallet;
