
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

export const loadTokenContract=(contract)=>{
    return ({
        type: "TOKEN_CONTRACT",
        payload: contract
    })
}

export const loadExchangeContract=(contract)=>{
    return ({
        type: "EXCHANGE_CONTRACT",
        payload: contract
    })
}


export const loadCreatedOrders=(stream)=>{
    return ({
        type: "CREATED_ORDERS",
        payload: stream
    })
}


export const loadCancelledOrders=(stream)=>{
    return ({
        type: "CANCELLED_ORDERS",
        payload: stream
    })
}