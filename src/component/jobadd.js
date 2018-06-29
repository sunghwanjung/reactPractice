import React, { Component } from 'react';
import JobAddCss from './jobadd.css';

class JobAdd extends Component {

  constructor(props) {
    super(props);

    this.state = {
      hourFront : "",
      hourBack : "",
      minFront : "",
      minBack : ""
    }
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
    var result = null;
    var http = new XMLHttpRequest();
    
    http.open('POST', "/insertjob", false);
    http.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    http.onreadystatechange = function() {
      if(http.readyState == 4 && http.status == 200) {
        result = JSON.parse( http.responseText );
      }
    }
    http.send();
    
    return result;
  }

  render() {
    
    return (
        <div>
          <table className={JobAddCss.jobaddtable}>
            <tbody>
              <tr>
                <th>시간</th>
                <td>
                    <div>
                    <input type="text" id="hourFront" name="timeinput" className={JobAddCss.addtime} onKeyDown={this.inputKeydown.bind(this)} maxLength="1"/>
                    <input type="text" id="hourBack" name="timeinput" className={JobAddCss.addtime} onKeyDown={this.inputKeydown.bind(this)} maxLength="1"/> 
                    <div className={JobAddCss.timemiddel}> : </div>
                    <input type="text" id="minFront" name="timeinput" className={JobAddCss.addtime} onKeyDown={this.inputKeydown.bind(this)} maxLength="1"/>
                    <input type="text" id="minBack" name="timeinput" className={JobAddCss.addtime} onKeyDown={this.inputKeydown.bind(this)} maxLength="1"/>

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
                <td><textarea/></td>
              </tr>
              </tbody>
            </table>
          <div>
            <button className={JobAddCss.popupbutton} onClick={insertjob}> 입력 </button>
          </div>
        </div>
    );
  }
}

export default JobAdd;
