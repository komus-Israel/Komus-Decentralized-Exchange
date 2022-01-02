
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

