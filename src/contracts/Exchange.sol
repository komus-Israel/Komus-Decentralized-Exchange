pragma solidity 0.8.10;
import "./Token.sol";


//  Deposit and Withdraw Funds
//  Manage Orders - Make or Cancel
//  Handle Trades -- charge fees


//  TODO:

//  [x] set the fee account
//  [x] deposit token
//  [x] deposit ether
//  [x] withdraw ether
//  [x] withdraw token
//  [x] create order
//  []  cancel order

contract Exchange {

    address public transactionFeeAccount; // account receives the exchange fee

    uint256 public transactionFeePercent;

    address constant ETHER = address(0); // store ether in blank address

    uint256 public orderCount;

    // first address is the address of the token
    // second address is the address of person that has deposited the token
    // unit256 is the amount that has been deposited
    mapping(address => mapping(address => uint256)) public tokens; // mapping of tokens on the platform
    mapping(uint256 => _Order) public orders; // store the orders in a mapg
    //  create a model to store the order to the storage
    struct _Order {

        uint256 _id;
        uint256 _timeCreated;
        uint256 _amountGive;
        uint256 _amountGet;
        address _tokenGive;
        address _tokenGet;
        address _creator;
    }

    /*
    
    *   EVENTS
    
     */


    // emit a deposit event
    event Deposit(address _token, address _user, uint256 _amount, uint256 _balance);


    // emit withdraw event
    event Withdraw(address _token, address _user, uint256 _amount, uint256 _balance);

    //  emit the Order event
    event Order(uint256 _id, uint256 _timeCreated, uint256 _amountGive, uint256 _amountGet, address _tokenGive, address _tokenGet, address _creator);


    // constructor
    constructor (address _transactionFeeAccount, uint256 _transactionFeePercent) {

        transactionFeeAccount = _transactionFeeAccount;
        transactionFeePercent = _transactionFeePercent;

    }

    fallback() external {

    }

    function depositToken(address _token, uint _amount) public {

        // disallow ether deposits through this address
        require(_token != ETHER);

        //  which token ?
        //  how much ?
        //  manage deposit
        
        //  send tokens to this contract
        require(Token(_token).transferFrom(msg.sender, address(this), _amount));


        // manage deposit
        tokens[_token][msg.sender] += _amount;

        emit Deposit(_token, msg.sender, _amount, tokens[_token][msg.sender]);
        
    }


    function depositEther() payable public {
        tokens[ETHER][msg.sender] += msg.value; 

        // emit ether deposit
        emit Deposit(ETHER, msg.sender, msg.value, tokens[ETHER][msg.sender]);
    }

    function withdrawEther(uint _amount) public {

        // the amount to be withdrawn should be less or equal to the deposited amount
        require(_amount <= tokens[ETHER][msg.sender]);
        // reduce the value to be withdrawn from the ether tokens map
        tokens[ETHER][msg.sender] -= _amount;

        payable(msg.sender).transfer(_amount);
        

        //  emit the withdraw event
        emit Withdraw(ETHER, msg.sender, _amount, tokens[ETHER][msg.sender]);
        
    }

    function withdrawTokens(address _token, uint _amount) public {
        //  the token to be withdrawn must be less or equal to the token deposited
        //  the address to send the token must not be an ether address
        //  send the token
        //  emit the withdraw event

        require(msg.sender != address(0));
        require(_token != ETHER);
        require(_amount <= tokens[_token][msg.sender]);
        tokens[_token][msg.sender] -= _amount;
        Token(_token).transfer(msg.sender, _amount);
        emit Withdraw(_token, msg.sender, _amount, tokens[_token][msg.sender]);
    }

    function balanceOf(address _token, address _user) public view returns (uint) {
        return tokens[_token][_user];
    }


    function createOrder(uint256 _amountGive, uint256 _amountGet, address _tokenGive, address _tokenGet) public {

        orderCount = orderCount + 1;

        //  instantiate the order
        orders[orderCount] = _Order(orderCount, block.timestamp, _amountGive, _amountGet, _tokenGive, _tokenGet, msg.sender);

        //  emit the Order event
        emit Order(orderCount, block.timestamp, _amountGive, _amountGet, _tokenGive, _tokenGet, msg.sender);

    }



    
    

    
}

