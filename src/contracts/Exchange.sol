pragma solidity 0.8.10;

import "./Token.sol";

//  TODO
//  [x] set the fee account --- the account that fees will go to whenever trades are issued
//  [x]  Deposit Ether
//  []  Withdraw Ether
//  [x]  Deposit tokens
//  []  Withdraw tokens
//  []  Check balances
//  []  Make order
//  []  Cancel order
//  []  Fill order
//  []  Charge Fees


contract Exchange {

    //  variables
    address public feeAccount; //   the account that fees will go to
    uint256 public feePercent;
    address constant public ETHER = address(0);    //  store ether in tokens mapping with blank address

    //  we need the exchange to track the tokens that have been deposited
    //  first address is the token address, second address is the user holding that token
    mapping(address => mapping(address => uint256)) public tokens;

    //  balance of the exchange and accounts interacting with the exchange

    mapping(address => uint256) public balanceOf;

    //  Events

    event Deposit(address _token, address _user, uint256 amount, uint256 _balance);

    constructor (address _feeAccount, uint256 _feePercent) {
        feeAccount = _feeAccount;
        feePercent = _feePercent;
        
    }

    // revert if ether was sent by mistake to this contract

    fallback() external {
        revert();
    }

    function depositEther() payable public {

        // how to deposit ether
        tokens[ETHER][msg.sender] += msg.value;
        emit Deposit(ETHER, msg.sender, msg.value, tokens[ETHER][msg.sender]);
    }

    //  Deposit token

    function depositToken(address _token, uint256 _amount) public {
        //  which token ? ---because it can be any erc20 token --- we do this by passing the address of the token
        //  how much ?
        //  send token to this contract
        //  manage deposit
        //  emit an event


        //  Note: the exchange contract needs to be approved to transfer token: this will be done on the client side

        //  Dont allow ether deposit reject ether deposit
        require(_token != ETHER);
        require(Token(_token).transferFrom(msg.sender, address(this), _amount)); //   address(this) means the address of this smart contract
        tokens[_token][msg.sender] += _amount;


        //  emit a deposit event
        emit Deposit(_token, msg.sender, _amount, tokens[_token][msg.sender]);

    }


}