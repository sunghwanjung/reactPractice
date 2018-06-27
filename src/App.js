import React, { Component } from 'react';
//import Calendar from './component/calendar';
import Calendar from 'react-calendar';
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
    this.modal = React.createRef();
  }

  onClickDay(value){
    value = this.getDateText(value);
    var data = this.getDateSchedule(value);
    this.setState({data : data});
  }

  getDateText(value){
    return "" + value.getFullYear() +
           (value.getMonth() + 1 < 10 ? "0" + (value.getMonth() + 1) : value.getMonth()) + 
           (value.getDate() + 1 < 10 ? "0" + (value.getDate()) : value.getDate());
  }

  getDateSchedule(value){
    var result = null;
    var http = new XMLHttpRequest();
    http.open('GET', "/test", false);
    http.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    http.onreadystatechange = function() {
      if(http.readyState == 4 && http.status == 200) {
        result = JSON.parse( http.responseText );
      }
    }
    http.send();
    
    return result;
  }

  buttonClickEvent(event){
    switch (event.target.id) {
      case "jobadd":
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
        <Calendar className="calendar" onClickDay={this.onClickDay.bind(this)} />
        <JobButtons buttonClickEvent={this.buttonClickEvent.bind(this)}/>
        <JobList jobData={this.state.data}/>
        <Modal ref={this.modal} modalShow={this.state.modalShow} popupType={this.state.popupType}
              displayModal={()=>{ this.setModalDisplay("none"); }}/>
      </div>
    );
  }
}

export default App;
