// helpers/libs.js

const helpers = {};

helpers.randomNumber = () => {
    const possible = 'abcdefghijklmnopqrstuvwxyz0123456789';
    let randomStr = '';
    for (let i = 0; i < 6; i++) {
        randomStr += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return randomStr;
};

module.exports = helpers;
