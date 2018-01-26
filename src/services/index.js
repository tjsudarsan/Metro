const baseURL = 'https://mtcticketing.herokuapp.com';

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