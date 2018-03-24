//called when successful login to load the user data from the API response to the redux store
export const loadUserDetails = (data) => ({
    type: 'LOAD_USER_DETAILS',
    payload: data
})

export const updateTravelHistory = (ticket) => ({
    type: 'UPDATE_TRAVEL_HISTORY',
    payload: ticket
})

export const ticketsUpdate = (travelHistory) => ({
    type: 'TICKETS_UPDATE',
    payload: travelHistory
})

export const updateWalletAmount = (walletAmount) => ({
    type: 'UPDATE_WALLET_AMOUNT',
    payload: walletAmount
})

export const ticketingFareFromAndToTemp = (fare,from,to,noOfTickets) => ({
    type : 'FARE_FROM_AND_TO',
    payload : {
        fare,
        from,
        to,
        noOfTickets
    }
})

export const logout = (data) => ({
    type: 'LOGOUT'
})