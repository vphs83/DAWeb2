
var db = require('../utils/db');

// var moment = require("moment");
const timeAgo = require('../utils/formatDate');
module.exports = {
    all:()=>{
       
        return db.load('select * from NEWS');
    },
    allByCat: async catId=>{
        // console.log(moment(new Date()));
        // db.load(`select * from NEWS where CatID = ${catId}`).then(rs => {
        //     // console.log(rs)
        //     for(let item of rs) {
        //         item.NewsDate = moment().format('L');
        //     }
        // }, err => {
        //     console.log(err)
        // })

        const data = await db.load(`select * from NEWS where CatID = ${catId}`);
        for(let item of data) {
            const tmp = new Date()
            //item.NewsDate = parseInt((tmp - item.NewsDate) / (1000 * 60 * 60 * 24)) + "ngày trước"  //moment().startOf(item.NewsDate).fromNow(); 
            item.NewsDate = timeAgo(item.NewsDate)
        }
        return data; //chay lai server xem run run
       
    },
    single: id => {
       
        return db.load(`select * from NEWS where NewsID = ${id}`);
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