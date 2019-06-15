
var db = require('../utils/db');
var config = require('../config/default.json');
// var moment = require("moment");
const timeAgo = require('../utils/formatDate');
module.exports = {
    all:()=>{
       
        return db.load('select * from NEWS');
    },
    
    countByCat: catId=>{
        
        return db.load(`select count(*) as total from NEWS where CatID = ${catId}`);
       
    },

    pageByCat: async (catId, start_offset)=>{
        var lim = config.paginate.default;
        const data = await db.load(`select * from NEWS where CatID = ${catId} limit ${lim} offset ${start_offset}`);
        for(let item of data)
        {
            item.NewsDate = timeAgo(new Date(item.NewsDate).getTime()/1000);
        }
        
        return data; 
    },

    single: async id => {
       
        const data = await db.load(`select * from NEWS where NewsID = ${id}`);
        
        for(let item of data)
        {
            item.NewsDate = timeAgo(new Date(item.NewsDate).getTime()/1000);
        }
        
        return data; 
    },
    add: entity =>{
        return db.add('NEWS', entity);
    },
    delete: id =>{
        return db.delete('NEWS', 'NewsID',id);
    },
    update: entity =>{
        var id = entity.NewsID;
        delete entity.NewsID;
        return db.update('NEWS', 'NewsID',entity, id);
    }
}