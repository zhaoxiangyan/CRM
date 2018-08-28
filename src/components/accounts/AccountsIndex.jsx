import React,{Component} from 'react';
import {Route} from 'react-router-dom';
import Accounts from './Accounts';
import AccountsDetail from './AccountsDetail';

export default class AccountsIndex extends Component{
    render(){
        return(
            <div>
                <Route path="/app/accounts" exact component={Accounts} />
                <Route path="/app/accounts/:accountid" exact component={AccountsDetail} />
            </div>
        )
    }
}