import React, { Component } from "react";
import { createStore } from "redux";
import { Provider } from "react-redux";
import Posts from "./Posts";
import './App.css'
let topicId = 2;
let pageNumber = 1;
let tagFilter = null;
let topicFilter = null;
let isloading = false;
// let request_url = 'https://api.imgur.com/3/topics/${topic}/time/1';

const url_post_list = 'https://api.imgur.com/3/topics/defaults';
const url_tag_list = 'https://api.imgur.com/3/tags';
// const url_posts = 'https://api.imgur.com/3/gallery/top/top/all/1';

const access_token = '116ebca7c18601ce49a84fefa9dc6255a0380312';
const client_id = '64e906336192044';

const getUrl = () => {
    if(tagFilter === null){
        return `https://api.imgur.com/3/topics/${topicId}/time/${pageNumber}`;
        // return 'https://api.imgur.com/3/gallery/top/top/all/' + pageNumber;
    }
    else{

        return 'https://api.imgur.com/3/gallery/t/' + tagFilter + '/top/all/' + pageNumber;
    }
};

const getUrlByTag = () =>{
    return 'https://api.imgur.com/3/gallery/t/' + tagFilter + '/top/all';
};

const getUrlPosts = (pageNumber = 1) =>{
    return 'https://api.imgur.com/3/gallery/top/top/all/' + pageNumber;
};

let getRequestUrl = () => {
    // return 'https://api.imgur.com/3/account/imburSol/album/DdzUa';
    // return 'https://api.imgur.com/3/gallery/imburSol/top'
    // return 'https://api.imgur.com/3/gallery/user/rising';

    return 'https://api.imgur.com/3/gallery/user/rising/all/1';
    //     return 'https://api.imgur.com/3/gallery/bGSpH/comments';

    // return 'https://api.imgur.com/3/account/imburSol/images';
    // return 'https://api.imgur.com/3/account/imburSol/submissions/1';
    // return 'https://api.imgur.com/3/account/imburSol/favorites/1';
    //return `https://api.imgur.com/3/topics/${topicId}/time/${pageNumber}`;
};


let getInfo = (type, url, removeOldPosts = false) => {
    console.log(`%c send query ${type} `,  'color: white; background: brown');
    console.log('url = ' + url);
    // let auth = bearerAuth ? access_token : client_id;
    // let authType = !bearerAuth ? 'Bearer' : 'Client-ID';

    // if(removeOldPosts) store.dispatch({type: 'DELETE_ALL_POSTS'});

    fetch(url, {
        "async": true,
        "crossDomain": true,
        "method": "GET",
        "headers": {
            'Content-Type': 'application/json',
            'Authorization': 'Client-ID ' + client_id,
        }
    })
        .then((response) => response.json())
        .then((responseJson) => {
            let result = responseJson.data;

            if(type === 'CREATE_TAG_LIST') {
                result = responseJson.data.tags;
            }

            else if (type === 'SHOW_TAG'){
                result = responseJson.data.items;
            }

            else if(type === 'ADDING_PAGE' && !(tagFilter === null)){
                result = responseJson.data.items;
            }

            // if(topicFilter !== null){
            //     result = result.filter((item) =>  item.topic == topicFilter);
            // }
            if(type === 'SHOW_TOPIC'){
                tagFilter = null;

                console.log(`%c DELETE_TAG_LIST `,  'color: white; background: red');
                store.dispatch({type: 'DELETE_TAG_LIST'});
                console.log(`%c CREATE_NEW_TAG_LIST `,  'color: white; background: green');
                store.dispatch({type: 'CREATE_NEW_TAG_LIST', payload:result});
            }


            if(type === 'CREATE_POST_LIST'){
                console.log(`%c CREATE_NEW_TAG_LIST `,  'color: white; background: blue');
                store.dispatch({type: 'CREATE_NEW_TAG_LIST', payload:result});
            }

            if(type === 'ADDING_PAGE'){
                console.log(`%c UPDATE_TAG_LIST `,  'color: white; background: blue');
                store.dispatch({type: 'UPDATE_TAG_LIST', payload:result});
            }

            store.dispatch({type: type, payload:result});
            console.log(`%c ${type} `,  'color: white; background: blue');
            console.log(result)
        })
        .catch((error) => {
            console.error(error);
        });
};

getInfo('CREATE_TOPIC_LIST', url_post_list);
getInfo('CREATE_POST_LIST', getUrl());


let initialState = {
    'posts':[],
    'list':[],
    'tags':[]
};

let posts = (state = initialState, action) => {

    if (action.type === "CREATE_POST_LIST") {
        return {
            'posts': [...action.payload],
            'tags': state.tags,
            'list': state.list
        }
    }

    else if (action.type === "CREATE_TOPIC_LIST") {
        return {
            'posts': state.posts,
            'tags': state.tags,
            'list': [...action.payload]
        }
    }

    else if (action.type === "UPDATE_TAG_LIST") {

        let posts = action.payload;
        let obj = {};

        posts.forEach((post) => {
            post.tags.forEach((tag)=>{
                obj[tag.name] = '1';
            })
        });

        console.log(state.tags);
        console.log(Object.keys(obj));

        return {
            'posts': state.posts,
            'list': state.list,
            'tags': state.tags.concat(Object.keys(obj)).filter((v, i, a) => a.indexOf(v) === i)
        }
    }

    else if (action.type === "DELETE_TAG_LIST") {

        return {
            'posts': state.posts,
            'list': state.list,
            'tags': []
        }
    }

    else if (action.type === "CREATE_NEW_TAG_LIST") {

        let posts = action.payload;
        console.log(posts);
        let obj = {};

        posts.forEach((post) => {
            post.tags.forEach((tag)=>{
                obj[tag.name] = '1';
            })
        });

        console.log(Object.keys(obj));

        return {
            'posts': state.posts,
            'list': state.list,
            'tags': Object.keys(obj)
        }
    }

    else if (action.type === "SHOW_TOPIC") {
        console.log('show topic');
        console.log(action.payload);
        return {
            'posts': action.payload,
            'tags': state.tags,
            'list': state.list
        }
    }

    else if (action.type === "CHANGE_TOPIC") {
        console.log('change topic filter');
        console.log(action.payload);
        console.log(topicId);
        // showTopic(action.payload);
        // topicFilter = action.payload;
        topicId = action.payload;

        getInfo('SHOW_TOPIC', getUrl(), true);

        // let resPosts = state.posts.filter((post) =>  post.topic == action.payload);

        // console.log(resPosts);

        return {
            'posts': [],
            'tags': state.tags,
            'list': state.list
        }
    }

    // else if (action.type === "SHOW_TAG") {
    //     console.log('show tag');
    //     console.log(action.payload);
    //     return {
    //         'posts': action.payload,
    //         'tags': state.tags,
    //         'list': state.list
    //     }
    // }

    else if (action.type === "CHANGE_TAG") {
        console.log('change tag filter');
        // console.log(state.posts);
        tagFilter = action.payload;

        let postsFilter = [];
        state.posts.forEach((post) =>  {
            post.tags.forEach((tag) => {
                if(tag.name == action.payload){
                    postsFilter.push(post);
                }
            });
        });

        // getInfo('SHOW_TAG', getUrl());
        console.log(postsFilter);
        return {
            'tags': state.tags,
            'list': state.list,
            'posts': postsFilter,
        }
    }

    else if (action.type === "ADDING_PAGE") {
        console.log(`%c Add page `,  'color: white; background: pink');
        console.log(state.posts.concat(action.payload));

        return {
            'posts': state.posts.concat(action.payload),
            'tags': state.tags,
            'list': state.list
        }

    }


    else if (action.type === "GET_NEXT_PAGE") {
        isloading = true;
        console.log('GET_NEXT_PAGE');
        // setLoadingPage(true);
        pageNumber++;
        getInfo('ADDING_PAGE', getUrl());
        // getNextPage();
    }

    return state;
};

const store = createStore(posts);

const PostsMain = () => (
    <Provider store = {store} >
        <Posts isloading = {this.isloading}/>
    </Provider>
);

export default PostsMain;