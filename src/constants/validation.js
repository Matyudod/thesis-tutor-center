module.exports = {
    login: {
        username: "string|min:1|max:255",
        password: "string|min:1|max:255",
    },
    signUp: {
        name: "string|max:255",
        email: "string|max:255",
        username: "string|max:255",
        password: "string|max:255",
        isAdmin: "boolean|optional|default:false",
    },
};
