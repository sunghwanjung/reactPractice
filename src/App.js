import React, { Component } from 'react';
import Calendar from './component/calendar';
import JobList from './component/joblist';
import JobButtons from './component/jobbuttons';
import Modal from './component/modalpopup';

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      data : null,
      modalShow : "none"
    }
  }

  buttonClickEvent(event){
    switch (event.target.id) {
      case "jobadd":
        var inputs = document.getElementsByName("timeinput");
        for(var i = 0, len = inputs.length; i < len; i++){
          inputs[i].value = "";
        }
        this.setState({popupType : "insert"});
        break;
      case "jobupdate":
        this.setState({popupType : "update"});
        break;
    }

    this.setModalDisplay("block");
  }

  setModalDisplay(state){
    this.setState({modalShow : state});
  }

  render() {
    return (
      <div >
        <Calendar className="calendar" />
        <JobButtons buttonClickEvent={this.buttonClickEvent.bind(this)}/>
        <JobList/>
        <Modal ref={this.modal} modalShow={this.state.modalShow} popupType={this.state.popupType}
              displayModal={()=>{ this.setModalDisplay("none"); }}/>
      </div>
    );
  }
}

export default App;
