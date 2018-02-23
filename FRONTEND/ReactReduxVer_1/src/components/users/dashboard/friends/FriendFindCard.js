import React, { Component, PropTypes } from 'react';

import { connect } from 'react-redux';
import { sendFriendRequest, fetchFriends } from 'actions/users/FriendActions';

import { Button } from 'reactstrap';
import { NavLink } from 'react-router-dom';

class FriendFindCard extends Component {
  constructor(){
    super();

    this.onSendFriendRequest = this.onSendFriendRequest.bind(this);
    
    this.state = {
      update: false
    }
  }

  onSendFriendRequest() {
    if (confirm('친구 요청을 전송하시겠습니까?')) {
      this.props.sendFriendRequest(this.props.friend.idx)
        .then(() => {
          this.props.fetchFriends();
        });
    }
  }

  renderButton() {
    return (
      <div>
        <Button className="friend-request-button accept" 
          onClick={this.onSendFriendRequest} 
          style={{"top": "18px !important", "left": "450px !important"}}>
          메시지 전송
        </Button>
        {(this.props.type === 'list') 
          ? 
          <Button className="friend-request-button cancel" onClick={this.onSendFriendRequest} >
            친구 요청 전송
          </Button> 
          : ''
        }
        {(this.props.type === 'send')
          ? '' : ''
        }
        {(this.props.type === 'find')
          ?
          <NavLink 
            to={`/users/friends/${this.props.friend.idx}`}
            onClick={()=> props.history.pushState(null, null, `/users/friends/${this.props.friend.idx}`)}>
            <Button className="friend-request-button cancel">
              프로필 보기
            </Button> 
          </NavLink>
          : ''
        }     
      </div>
    )
  }

  render() {
    return (
      <div className="friend-request-card-wrapper">
        <div className="friend-request-card-avatar-wrapper">
          <img className="avatar-image" src={(this.props.friend.avatar) !== null 
            ? this.props.friend.avatar : "/../public/img/avatar.png"}/>
        </div>
        <p className="friend-request-card-id">{this.props.friend.id}</p>
        
        {this.renderButton()}
      </div>
    )
  }
}

export default connect(null, 
  { sendFriendRequest, fetchFriends })(FriendFindCard);