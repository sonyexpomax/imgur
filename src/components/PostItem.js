import React, { Component } from "react";
import './PostItem.css'

class PostItem extends Component {

    constructor(){
        super();
        this.state = {
            comments: [],
            post: {},
            id: null
        };
        this.CLIENT_ID = '64e906336192044';
    }

    getInfo = (stateVar, url) => {
        fetch(url, {
            "async": true,
            "crossDomain": true,
            "method": "GET",
            "headers": {
                "Authorization": "Client-ID " + this.CLIENT_ID
            }
        })
            .then((response) => response.json())
            .then((responseJson) => {
                this.setState({[stateVar]: responseJson.data});
                console.log(`%c ${stateVar} `,  'color: white; background: green');
                console.log(responseJson.data)
            })
            .catch((error) => {
                console.error(error);
            });
    };

    componentWillMount() {
        const URL_POST = 'https://api.imgur.com/3/gallery/'+ this.props.match.params.postId;
        const URL_COMMENTS = 'https://api.imgur.com/3/gallery/'+ this.props.match.params.postId +'/comments';

        this.setState({id: this.props.match.params.postId});
        this.getInfo('post', URL_POST );
        this.getInfo('comments', URL_COMMENTS);
    }

    render() {
        let date = new Date(parseInt(this.state.post.datetime * 1000, 10)).toLocaleString();
        // let title = this.state.post.title ? this.state.post.title : 'No title';
        let images;
        let comments;
        let tags;
        let tagsCount = 0;

        if(this.state.post.tags && this.state.post.tags[0]){
            tags = this.state.post.tags.map((item) => (
                <span key={item.id}>{item.name}</span>
            ));
            tagsCount = this.state.post.tags.length;
        }

        if(this.state.post.images){
            images = this.state.post.images.map((item) => (
                <img key={item.id} src={item.link} alt={item.link}/>
            ))
        }
        else {
            images = <img src={this.state.post.link} alt={this.state.post.link}/>;

        }

        if(this.state.comments){
            console.log(this.state.comments);
            comments = this.state.comments.map((item) => (
                <li key={item.id}>
                    <h4>{item.author}</h4>
                    <small>{new Date(parseInt(item.datetime * 1000, 10)).toLocaleString()}</small>
                    <p>{item.comment}</p>
                 </li>
            ))
        }

        return (
            <div className={'post-current'}>
                <h2>{this.state.post.title}</h2>
                <small>{date}</small>
                {images}
                <h3>Tags ({tagsCount})</h3>
                {tags}
                <h3>Comments ({this.state.comments.length})</h3>
                <ul>{comments}</ul>
            </div>
        )
    };
}

export default PostItem;
