import React, {Component} from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {Button} from 'react-bootstrap';
import {getSteps, getIngredients, requestUser, updateComment, getComments} from './../../../ducks/reducer';
import './CommentsTile.css';


class CommentsTile extends Component {
    constructor(props) {
        super(props);

    }

    render() {
        return (
            <div className="commentContainer" >
                <div className="usernameContainer" >
                    <span>{this.props.username}:</span>

                </div>
                <hr  className="nameContentDivider" />
                <div className="commentContent" >
                    <p>
                        {this.props.content}
                    </p>
                </div>
                
            </div>
        )
    }
}

export default CommentsTile;