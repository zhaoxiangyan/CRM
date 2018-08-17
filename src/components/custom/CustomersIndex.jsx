import React,{Component} from 'react';
import {Route} from 'react-router-dom';
import Customers from './Customers';
import CustomersDetail from './CustomersDetail';

export default class CustomersIndex extends Component{
    render(){
        return(
            <div>
                <Route path="/app/custom/customers" exact component={Customers} />
                <Route path="/app/custom/customers/:customerid" exact component={CustomersDetail} />
            </div>
        )
    }
}