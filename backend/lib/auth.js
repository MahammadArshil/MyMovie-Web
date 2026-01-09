require('dotenv').config();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const SALT_ROUND = 4;
const TOKEN_KEY = process.env.JWT_SECRET;

function GenerateToken(payload){
    const token = jwt.sign(payload, TOKEN_KEY);
    return token;
};

async function HashedPassword(plainText){
    return new Promise((resolve, reject) => {
        bcrypt.hash(plainText,SALT_ROUND,function (err,hash) {
            if(err){
                reject(err);
            }
            resolve(hash);
        });
    });
}

async function checkPassword(plainText, hash) {
    return new Promise((resolve, reject) =>{
        bcrypt.compare(plainText,hash, function(err, result) {
            if(err){
                reject(err);
            }
            resolve(result);
        });
    });
}

module.exports = {GenerateToken, HashedPassword ,checkPassword};