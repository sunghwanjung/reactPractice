import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getAction, MODALSHOW} from '../redux/actions'
import modalCss from './modalpopup.css';
import AddPopup from './jobadd';

class jobList extends Component {

    constructor(props) {
        super(props);

        this.state = {
        }
    }

  prevent(event){
    //event.preventDefault();
    
      //return;
  }  

  getAddPopup(){
    if(this.props.popupType == "insert"){
      return(<AddPopup/>);
    }else if(this.props.popupType == "update"){
      return(<div>수정은 준비중</div>);  
    }
  }
  
  render() {
    return (
      <div style={{ display : this.props.modalShow}}>
        <div className={modalCss.popupwrapper}>
        <div>
            <span className={modalCss.closeBtn}
                onClick={ () => this.props.setModalShow( "none" ) }>
                X
            </span>
        </div>
         {this.getAddPopup()}
        </div>
        <div onClick={this.prevent} className={modalCss.modalpopup} ></div>
      </div>
    );
  }
}

let mapStateTopProp = (state) =>{
  return {
    popupType : state.dayInfo.popupType,
    modalShow : state.dayInfo.modalShow,
  };
}

let mapDispatchToProps = (dispatch) => {
  return {
      setModalShow : (value) => dispatch(getAction(MODALSHOW, value)),
  }
}

jobList = connect(mapStateTopProp, mapDispatchToProps)(jobList);

export default jobList;