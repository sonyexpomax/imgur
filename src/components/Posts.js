import React, { Component } from "react";
import { BrowserRouter as Router, Route} from "react-router-dom";
import { connect } from 'react-redux';

import PostItem from './PostItem'
import PostsList from './PostsList';
import './Posts.css'

//
// const album_id = 'DdzUa';
// const api_key = '64e906336192044';
// const request_url = 'https://api.imgur.com/3/topics/1';
// const request_url2 = 'https://api.imgur.com/3/album/' + album_id;

// const request_url = 'https://api.imgur.com/3/topics/defaults';



class Posts extends Component {

    constructor() {
        super();
        this.state = {
            posts: [],
        };
    }

    filterTopic = (id) => {
        this.props.changeTopic(id);
    };
    filterTag = (id) => {
        this.props.changeTag(id);
    };

    getNextPage = () => {
        console.log('next Page');
        this.props.nextPage();
    };

    render () {
        let url = (this.props.match) ? this.props.match.url : '';
        return (
            <Router>
            <div className={'posts-block'}>
                <Route exact path={`${url}/posts`} render={() => (
                    <PostsList
                        testStore={this.props.testStore}
                        changeTopic={this.filterTopic}
                        changeTag={this.filterTag}
                        nextPage = {this.getNextPage}
                    />
                )}/>
                <Route path={`${url}/posts/:postId`} component={PostItem}/>
             </div>
            </Router>
        );
    }
}
export default connect(
    state => ({
        testStore: state
    }),
    dispatch => ({
        changeTopic: (id) => {
            dispatch({type: 'CHANGE_TOPIC', payload: id})
        },
        changeTag: (id) => {
            dispatch({type: 'CHANGE_TAG', payload: id})
        },
        nextPage: () => {
            dispatch({type: 'GET_NEXT_PAGE'})
        },
    })
)(Posts);
