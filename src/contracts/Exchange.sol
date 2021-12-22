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

    // first address is the address of the token
    // second address is the address of person that has deposited the token
    // unit256 is the amount that has been deposited
    mapping(address => mapping(address => uint256)) public tokens; // mapping of tokens on the platform


    // emit a deposit event
    event Deposit(address _token, address _user, unit256 _amount, unit256 _balance);

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


        // manage deposit
        tokens[_token][msg.sender] += _amount;

        emit Deposit(_token, msg.sender, _amount, tokens[_token][msg.sender]);
        
    }

    
}

