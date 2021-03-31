export const minPasswordLength = 8;
export const minUsernameLength = 4;
export const validatePassword = (pw: string) => {
    return pw.length > minPasswordLength;
};

export const validateEmail = (email: string) => {
    const re = /^\S+@\S+\.\S+$/; // matches generic email pattern
    return re.test(email);
};

export const validateUsername = (username: string) => {
    const re = /[^\w]/; // matches any non alphanumeric (plus underscore) character
    return !re.test(username) && username.length > minUsernameLength;
};
