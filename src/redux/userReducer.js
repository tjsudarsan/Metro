
const defaultState = {
	_id: null,
	uid : null,
	fullName : '',
	userName : '',
	password : '',
	gender : '',
	dob : '',
	pinNumber : null,
	phoneNumber : null,
	walletAmount : 0,
	travelHistory : [],
	isLoggedIn: false
};

export default (state = defaultState, actions) => {
    switch(actions.type){
		case 'LOAD_USER_DETAILS': 
			return actions.payload

		case 'UPDATE_TRAVEL_HISTORY':
			travelHistory = state.travelHistory;
			travelHistory.push(actions.payload);
			return { ...state, travelHistory, walletAmount: actions.walletAmount }

        default:
            return state;
    }
}