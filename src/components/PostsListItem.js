import React, { Component } from "react";
import './PostsListItem.css';

class PostsListItem extends Component {

    render() {

        let currentPost = this.props.post;
        let date = new Date(parseInt(currentPost.datetime * 1000, 10)).toLocaleString();
        let mainImage ;

        if(currentPost.images) {

            if(currentPost.images[0]){
                mainImage = currentPost.images[0].link;
            }
            else{
                mainImage = 'No image';
            }
        }
        else {
            mainImage = currentPost.link;
        }

        return (
            <div key={currentPost.id} className={'post-item'}>
                <div className = "img1" style={ { backgroundImage: `url(${mainImage})` } }></div>
                <div className={'post-item-hover'}>
                    <h3>{currentPost.title}</h3>
                    <hr/>
                    <small>{date}</small>
                    <br/>
                    <span>{currentPost.comment_count} comments</span>
                    <br/>
                    <span>{currentPost.views} views</span>
                </div>
            </div>
        )
    };
}

export default PostsListItem;