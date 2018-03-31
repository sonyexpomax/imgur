import React, { Component } from "react";
import Spinner from 'react-spinkit';
import './InfiniteScroll.css';
class InfiniteScroll extends Component {

    constructor() {
        super();
        this.state = {
            isLoading: false
        };
    }

    getInitialState () {
        return ({data: [], requestSent: false});
    };

    componentDidMount(){
        console.log('did');
        window.addEventListener('scroll', this.handleOnScroll);
        // this.initFakeData();
    };

    componentWillMount(){
        console.log('will');
        window.addEventListener('scroll', this.handleOnScroll);
        // this.initFakeData();
    };

    componentWillUnmount(){
        console.log('unmount');
        window.removeEventListener('scroll', this.handleOnScroll);
    };

    componentWillUpdate(){
        console.log('will update');
    }

    componentDidUpdate(){
        console.log('did update');

    }

    handleOnScroll = () => {
        let elem = document.documentElement;
        let body = document.body;

        let scrollTop = (elem && elem.scrollTop) || body.scrollTop;
        let scrollHeight = (elem && elem.scrollHeight) || body.scrollHeight;
        let clientHeight = elem.clientHeight || window.innerHeight;
        let scrolledToBottom = (Math.ceil(scrollTop + clientHeight) + 100) >= scrollHeight;

        if (scrolledToBottom && !this.state.isLoading) {
            this.state.isLoading = true;
            this.props.nextPage();
        }
    };

    render = () => {
        console.log('render');
        // this.setState({isLoading: false});
        // if(this.props.isLoading){
        //     return(
        //         <div>
        //             {this.props.children}
        //             <Spinner name="ball-grid-pulse" color="steelblue"/>
        //         </div>
        //     )
        // }
        // else {
        //     return(
        //         <div>
        //
        //             {this.props.children}
        //         </div>
        //     )
        // }

        return(
            <div>



                {this.props.children}
                <Spinner name="ball-grid-pulse" color="steelblue" className={'spin'}/>
            </div>
        )
    }
}

export default InfiniteScroll;