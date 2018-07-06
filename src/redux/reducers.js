//import rAction from './actions'; rAction.SETDAY가 안먹힘 rAction.default.SETDAY로 찾음
import {SETDAY,SETJOBDATA,ADDJOBDATA,BUTTONDISABLE,MODALTYPE,MODALSHOW } from './actions';
import {combineReducers} from 'redux';

const dayManageInitialState = {
    selectedDay : "",
    jobData : [],
    inputButton : true,
    updateButton : true,
    popupType : "insert",
    modalShow : "none",
}

const dayInfo = (state = dayManageInitialState, action) =>{
    switch (action.type) {
        case SETDAY:
        case SETJOBDATA:   
        case BUTTONDISABLE :
        case MODALTYPE :
        case MODALSHOW :
            state = updateObject(action, state);
            return state;
        case ADDJOBDATA :
            var newState = Object.assign({}, state);

            var newJobData = state.jobData.slice();
            newJobData.push(action.jobItem);

            newJobData.sort((a,b)=>{
                var time1 = parseInt(a.time);
                var time2 = parseInt(b.time);
                if (time1 < time2) {
                    return -1;
                  }
                  if (time1 > time2) {
                    return 1;
                  }
                  return 0;
            });

            newState.jobData = newJobData;

            return newState;
        default:
            return state;
    }
}

const updateObject = (action, state) =>{
    try{
        var keys = Object.keys(action);
        
        if(keys.length > 0){
            var obj = {};

            for(var i = 1, len = keys.length; i < len; i++){
                obj[keys[i]] = action[keys[i]];//0번의 key는 'type'이다
            }
            return Object.assign({}, state, obj);
        }
    }catch(e){
        console.error("dayInfo reducer에서 에러 발생. \n type은 " + action.type);
    }
}

const reducers = combineReducers({
    dayInfo
})


export default reducers; 