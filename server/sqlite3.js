import sqlite3 from 'sqlite3';
sqlite3.verbose();

var db = new sqlite3.Database("./server/sqlite.db");


const querys = {
    selectJob : "select seq, day, time, content from todayJob where day = ? order by time",
    insertJob : "insert into todayJob(day,time,content) values( #{day},#{time},#{content})"
}

let replaceParamOnQuery = (query, parameter)=>{
    if(typeof parameter == "object"){
        for(var key in parameter){
            query = query.replace("#{" + key + "}", "'" + parameter[key] + "'");
        }
    }else{
        query = query.replace(/a/, "'" + parameter + "'");
    }

    return query;
}

let sqlSelectList = (callback, queryId, parameter) =>{

   db.all(querys[queryId], parameter , function(err,row){
        var result = [];
        if(row.constructor == Array){
            if(row.length == 0){
                result = "";
            }else{
                result = row;
            }
        }else{
            result.push(row);
        }
        callback(result);
    });
}


let sqlInsert = (callback, queryId, parameter) =>{
    var result = 0;
    var exec = ()=>{
        var query = replaceParamOnQuery(querys[queryId], parameter);
        db.run(query);
    }

    try{
        if(parameter.constructor == Array){
            for(var i = 0, len = parameter.length; i < len; i++){
                exec(parameter[i]);
            }
        }else{
            exec(parameter);
        }
/*         var stmt = db.prepare(querys[queryId]);
        for (var i = 0; i < 10; i++) {
            stmt.run(parameter);
        }
        stmt.finalize(); */
    }catch(e){
        result = -1;
    }

    callback(result + "");
}

let apis = {
    sqlSelectList : sqlSelectList,
    sqlInsert : sqlInsert
}
export default apis;
