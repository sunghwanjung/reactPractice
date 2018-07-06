import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getAction, MODALTYPE, MODALSHOW} from '../redux/actions'
import Css from './jobbutton.css';

class jobButtons extends Component {
  constructor(props){
    super(props);

    this.buttonClickEvent = this.buttonClickEvent.bind(this);
  }

  buttonClickEvent(event){
    switch (event.target.id) {
      case "jobadd":
        var inputs = document.getElementsByName("timeinput");
        for(var i = 0, len = inputs.length; i < len; i++){
          inputs[i].value = "";
        }
        document.getElementsByName("contentinput")[0].value = "";
        this.props.setModalType("insert");
        break;
      case "jobupdate":
        this.props.setModalType("update");
        break;
    }

    this.props.setModalShow("block");
  }

  render() {
    return (
      <div>
        <div className={Css.jobbuttonWrapper}>
          <button id="jobadd" onClick={this.buttonClickEvent} 
                  className={Css.jobbutton}
                  disabled={this.props.inputButton }>
              일정 입력
          </button>
          <button id="jobupdate" onClick={this.buttonClickEvent} 
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

let mapDispatchToProps = (dispatch) => {
  return {
      setModalType : (value) => dispatch(getAction(MODALTYPE, value)),
      setModalShow : (value) => dispatch(getAction(MODALSHOW, value)),
  }
}

jobButtons = connect(mapStateTopProp, mapDispatchToProps)(jobButtons);


export default jobButtons;
