import React, { Component } from "react";
import './PostsFilter.css';

class PostsFilter extends Component {

    changeTopic = (e) => {
        this.props.onChangeTopic(e.target.value);
    };

    changeTag = (e) => {
        this.props.onChangeTag(e.target.value);
    };

    render(){
        return (
            <div className={'posts-filter'}>
                <div className={'filter-item'}>
                    <h4>Check topic</h4>
                    <select onChange={this.changeTopic}>
                        {/*<option value="-" disabled={true} >---</option>*/}
                        {
                            this.props.testStore.list.map((item) => (
                                <option value={item.id} key={item.id + '-' + item.name} >{item.name}</option>
                            ))
                        }
                    </select>
                </div>
                <div className={'filter-item'}>
                    <h4>Check tag</h4>
                    <select onChange={this.changeTag} defaultValue={'-'}>
                        <option value="-" disabled={true}>---</option>
                        {
                            this.props.testStore.tags.map((item) => (
                                <option value={item} key={item} >{item}</option>
                            ))
                        }
                    </select>
                </div>
            </div>
        );
    }
}

export default PostsFilter;