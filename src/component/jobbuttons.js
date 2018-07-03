import React, { Component } from 'react';
import { connect } from 'react-redux';
import Css from './jobbutton.css';

class jobButtons extends Component {
  constructor(props){
    super(props);

  }
  render() {
    return (
      <div>
        <div className={Css.jobbuttonWrapper}>
          <button id="jobadd" onClick={this.props.buttonClickEvent} 
                  className={Css.jobbutton}
                  disabled={this.props.inputButton }>
              일정 입력
          </button>
          <button id="jobupdate" onClick={this.props.buttonClickEvent} 
                className={Css.jobbutton}  
                disabled={this.props.updateButton }>
              일정 수정
          </button>  
        </div>
      </div>
    );
  }
}

let mapStateTopProp = (state) =>{
  return {
    inputButton : state.dayInfo.inputButton,
    updateButton : state.dayInfo.updateButton
  };
}

jobButtons = connect(mapStateTopProp)(jobButtons);

export default jobButtons;
