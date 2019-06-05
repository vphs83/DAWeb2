
var db = require('../utils/db');
module.exports = {
    all:()=>{
       
        return db.load('select * from categories1');
    },
    single: id => {
       
        return db.load(`select * from categories where CatID = ${id}`);
    },
    add: entity =>{
        return db.add('categories', entity);
    },
    delete: id =>{
        return db.delete('categories', 'CatID',id);
    },
    update: entity =>{
        var id = entity.CatID;
        delete entity.CatID;
        return db.update('categories', 'CatID',entity, id);
    }
}