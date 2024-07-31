const { Client } = require('pg');
try {
    const client = new Client({
        user: 'postgres',
        host: 'localhost',
        database: 'employee_tracker',
        password: 'ft7jr2',
        port: 5432,
    });
    
    client.connect();
    
    module.exports = client;
} catch (error) {
    console.log("Error DB: ", error);
}
