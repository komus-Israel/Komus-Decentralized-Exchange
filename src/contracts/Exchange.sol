pragma solidity 0.8.10;


//  Deposit and Withdraw Funds
//  Manage Orders - Make or Cancel
//  Handle Trades -- charge fees


//  TODO:

//  []  set the fee account

contract Exchange {

    address public transactionFeeAccount; // account receives the exchange fee

    constructor (address _transactionFeeAccount) {

        transactionFeeAccount = _transactionFeeAccount;

    }
}

