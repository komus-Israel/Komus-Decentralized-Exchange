const DecorateFilledOrder=(orders)=>{
    return(
        orders.map((order)=>{
            order = decorateOrder(order)
        })
    )
}

const decorateOrder=(order)=>{
    return order
}

export default DecorateFilledOrder