const parseUserInfoForRegistration = (body) => {
    return { username, email, password } = body;
}

const parseUserInfoForLogin = (body) => {
    return { email, password } = body;
}

module.exports = { parseUserInfoForRegistration, parseUserInfoForLogin };