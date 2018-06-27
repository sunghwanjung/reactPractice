import React, { Component } from 'react';
import Css from './jobbutton.css';

class jobButtons extends Component {

  render() {
    return (
      <div>
        <div className={Css.jobbuttonWrapper}>
          <button id="jobadd" onClick={this.props.buttonClickEvent} className={Css.jobbutton}>일정 입력</button>
          <button id="jobupdate" onClick={this.props.buttonClickEvent} className={Css.jobbutton}>일정 수정</button>  
        </div>
      </div>
    );
  }
}

export default jobButtons;
