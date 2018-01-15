//called when successful login to load the user data from the API response to the redux store
export const loadUserDetails = (data) => ({
    type: 'LOAD_USER_DETAILS',
    payload: data
})