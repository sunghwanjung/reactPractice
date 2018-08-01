import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getAction, MODALSHOW, ADDJOBDATA,RESETJOBDATA} from '../redux/actions'
import JobAddCss from './jobadd.css';

class JobAdd extends Component {

  constructor(props) {
    super(props);
    this.state = {
      hourFront : "",
      hourBack : "",
      minFront : "",
      minBack : "",
      content : "" 
    }
    this.insertjob = this.insertjob.bind(this);
    this.setContent = this.setContent.bind(this);
}

  inputKeydown(event){
    var prevent = true;
    if(event.keyCode == 8) return;
    
    if( (48 <= event.keyCode && event.keyCode <= 57) ||
        (96 <= event.keyCode && event.keyCode <= 105) )  
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
      var state = {};
      state[event.target.id] = event.key
      this.setState(state);
    } 
  }

  insertjob(event){
    var _self = this;
    var state = this.state;
    var http = new XMLHttpRequest();
    var param = "day=" + this.props.selectedDay + "&" +
                "time=" + state.hourFront + state.hourBack + state.minFront + state.minBack + "&" + 
                "content=" + this.state.content;
    
    http.open('POST', "/insertjob", true);
    http.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    http.onreadystatechange = function() {
      if(http.readyState == 4 && http.status == 200) {
        if(http.responseText == "0"){
          afteradd();
        }
      }
    }
    http.send(param);
    function afteradd(){
      _self.props.setModalShow("none", {time : state.hourFront + state.hourBack + state.minFront + state.minBack, content: state.content});
     // _self.props.addJobData({time : state.hourFront + state.hourBack + state.minFront + state.minBack, content: state.content});
    }
  }

  setContent(event){
    this.state.content = event.target.value;
  }

  setJobDatas(){
    var _addtime = this.props.addtime; 
    //this.setState(_addtime);
  }

  //calendar.js에서 setDate가 호출될 때마다 리렌더링이 일어나서 이 이벤트를 탐
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
          {this.resetData()}
          <div style={{display:"none"}} ></div>
          <table className={JobAddCss.jobaddtable}>
            <tbody>
              <tr>
                <th>시간</th>
                <td>
                    <div>
                    <input type="text" id="hourFront" name="timeinput" className={JobAddCss.addtime} 
                      onKeyDown={this.inputKeydown.bind(this)} maxLength="1" ref={input=>this._hourFront = input} />
                    <input type="text" id="hourBack" name="timeinput" className={JobAddCss.addtime} 
                      onKeyDown={this.inputKeydown.bind(this)} maxLength="1" ref={input=>this._hourBack = input} /> 
                    <div className={JobAddCss.timemiddel}> : </div>
                    <input type="text" id="minFront" name="timeinput" className={JobAddCss.addtime} 
                      onKeyDown={this.inputKeydown.bind(this)} maxLength="1" ref={input=>this._minFront = input} />
                    <input type="text" id="minBack" name="timeinput" className={JobAddCss.addtime} 
                      onKeyDown={this.inputKeydown.bind(this)} maxLength="1" ref={input=>this._minBack = input} />

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
            <button className={JobAddCss.popupbutton} onClick={this.insertjob}> 입력 </button>
          </div>
        </div>
    );
  }
}

let mapStateTopProp = (state) =>{
  return {
    selectedDay : state.dayInfo.selectedDay,
    addtime : state.dayInfo.addtime,
    resetJobDataState : state.dayInfo.resetJobData
  };
}

let mapDispatchToProps = (dispatch) => {
  return {
      setModalShow : (value, value2) =>{
        dispatch(getAction(MODALSHOW, value));
        dispatch(getAction( ADDJOBDATA, value2));
      } ,
      addJobData : (value) => dispacth(getAction( ADDJOBDATA, value)),
      resetJobData : (value) => dispatch(getAction(RESETJOBDATA, value)),
  }
}


JobAdd = connect(mapStateTopProp, mapDispatchToProps)(JobAdd);

export default JobAdd;
