import React, { Component } from 'react';
import listCss from './joblist.css';

class jobList extends Component {

  getRender(){
    if (this.props.jobData == null) {
      return ( <div>이 날짜의 일정이 없습니다</div>);
    }else{
      return(
        this.props.jobData.map((list, i)=> {
          return <li className={listCss.joblist}>{list.content}  {list.time}</li>;
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

export default jobList;
