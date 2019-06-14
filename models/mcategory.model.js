
var db = require('../utils/db');
module.exports = {
    all:()=>{
       
        return db.load('select * from categories');
    },
    allWithDetails:()=>{
       
        return db.load('SELECT m.*, COUNT(n.NewsID) AS mnum_of_news FROM mCategories m LEFT JOIN NEWS n on m.mCatID = n.mCatID GROUP by m.mCatID, m.mCatName');
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