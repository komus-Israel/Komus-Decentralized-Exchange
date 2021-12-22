pragma solidity 0.8.10;
import "./Token.sol";


//  Deposit and Withdraw Funds
//  Manage Orders - Make or Cancel
//  Handle Trades -- charge fees


//  TODO:

//  [x]  set the fee account

contract Exchange {

    address public transactionFeeAccount; // account receives the exchange fee
    uint256 public transactionFeePercent;
    mapping(address => mapping(address=>uint256)) public tokens;

    constructor (address _transactionFeeAccount, uint256 _transactionFeePercent) {

        transactionFeeAccount = _transactionFeeAccount;
        transactionFeePercent = _transactionFeePercent;

    }

    function depositToken(address _token, uint _amount) public {

        

        //  which token ?
        //  how much ?
        //  manage deposit
        
        //  send tokens to this contract
        require(Token(_token).transferFrom(msg.sender, address(this), _amount));

        //
        
    }

    
}

