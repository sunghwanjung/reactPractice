import React, { Component } from 'react';
import { connect } from 'react-redux';
import listCss from './joblist.css';

class jobList extends Component {

  getRender(){
    var _jobData = this.props.jobData; 
    if (_jobData.length == 0) {
      return ( <div>이 날짜의 일정이 없습니다</div>);
    }else{
      return(
        this.props.jobData.map((list, i)=> {
          //map으로 element를 리턴할 때 key라는 유니크한 값을 세팅해줘야 오류가 안난다.
          return <li className={listCss.joblist} key={i}>{list.time.substring(0,2)} : {list.time.substring(2,4)} {list.content}  </li>;
        })
      )
    }
  }
  render() {
    return (
      <div>
        <ul>
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

jobList = connect(mapStateTopProp)(jobList);

export default jobList;
