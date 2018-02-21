
const defaultState = {
    fare: null,
    from: null,
    to: null,
}

export default (state=defaultState,actions) => {
    switch(actions.type){
        case 'FARE_FROM_AND_TO':
            return actions.payload
            
        default: 
            return state
    }
}