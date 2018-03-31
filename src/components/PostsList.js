import React, { Component } from "react";
import { Link } from "react-router-dom";
import PostsListItem from './PostsListItem';
import PostsFilter from './PostsFilter';
import Spinner from 'react-spinkit';
import InfiniteScroll from 'react-infinite-scroller';
import './PostsList.css';

class PostsList extends Component {

    constructor() {
        super();
        this.state = {
            isLoading: false
        };
    }

    componentWillMount(){
        this.setState({isLoading: false});
    };

    tagHandler = (id) => {
        this.props.changeTag(id);
    };

    render() {

         setTimeout(()=>{
             this.setState({isLoading: true});
    },1000);
        return (
            <div className={'post-list'}>
                <PostsFilter onChangeTag={this.tagHandler} testStore = {this.props.testStore} />
                <h1>Posts</h1>
                <InfiniteScroll
                    pageStart={0}
                    loadMore={this.props.nextPage}
                    hasMore={this.state.isLoading}
                    loader={<Spinner name="ball-grid-pulse" color="steelblue" className={'spin'}/>}
                >
                    {
                        this.props.testStore.posts.map((item) => {
                            return(
                                <Link className={'link-item'} to={`/posts/${item.id}`} key={Math.random() +'link-' + item.id}>
                                    <PostsListItem key={Math.random() + 'item-' + item.id} post={item} itemId={item.id}/>
                                </Link>
                            )
                        })
                    }
                </InfiniteScroll>
            </div>
        )
    }
}

export default PostsList;