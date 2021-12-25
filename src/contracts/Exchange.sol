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
//  [x] cancel order

contract Exchange {

    address public transactionFeeAccount; // account receives the exchange fee

    uint256 public transactionFeePercent;

    address constant ETHER = address(0); // store ether in blank address

    uint256 public orderCount;

    // first address is the address of the token
    // second address is the address of person that has deposited the token
    // unit256 is the amount that has been deposited

    mapping(address => mapping(address => uint256)) public tokens; // mapping of tokens on the platform

    mapping(uint256 => _Order) public orders; // store the orders in a map

    mapping(uint256 => bool) public cancelledOrders; // cancel order

    mapping(uint256 => bool) public ordersFilled;


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

    //  emit event when an order is called
    event OrderCancelled(
        uint256 _id,
        uint256 _amountGive,
        uint256 _amountGet,
        uint256 _timeCancelled,
        address _tokenGive,
        address _tokenGet, 
        address _creator    
        );

    // emit trade event
    event Trade(
        uint256 _id,
        uint256 _amountGive,
        uint256 _amountGet,
        uint256 _timeTraded,
        address _tokenGive,
        address _tokenGet, 
        address _creator,
        address _filler
    )


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


    function cancelOrders(uint256 _id) public {

        //  the order to be cancelled is a valid order


        // fetch  the order from the storage which is a map

        _Order storage _order = orders[_id]; // solidity won't throw an error for an invalid key. For that, we  will require that the key is valid

        require(_order._id == _id);
        require(_order._creator == msg.sender);
        cancelledOrders[_id] = true;

        // emit OrderCancelled event
        emit OrderCancelled(_id, _order._amountGive, _order._amountGet, block.timestamp, _order._tokenGive, _order._tokenGet, _order._creator);

    }

    function fillOrder(uint256 _id) public {
        // fetch the order
        _Order storage _order = orders[_id];

        // require that the id is valid
        require(_order._id == _id);

        // require that the order is not cancelled
        require(!cancelledOrders[_id]);

        //  require that the order has not been filled
        require(!ordersFilled[_id]);

        //  require that the order is not filled by the creator of the contract
        require(_order._creator != msg.sender);

        //  execute trade
        _trade(_order._id, _order._creator, _order._tokenGet, _order._tokenGive, _order._amountGet, _order._amountGive);


        // execute the trade
        // charge fees
        // mark the orders as filled
        // emit the trade event


    }

    function _trade(uint256 _id, address _creator, address _tokenGet, address _tokenGive, uint256 _amountGet, uint256 _amountGive) internal {
        // swap the token

        /*
        
        *   withdraw the token to be given out by the creator from his account
        *   add the token to the balance of the filler


        *   in exchange for that, withdraw the token to be gotten by the creator from the fillers account
        *   add it to the balance of the order creator
        
         */


        //  update balances for the token to be released by the creator of the order
         tokens[_tokenGive][_creator] -= _amountGive;
         tokens[_tokenGive][msg.sender] += _amountGive;


         // update balances for the token to be received by the order creator
         tokens[_tokenGet][_creator] += _amountGet;
         tokens[_tokenGet][msg.sender] -= _amountGet;

        



    }

   
}

