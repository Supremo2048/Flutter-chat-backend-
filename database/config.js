const mongoose = require('mongoose');

const dbConection = async () => {
    try {
        mongoose.set("strictQuery", false);
        mongoose.connect(process.env.DB_CON, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        
        console.log('Online')

    } catch (error) {
        console.log(error);
        throw new Error('Error de conexion');
    }
    
}

module.exports = {
    dbConection
}