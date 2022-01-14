
export const increment=()=>{
    return ({
        type:"INCREMENT"
    })
}


export const loadweb3Action=(web3)=>{
    return ({
        type: "LOAD_WEB3",
        payload: web3
    })
}

export const loadConnectedAccountAction=(account)=>{
    return ({
        type: "CONNECTED_ACCOUNT",
        payload: account
    })
}

export const loadTokenContractAction=(contract)=>{
    return ({
        type: "TOKEN_CONTRACT",
        payload: contract
    })
}

export const loadExchangeContractAction=(contract)=>{
    return ({
        type: "EXCHANGE_CONTRACT",
        payload: contract
    })
}


export const loadCreatedOrdersAction=(stream)=>{
    return ({
        type: "CREATED_ORDERS",
        payload: stream
    })
}


export const loadCancelledOrdersAction=(stream)=>{
    return ({
        type: "CANCELLED_ORDERS",
        payload: stream
    })
}


export const loadFilledOrdersAction=(stream)=>{
    return ({
        type: "FILLED_ORDERS",
        payload: stream
    })
}

export const orderCancelled=(cancelledOrder)=>{
    return ({
        type: "ORDER_CANCELLED",
        payload: cancelledOrder

    })
}