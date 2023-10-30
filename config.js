const dotenv=require('dotenv').config();

module.exports={
    PORT:process.env.PORT || 3001,
    PASSWORD: process.env.PASS,
    DATABASE: process.env.BASE
}
