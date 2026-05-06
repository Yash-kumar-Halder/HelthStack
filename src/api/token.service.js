let accessToken = null;

export const tokenService = {
    getAccessToken() {
        return accessToken;
    },

    setAccessToken(token) {
        accessToken = token;
    },

    clearAccessToken() {
        accessToken = null;
    },
};
