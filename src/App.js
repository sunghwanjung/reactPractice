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

  setModalDisplay(state){
    this.setState({modalShow : state});
  }

  render() {
    return (
      <div >
        <Calendar className="calendar" />
        <JobButtons/>
        <JobList/>
        <Modal/>
      </div>
    );
  }
}

export default App;
