const defaultState = {
	uid : 5851953202,
	fullName : "Sudarsan T J",
	userName : "tjsudarsan",
	password : "tjs123",
	gender : "Male",
	dob : "14/11/1996",
	pinNumber : 1234,
	phoneNumber : 7708660623,
	walletAmount : 28,
	travelHistory : [
		{
			ticketNo : "oq3sofjuno",
			fromLocation : "Airport",
			toLocation : "Guindy",
			fare : 1,
			timeStamp : 1515131017420
		},
		{
			ticketNo : "a0gmjymd0b",
			fromLocation : "Thirumangalam",
			toLocation : "M.M.D.A Colony RD.JN",
			fare : 10,
			timeStamp : 15156070486901
		}
	]
};

export default (state = defaultState, actions) => {
    switch(actions.type){
        default:
            return state;
    }
}