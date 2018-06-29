import action from './actions';
import {combineReducers, } from 'redux';

const dayManageInitialState = {
    selectedDay : "",
    jobData : "",
}

const dayInfo = (state = dayManageInitialState, action) =>{
    
    var keys = Object.keys(action);
    
    if(keys.length > 0){
        var obj = {};

        for(var i = 1, len = keys.length; i < len; i++){
            obj[keys[i]] = action[keys[i]];//0번의 key는 'type'이다
        }
        
        return Object.assign({}, state, obj);
    }else{
        return state;
    }
    
    /* switch (action.type) {
        case SETDAY:
            return Object.assign({}, state, {
                selectedDay : action.selectedDay
            });
        case SETJOBDATA:
            return Object.assign({}, state, {
                jobData : action.jobData
            });
        default:
            return state;
    } */
}

const reducers = combineReducers({
    dayInfo
})


export default reducers; 