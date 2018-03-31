import React, { Component } from "react";
import { createStore } from "redux";
import { Provider } from "react-redux";
import Posts from "./Posts";
import './App.css'

let pageNumber = 1;
let tagFilter = null;

const url_tag_list = 'https://api.imgur.com/3/tags';
const client_id = '64e906336192044';

const getUrl = () => {
    if(tagFilter === null){
        return `https://api.imgur.com/3/gallery/top/top/all`;
    }
    else{
        return `https://api.imgur.com/3/gallery/t/${tagFilter}/top/all/${pageNumber}`;
    }
};

let getInfo = (type, url) => {
    // console.log(`%c send query ${type} `,  'color: white; background: brown');
    // console.log('url = ' + url);

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
                store.dispatch({type: 'DELETE_POST_LIST'});
                result = responseJson.data.items;

            }

            else if(type === 'ADDING_PAGE' && !(tagFilter === null)){
                result = responseJson.data.items;
            }

            if(type === 'ADDING_PAGE'){
                // console.log(`%c UPDATE_TAG_LIST `,  'color: white; background: blue');
                store.dispatch({type: 'UPDATE_TAG_LIST', payload:result});
            }

            store.dispatch({type: type, payload:result});
            // console.log(`%c ${type} `,  'color: white; background: blue');
            // console.log(result)
        })
        .catch((error) => {
            console.error(error);
        });
};

getInfo('CREATE_TAG_LIST', url_tag_list);
getInfo('CREATE_POST_LIST', getUrl());


let initialState = {
    'posts':[],
    'tags':[]
};

let posts = (state = initialState, action) => {

    if (action.type === "CREATE_POST_LIST") {
        return {
            'posts': [...action.payload.slice(30)],
            'tags': state.tags,
        }
    }

    if (action.type === "DELETE_POST_LIST") {
        return {
            'posts': [],
            'tags': state.tags,
        }
    }

    else if (action.type === "CREATE_TAG_LIST") {
        return {
            'posts': state.posts,
            'tags': [...action.payload]
        }
    }

    else if (action.type === "SHOW_TAG") {
        return {
            'posts': action.payload,
            'tags': state.tags,
        }
    }

    else if (action.type === "CHANGE_TAG") {
        tagFilter = action.payload;
        getInfo('SHOW_TAG', getUrl());
    }

    else if (action.type === "ADDING_PAGE") {

        return {
            'posts': state.posts.concat(action.payload.slice(30)),
            'tags': state.tags,
        }
    }

    else if (action.type === "GET_NEXT_PAGE") {
        pageNumber++;
        getInfo('ADDING_PAGE', getUrl());
    }

    return state;
};

const store = createStore(posts);

const PostsMain = () => (
    <Provider store = {store} >
        <Posts/>
    </Provider>
);

export default PostsMain;