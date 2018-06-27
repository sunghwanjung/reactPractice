import React, { Component } from 'react';
import Calendar from 'react-calendar';
import 'Calendar.css';

class reactCalendar extends Component {

  render() {
    return (
        <Calendar onClickDay={this.props.calendarClick.bind(this)}/>
    );
  }
}

export default reactCalendar;
