const User = require('./schemas/User');

async function verify(email, loginToken, username) {
    if (!email || !loginToken) {
        return false;
    }

    let user = await User.findOne({ email: email, username: username });
    if (!user) return false;

    if (loginToken == user.loginToken) {
        return true;
    } else {
        return false;
    }
}

module.exports = verify;
