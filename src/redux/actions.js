//called when successful login to load the user data from the API response to the redux store
export const loadUserDetails = (data) => ({
    type: 'LOAD_USER_DETAILS',
    payload: data
})

export const updateTravelHistory = (ticket,walletAmount) => ({
    type: 'UPDATE_TRAVEL_HISTORY',
    payload: ticket,
    walletAmount
})

export const ticketingFareFromAndToTemp = (fare,from,to) => ({
    type : 'FARE_FROM_AND_TO',
    payload : {
        fare,
        from,
        to
    }
})