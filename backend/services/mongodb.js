const mongoose = require('mongoose')
const dbPasswd = process.env.MONGODB_DBPASSWORD;
const url = `mongodb+srv://laurawetterwachs:${dbPasswd}@fullstacktutorial.3rn4lnq.mongodb.net/fullstackTutorial?retryWrites=true&w=majority&appName=fullstackTutorial`;

function run() {
    mongoose.set('strictQuery', false)
    mongoose.connect(url)
        .then(() => console.log('Connected to mongodb'))
        .catch(err => console.error("Error connecting to mongodb:", err));
}

module.exports = {run};
