const BackEndDomain = 'http://localhost:5000';

export const UserAPI = {

    //Register New User
    Register_User: {
        url: `${BackEndDomain}/auth/register`,
        method: 'post'
    },

    Login_User: {
        url: `${BackEndDomain}/auth/login`,
        method: 'post'
    },


}

//export const StockAPI = {
    
// }