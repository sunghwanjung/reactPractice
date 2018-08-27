//타입 선언
export const SETDAY = "SETDAY";
export const SETJOBDATA = "SETJOBDATA";
export const SETJOB = "SETJOB";
export const ADDJOBDATA = "ADDJOBDATA";
export const BUTTONDISABLE = "BUTTONDISABLE";
export const MODALTYPE = "MODALTYPE";
export const MODALSHOW = "MODALSHOW";
export const RESETJOBDATA = "RESETJOBDATA";

//타입 별로 변경될 값의 key 선언
const valueOfTypes = {
    SETDAY : "selectedDay",
    SETJOBDATA : "jobData",
    SETJOB : "job",
    ADDJOBDATA : "jobItem",
    BUTTONDISABLE : ["inputButton", "updateButton"],
    MODALTYPE : "popupType",
    MODALSHOW : "modalShow",
    RESETJOBDATA : "resetJobData"
}

export  function getAction(type,value){
    var obj = {};
    obj.type = type;
    var type = valueOfTypes[type]; 

    if(type != undefined){
        if( type.constructor == Array){
            if(value.constructor == Object){
                var keys = Object.keys(value);
                for(var i = 0, len = keys.length; i < len; i++){
                    if(type.includes( keys[i] ) ){
                        obj[keys[i]] = value[keys[i]]; 
                    }
                }
            }else{
                for(var i = 0, len = type.length; i < len; i++){
                    obj[type[i]] = value;
                }
            }
        }else{
            obj[type] = value;
        }
    }

    return obj
}


/* export function setDay(value){
    return {
        selectedDay : value,
        type : SETDAY
    }
}

export function setJobData(value){
    return {
        jobData : value,
        type : SETJOBDATA
    }
}

export function setTime(value){
    return {
        inputedTime : value,
        type : SETTIME
    }
} */