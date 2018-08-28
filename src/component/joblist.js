import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getAction, BUTTONDISABLE, SETJOB} from '../redux/actions'
import listCss from './joblist.css';

class jobList extends Component {

  constructor(props) {
    super(props);
    this.state = {
      focuseLi : ""
    }
    this.listClick = this.listClick.bind(this);
  }

  getRender(){
    var _jobData = this.props.jobData; 
    if (_jobData.length == 0) {
      return ( <div>이 날짜의 일정이 없습니다</div>);
    }else{
      return(
        this.props.jobData.map((list, i)=> {
          //map으로 element를 리턴할 때 key라는 유니크한 값을 세팅해줘야 오류가 안난다.
          return <li className={listCss.joblist} number={i} key={i}>{list.time.substring(0,2)} : {list.time.substring(2,4)} {list.content}  </li>;
        })
      )
    }
  }

  listClick(event){
    var target = event.target;

    this.focuseChange(target);
    //joblistClicked
    if(target.tagName == "LI"){
      this.props.setJob(this.props.jobData[ target.getAttribute("number") ] );
      this.props.setInputButtonDisable(false);
    }
  }

  focuseChange(target){
    if(this.focuseLi != null)
      this.focuseLi.style.background = "";
    target.style.background = "lavender";
    this.focuseLi = target;
  }

  render() {
    return (
      <div>
        <ul onClick={this.listClick}>
        {this.getRender() }
      </ul>
      </div>
    );
  }
}

let mapStateTopProp = (state) =>{
  return {
    jobData : state.dayInfo.jobData
  };
}

let mapDispatchToProps = (dispatch) => {
  return {
      setInputButtonDisable : (value) => dispatch(getAction(BUTTONDISABLE, {updateButton : value})),
      setJob : (value) => dispatch(getAction(SETJOB, value ))
  }
}

jobList = connect(mapStateTopProp, mapDispatchToProps)(jobList);

export default jobList;
