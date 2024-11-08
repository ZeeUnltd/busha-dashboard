import React, { useEffect, useState, lazy, Suspense } from "react";

import PropTypes from "prop-types";

export interface WalletCardProps {
    id: string;
    currency: string;
    hold: string;
    pending_balance: number;
    balance: string;
    name: string;
    type: string;
    deposit: boolean;
    payout: boolean;
    imgURL: string;
  }

const WalletCard: React.FC<WalletCardProps> = ({id,
    currency,
    hold,
    pending_balance,
    balance,
    name,
    type,
    deposit,
    payout,
    imgURL}) => {

    const form
  return (
    <>
      
        <div className="card">
            <div className="w-full flex justify-start">
                <img className="h-10 w-10 rounded-full" src={imgURL} alt="user-avatar" />
                {name}
            </div>
            <div className="w-full flex justify-start">
                <span className="amount">
                    {                    <span className="amount">
                        {balance.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}
                        {/* {balance.toLocaleString('en-US', { style: 'currency', currency: 'USD' })} */}
                    </span>}
                </span>
            </div>

          {currency}
        </div>
      
    </>
  );
};

// WalletCard.propTypes = {
//   username: PropTypes.string.isRequired,
//   age: PropTypes.number.isRequired,
//   isLoggedIn: PropTypes.bool.isRequired,
// };

export default WalletCard;
