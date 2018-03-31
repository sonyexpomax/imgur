import React, { Component } from "react";
import { Link } from "react-router-dom";
import PostsListItem from './PostsListItem';
import PostsFilter from './PostsFilter';
// import InfiniteScroll from 'react-infinite-scroll-component';

import Spinner from 'react-spinkit';
// import InfiniteScroll from './InfiniteScroll';
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
        this.state.isLoading = true;

    };

    componentDidMount(){



    };

    topicHandler = (id) => {
        this.props.changeTopic(id);
    };
    tagHandler = (id) => {
        this.props.changeTag(id);
    };

    render() {
        // let imageId;
    //      setTimeout(()=>{
    //     this.state.isLoading = true
    // },500)
        return (
            <div className={'post-list'}>
                <PostsFilter onChangeTopic={this.topicHandler} onChangeTag={this.tagHandler} testStore = {this.props.testStore} />
                <h1>Posts</h1>
                <InfiniteScroll
                    pageStart={0}
                    loadMore={this.props.nextPage}
                    hasMore={this.state.isLoading}
                    loader={<Spinner name="ball-grid-pulse" color="steelblue" className={'spin'}/>}
                >

                {/*<InfiniteScroll */}
                    {/*nextPage = {this.props.nextPage} */}
                    {/*isLoading={this.props.isLoadingNextPage}*/}
                {/*>*/}
                {
                    this.props.testStore.posts.map((item) => {
                        // {imageId = (item.images) ? item.images[0].id : item.link}
                        return(
                        <Link className={'link-item'} to={`/posts/${item.id}`} key={'link-' + item.id}>
                            <PostsListItem key={'item-' + item.id} post={item} itemId={item.id}/>
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