import React, { Component } from 'react';
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
      return(<AddPopup timeData="init"/>);
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
                onClick={this.props.displayModal}>
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

export default jobList;