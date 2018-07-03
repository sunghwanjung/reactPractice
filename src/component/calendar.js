import React, { Component } from 'react';
import Calendar from 'react-calendar';
import { connect } from 'react-redux';
import { getAction, SETJOBDATA, SETDAY, BUTTONDISABLE} from '../redux/actions'

class reactCalendar extends Component {

  constructor(props){
    super(props);

    this.onClickDay = this.onClickDay.bind(this);
  }

  onClickDay(value){
    var dateString = this.getDateText(value);
    var data = this.getDateSchedule(dateString);
    this.props.setJobData(data);
    this.props.setDate(dateString);
    this.props.setInputButtonDisable(false);
  }

  getDateText(value){
    return "" + value.getFullYear() +
           (value.getMonth() + 1 < 10 ? "0" + (value.getMonth() + 1) : value.getMonth()) + 
           (value.getDate() < 10 ? "0" + (value.getDate()) : value.getDate());
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


  render() {
    return (
        <Calendar onClickDay={this.onClickDay}/>
    );
  }
}

let mapDispatchToProps = (dispatch) => {
  return {
      setJobData : (value) => dispatch(getAction(SETJOBDATA, value)),
      setDate : (value) => dispatch(getAction(SETDAY, value)),
      setInputButtonDisable : (value) => dispatch(getAction(BUTTONDISABLE, {inputButton : value}))
  }
}
reactCalendar = connect(undefined, mapDispatchToProps)(reactCalendar);

export default reactCalendar;
