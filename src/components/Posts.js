import React, { Component } from "react";
import { BrowserRouter as Router, Route} from "react-router-dom";
import { connect } from 'react-redux';
import PostItem from './PostItem'
import PostsList from './PostsList';
import './Posts.css'

class Posts extends Component {

    constructor() {
        super();
        this.state = {
            posts: [],
        };
    }

    filterTag = (id) => {
        this.props.changeTag(id);
    };

    getNextPage = () => {
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
        changeTag: (id) => {
            dispatch({type: 'CHANGE_TAG', payload: id})
        },
        nextPage: () => {
            dispatch({type: 'GET_NEXT_PAGE'})
        },
    })
)(Posts);
