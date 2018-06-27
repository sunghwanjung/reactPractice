import React, { Component } from 'react';
import JobAddCss from './jobadd.css';

class JobAdd extends Component {
  inputKeyup(event){

  }

  controlHourFront(){

  }

  controlHourBack(){

  }

  controlMinFront(){

  }

  controlMinBack(){

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
                    <input type="text" name="hour-front" className={JobAddCss.addtime} keyup={this.inputKeyup}/>
                    <input type="text" name="hour-back" className={JobAddCss.addtime} keyup={this.inputKeyup}/> 
                    <div className={JobAddCss.timemiddel}> : </div>
                    <input type="text" name="min-front" className={JobAddCss.addtime} keyup={this.inputKeyup}/>
                    <input type="text" name="min-back" className={JobAddCss.addtime} keyup={this.inputKeyup}/>

                    <div className={JobAddCss.timecontrol}>
                      <div className={JobAddCss.plus}>+</div>
                      <div className={JobAddCss.minus}>-</div>
                    </div>
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
            <button className={JobAddCss.popupbutton}> 입력 </button>
          </div>
        </div>
    );
  }
}

export default JobAdd;
