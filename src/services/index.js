const baseURL = 'https://mtcticketing.herokuapp.com';
// const baseURL = 'http://192.168.43.186:4000'

export async function checkAadhaar(uid){
    console.log(uid)
    var result = await fetch(baseURL + '/checkaadhaar',{
        method: "POST",
        headers: {
            'Accept' : 'application/json',
            'Content-Type' : 'application/json'
        },
        body: JSON.stringify({
            uid
        })
    }).then(res => res.json());

    return result;
}

export async function checkUserName(userName){
    var result = await fetch(baseURL + '/checkusername',{
        method: "POST",
        headers: {
            'Accept' : 'application/json',
            'Content-Type' : 'application/json'
        },
        body: JSON.stringify({
            userName
        })
    }).then(res => res.json());

    return result;
}

export async function userRegister(data){
    var result = await fetch(baseURL + '/userregister',{
        method: "POST",
        headers: {
            'Accept' : 'application/json',
            'Content-Type' : 'application/json'
        },
        body: JSON.stringify(data)
    }).then(res => res.json());

    return result;
}

export async function userLogin(data){
    var result = await fetch(baseURL + '/userlogin',{
        method: "POST",
        headers: {
            'Accept' : 'application/json',
            'Content-Type' : 'application/json'
        },
        body: JSON.stringify(data)
    }).then(res => res.json());

    return result;
}

export async function listBuses(from,to){
    var result = await fetch(baseURL + '/listbuses',{
        method: "POST",
        headers: {
            'Accept' : 'application/json',
            'Content-Type' : 'application/json'
        },
        body: JSON.stringify({
            from,
            to
        })
    }).then(res => res.json());

    return result;
}

export async function fareCalculation(from, to) {
    var result = await fetch(baseURL + '/farecalculation',{
        method: "POST",
        headers: {
            'Accept' : 'application/json',
            'Content-Type' : 'application/json'
        },
        body: JSON.stringify({
            from,
            to
        })
    }).then(res => res.json());

    return result;
}

export async function checkPIN(uid,pinNumber) {
    var result = await fetch(baseURL + '/checkpin',{
        method: "POST",
        headers: {
            'Accept' : 'application/json',
            'Content-Type' : 'application/json'
        },
        body: JSON.stringify({
            uid,
            pinNumber
        })
    }).then(res => res.json());

    return result;
}

export async function ticketGeneration(uid,from,to,fare,noOfTickets) {
    var result = await fetch(baseURL + '/ticketing',{
        method: "POST",
        headers: {
            'Accept' : 'application/json',
            'Content-Type' : 'application/json'
        },
        body: JSON.stringify({
            uid,
            from,
            to,
            fare,
            noOfTickets
        })
    }).then(res => res.json());

    return result;
}

export async function updateTravelHistory(uid) {
    var result = await fetch(baseURL + '/travelhistory',{
        method: "POST",
        headers: {
            'Accept' : 'application/json',
            'Content-Type' : 'application/json'
        },
        body: JSON.stringify({
            uid
        })
    }).then(res => res.json());

    return result;
}

export async function walletRecharge(uid,loadAmount) {
    var result = await fetch(baseURL + '/walletrecharge',{
        method: "POST",
        headers: {
            'Accept' : 'application/json',
            'Content-Type' : 'application/json'
        },
        body: JSON.stringify({
            uid,
            loadAmount
        })
    }).then(res => res.json());

    return result;
}