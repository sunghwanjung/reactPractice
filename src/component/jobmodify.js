import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getAction, MODALSHOW, ADDJOBDATA, UPDATEJOBDATA, RESETJOBDATA} from '../redux/actions'
import JobAddCss from './jobmodify.css';

class jobmodify extends Component {

  constructor(props) {
    super(props);
    this.state = {
      hourFront : "",
      hourBack : "",
      minFront : "",
      minBack : "",
      content : "" 
    }
    this.dataToDB = this.dataToDB.bind(this);
    this.setContent = this.setContent.bind(this);
    this.inputKeydown = this.inputKeydown.bind(this);
  }

  inputKeydown(event){
    var prevent = true;
    var keycode = event.keyCode;
    if(keycode == 8 || keycode == 9 || keycode == 46) return;
    
    if( (48 <= keycode && keycode <= 57) ||
        (96 <= keycode && keycode <= 105) )  
        prevent = false;

    if(!prevent){

      switch(event.target.id){
        case "hourFront" :
          prevent = parseInt(event.key) > 2 ? true : false;
          break;
        case "hourBack" :
          prevent = parseInt(event.key) > 4 && document.getElementById("hourFront").value == 2 ? true : false;
          break;
        case "minFront" :
          prevent = parseInt(event.key) > 6 ? true : false;
          break;
        case "minBack" :
          prevent = parseInt(event.key) > 0 && document.getElementById("minBack").value == 6 ? true : false;
          break;
      }
    }

    if(prevent) event.preventDefault();
    if(!prevent){
      this.state[event.target.id] = event.key; 
    } 
  }

  dataToDB(event){
    var _self = this;
    var state = _self.state;
    var http = new XMLHttpRequest();
    var param = "day=" + _self.props.selectedDay + "&" +
                "time=" + _self.getTime() + "&" + 
                "content=" + state.content;

    var url;
    
    if(_self.props.popType == "insert"){
      url = "/insertjob";
    }else{
      url = "/updatejob";
      param += "&seq=" +  _self.props.job.seq;
    }
    
    http.open('POST', url , true);
    http.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    http.onreadystatechange = function() {
      if(http.readyState == 4 && http.status == 200) {
        if(http.responseText == "0"){
          afterDBWork();
        }
      }
    }
    http.send(param);
    function afterDBWork(){
      _self.props.setModalShow("none");

      var time = state.hourFront + state.hourBack + state.minFront + state.minBack;
      if(_self.props.popType == "insert"){
        _self.props.addJobData({time : time, content: state.content})
      }else{
        _self.props.updateJobData({time : time, content: state.content, seq : _self.props.job.seq});
      }
     // _self.props.addJobData({time : state.hourFront + state.hourBack + state.minFront + state.minBack, content: state.content});
    }
  }

  getTime(){
    if(this.state.hourFront == ""){
      return this.props.job.time;
    }else{
      var state = this.state;
      return state.hourFront + state.hourBack + state.minFront + state.minBack;
    }
  }

  setContent(event){
    this.state.content = event.target.value;
  }

  //calendar.js에서 setDate가 호출될 때마다 리렌더링이 일어나서 이 이벤트를 탐
  setData(){
    if(this.props.popType == "update"){
      this.setSelectedData();
    }else{
      this.resetData();
    }
  }

  setSelectedData(){
    var job = this.props.job;
    var time = job.time;
    var state = this.state;
    var hourFront = time.substring(0,1);
    var hourBack =  time.substring(1,2);
    var minFront = time.substring(2,3);
    var minBack = time.substring(3);

    this._content.value = job.content;
    this._hourFront.value = hourFront;
    this._hourBack.value = hourBack;
    this._minFront.value = minFront;
    this._minBack.value = minBack;

    state.hourFront = hourFront;
    state.hourBack = hourBack;
    state.minFront = minFront;
    state.minBack = minBack;
  }

  resetData(){
    if(this._content == null) return;
    var _resetJobDataState = this.props.resetJobDataState;

    if(_resetJobDataState){
      this.props.resetJobData(false);
      this._content.value = "";
      this._hourFront.value = "";
      this._hourBack.value = "";
      this._minFront.value = "";
      this._minBack.value = "";
    }
  }

  render() {
    
    return (
        <div>
          {this.setData()}
          <div style={{display:"none"}} ></div>
          <table className={JobAddCss.jobaddtable}>
            <tbody>
              <tr>
                <th>시간</th>
                <td>
                    <div>
                    <input type="text" id="hourFront" name="timeinput" className={JobAddCss.addtime} 
                      onKeyUp={this.inputKeydown} maxLength="1" ref={input=>this._hourFront = input} />
                    <input type="text" id="hourBack" name="timeinput" className={JobAddCss.addtime} 
                      onKeyDown={this.inputKeydown} maxLength="1" ref={input=>this._hourBack = input} /> 
                    <div className={JobAddCss.timemiddel}> : </div>
                    <input type="text" id="minFront" name="timeinput" className={JobAddCss.addtime} 
                      onKeyDown={this.inputKeydown} maxLength="1" ref={input=>this._minFront = input} />
                    <input type="text" id="minBack" name="timeinput" className={JobAddCss.addtime} 
                      onKeyDown={this.inputKeydown} maxLength="1" ref={input=>this._minBack = input} />

                    {/*<div className={JobAddCss.timecontrol}>
                      <div className={JobAddCss.plus}>+</div>
                      <div className={JobAddCss.minus}>-</div>
                      </div>*/}
                  </div>
                </td>
              </tr>
            </tbody>
            <tbody>
              <tr>
                <th>내용</th>
                <td><textarea onBlur={this.setContent} name="contentinput" ref={input=>this._content = input} /></td>
              </tr>
              </tbody>
            </table>
          <div>
            <button className={JobAddCss.popupbutton} onClick={this.dataToDB}> 입력 </button>
          </div>
        </div>
    );
  }
}

let mapStateTopProp = (state) =>{
  return {
    selectedDay : state.dayInfo.selectedDay,
    addtime : state.dayInfo.addtime,
    job : state.dayInfo.job,
    resetJobDataState : state.dayInfo.resetJobData
  };
}

let mapDispatchToProps = (dispatch) => {
  return {
      setModalShow : (value) => dispatch(getAction(MODALSHOW, value)),
      addJobData : (value) => dispatch(getAction( ADDJOBDATA, value)),
      updateJobData : (value) => dispatch(getAction(UPDATEJOBDATA, value)),
      resetJobData : (value) => dispatch(getAction(RESETJOBDATA, value)),
  }
}


jobmodify = connect(mapStateTopProp, mapDispatchToProps)(jobmodify);

export default jobmodify;
