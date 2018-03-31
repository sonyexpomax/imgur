import React from "react";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import './RoutingWithSubPages.css';
import UserForm from '../UserForm/UserForm';
import Users from '../Users/Users';
import Todos from "../Todos/Todos";
import TodosMain from "../Todos/TodosMain";

import FaAngleDown from 'react-icons/lib/fa/angle-down';
import TiArrowForward from 'react-icons/lib/ti/arrow-forward';

let productsArray = [
    {id: 1, name: 'Product №1'},
    {id: 2, name: 'Product №2'},
    {id: 3, name: 'Product №3'},
    {id: 4, name: 'Product №4'},
    {id: 5, name: 'Product №5'},
    {id: 6, name: 'Product №6'},
    {id: 7, name: 'Product №7'},
    {id: 8, name: 'Product №8'},
    {id: 9, name: 'Product №9'},
    {id: 10, name: 'Product №10'},
    {id: 11, name: 'Product №11'},
    {id: 12, name: 'Product №12'},
    {id: 13, name: 'Product №13'},
    {id: 14, name: 'Product №14'},
];

const RoutingWithSubPages = () => (
    <Router>
        <main>
            <nav>
                <ul>
                    <li>
                       <Link to="/">Main</Link>
                    </li>
                    <li>
                        <Link to="/products">Products<FaAngleDown /></Link>
                    </li>
                    <li>
                        <Link to="/users">Users list<FaAngleDown /></Link>
                    </li>
                    <li>
                        <Link to="/form">User form</Link>
                    </li>
                    <li>
                        <Link to="/todos">Todos</Link>
                    </li>
                </ul>
            </nav>
            <Switch>
                <Route exact path="/" component={Main} />
                <Route path="/products" component={Products} />
                <Route path="/users" component={Users} />
                <Route path="/form" component={Form} />
                <Route path="/todos" component={TodosMain} />
                <Route component = {None}/>
            </Switch>
            <input type={'text'} onChange={e=>this.setState({value:e.target.value})}    />
        </main>
    </Router>
);

const Main = () => (
    <div>
        <h2>Main page</h2>
    </div>
);

const Form = () => (
    <div>
        <UserForm />
    </div>
);

const None = () => (
        <h3>Nothing to show</h3>
);

const ChooseProduct = () => (
    <article>
        <h3>Choose the product</h3>
    </article>
);

const Products = ({ match }) => (
    <div>
        <aside>
            <h2>Products</h2>
            <ul>
                {
                    productsArray.map(function(item){
                        return (
                            <li key={item.id}>
                                <Link to={`${match.url}/${item.id}`}><TiArrowForward /> {item.name}</Link>
                            </li>
                        )
                    })
                }
            </ul>
        </aside>
        <Route path={`${match.url}/:productId`} component={Product} />
        <Route exact path={match.url} component={ChooseProduct} />
    </div>
);

const Product = ({ match }) => (
    <article>
           {
               productsArray.map(function(item, i){
                   if (item.id == match.params.productId){
                       return (
                           <h2 key={item.id + "-" + item.name}>{item.name}</h2>
                       )
                   }
               })
           }
    </article>
);

export default RoutingWithSubPages;