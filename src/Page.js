import React,{Component} from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import NotFound from './components/pages/NotFound';
import Login from './components/pages/Login';
import FindPassword from './components/pages/FindPassword';
import App from './App';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { langData } from '@/action';

// export default () => (
//     <Router>
//         <Switch>
//             <Route exact path="/" render={() => <Redirect to="/app/dashboard/index" push />} />        
//             <Route path="/app" component={App} />
//             <Route path="/404" component={NotFound} />
//             <Route path="/login" component={Login} />
//             <Route component={NotFound} />
//         </Switch>
//     </Router>
// )

class Page extends Component{
    componentWillMount() {
        const { langData } = this.props;
        const lang = localStorage.getItem('lang');
        lang && langData(lang);
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
    langData: bindActionCreators(langData, dispatch)
});

export default connect(null,mapDispatchToProps)(Page);
