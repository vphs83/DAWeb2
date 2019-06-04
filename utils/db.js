var mysql = require('mysql');

var createConnection = ()=>mysql.createConnection({
    host: 'localhost',
    port: 8889,
    user: 'root',
    password: 'root',
    database: 'qlbh',
});

module.exports = {
load: sql=>{
    return new Promise((resolve, reject)=>{
    var connection = createConnection();
    connection.connect();
    connection.query(sql, (error, results, fields) => {
        if (error) {
            reject(error);
        } else {   
            resolve(results);
        }
        connection.end();
    });
    });  
},

add: (tableName,entity)=>{
    return new Promise((resolve, reject)=>{
        var connection = createConnection();
        var sql = `insert into ${tableName} set ?`;
        connection.connect();
        connection.query(sql,entity, (error, results, fields) => {
            if (error) {
                reject(error);
            } else {   
                resolve(results.insertId);
            }
            
            connection.end();
        }); 
    });   
},

update: (tableName,idField,entity,id)=>{
    return new Promise((resolve, reject)=>{
        var connection = createConnection();
        var sql = `update  ${tableName} set ? where ${idField} = ?`;
        connection.connect();
        connection.query(sql,[entity,id], (error, results, fields) => {
            if (error) {
                reject(error);
            } else {   
                resolve(results.changedRows);
            } connection.end();
        });
    });
    
},
// update: (tableName,idField,entity,id,fn)=>{
//     var connection = createConnection();
//     var sql = `update  ${tableName} set ? where ${idField} = ?`;
//     connection.connect();
//     connection.query(sql,[entity,id], (error, results, fields) => {
        
//         if (error) {
//             console.log(error.sqlMessage);
//         } else {
            
//            fn(results.changedRows);
//         }
    
//         connection.end();
//     });
// },
};

