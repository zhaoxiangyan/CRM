import React,{Component} from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import NotFound from './components/pages/NotFound';
import Login from './components/pages/Login';
import FindPassword from './components/pages/FindPassword';
import App from './App';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { langAction } from '@/action';


class Page extends Component{
    componentWillMount() {
        const { langAction } = this.props;
        const language = localStorage.getItem('lang');
        language && langAction(language);
    }
    render(){
        return(
        <Router>
            <Switch>
                {/* <Route exact path="/" render={() => <Redirect to="/app/dashboard/index" push />} />         */}
                <Route exact path="/" render={()=><Redirect to="/login" push />} />
                <Route path="/app" component={App} />
                <Route path="/404" component={NotFound} />
                <Route path="/login" component={Login} />
                <Route path="/findpassword" component={FindPassword} />
                <Route component={NotFound} />
            </Switch>
        </Router>
        )
    }  
}
const mapDispatchToProps = dispatch => ({
    langAction: bindActionCreators(langAction, dispatch)
});

export default connect(null,mapDispatchToProps)(Page);
