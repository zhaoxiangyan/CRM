import React,{Component} from 'react';
import { Form } from 'antd';

// this.props.match.params.customerid 动态传参 
class CustomersDetail extends Component{
    render(){
        return(
            <div>
                {this.props.match.params.customerid}
            </div>
        )
    }
}

export default Form.create()(CustomersDetail); 