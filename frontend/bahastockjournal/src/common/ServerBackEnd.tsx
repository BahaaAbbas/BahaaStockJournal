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

    Refresh_Token: {
        url: `${BackEndDomain}/auth/refresh-token`,
        method: 'post'
    },

    User_Role_EMAIL: {
        url: `${BackEndDomain}/auth/user-role`,
        method: 'get'
    },

    Return_Users: {
        url: `${BackEndDomain}/auth/return-users`,
        method: 'get'
    },

    Update_Role: {
        url: `${BackEndDomain}/auth/update-role`,
        method: 'put'
    },

    Delete_User: {
        url: `${BackEndDomain}/auth/delete-user`,
        method: 'delete'
    },

    Forgot_Password: {
        url: `${BackEndDomain}/auth/forgot-password`,
        method: 'post'
    },

    Verify_OTP: {
        url: `${BackEndDomain}/auth/verify-otp`,
        method: 'post'
    },

    Reset_Password: {
        url: `${BackEndDomain}/auth/reset-password`,
        method: 'post'
    },




}

//export const StockAPI = {
    
// }