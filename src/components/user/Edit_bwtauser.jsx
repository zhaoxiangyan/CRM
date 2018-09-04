import React,{Component} from 'react';
import { Card, Button, Drawer, Form, Table } from 'antd';

// this.props.match.params.userid 动态传参
const columns1 = [{
    title: '用户名',
    dataIndex: 'username',
    key: 'username',
  }, {
    title: '邮箱',
    dataIndex: 'email',
    key: 'email',
  }, {
    title: '手机',
    dataIndex: 'phone',
    key: 'phone',
}];
const columns2 = [{
    title: '平台名称',
    dataIndex: 'platformname',
    key: 'platformname',
  }, {
    title: '服务器',
    dataIndex: 'server',
    key: 'server',
  }, {
    title: '账户类型',
    dataIndex: 'accounttype',
    key: 'accounttype',
  }, {
    title: '交易账号',
    dataIndex: 'account',
    key: 'account',
  }, {
    title: '账户名称',
    dataIndex: 'accountname',
    key: 'accountname',
  }, {
    title: '绑定时间',
    dataIndex: 'bindtime',
    key: 'bindtime',
  }, {
    title: '状态',
    dataIndex: 'status',
    key: 'status',
}];
const data1 = [{
    key: '1',
    username: 'John Brown',
    email: 32,
    phone: 'New York No. 1 Lake Park',
  }, {
    key: '2',
    username: 'John Brown',
    email: 32,
    phone: 'New York No. 1 Lake Park',
  }, {
    key: '3',
    username: 'John Brown',
    email: 32,
    phone: 'New York No. 1 Lake Park',
}];  
const data2 = [{
    key: '1',
    platformname: 'GQFX MT4',
    server: 'DD',
    accounttype: 'Live',
    account:'3408584',
    accountname:'王克迪',
    bindtime:1533801548208,
    status:'Activation'
  }, {
    key: '2',
    platformname: 'GQFX MT4',
    server: 'DD',
    accounttype: 'Live',
    account:'3408584',
    accountname:'王克迪',
    bindtime:1533801548208,
    status:'Activation'
}];
  
class EditBwtauser extends Component{
    state = {
        // 抽屉
        visible:false,
    };
    componentDidMount(){
        this.setState({visible:true}); 
    }
    // 抽屉
    onClose = () => {
        this.setState({visible: false});
        this.props.history.push('/app/user/bwtauser');
    };
    render(){
        return(
            <Drawer title={'查看用户:'+this.props.match.params.userid} width={900} placement="right" onClose={this.onClose} visible={this.state.visible} style={{height: 'calc(100% - 55px)',overflow: 'auto',paddingBottom: 53}}> 
                <Card title="王克迪" bordered={false} headStyle={{fontSize:25}} extra={<Button type="primary">重置登录密码</Button>}>
                    <p style={{fontSize: 14,color: 'rgba(0, 0, 0, 0.85)', marginBottom: 16,fontWeight: 500,}}>关联客户 CGX2GA 王克迪</p>
                    <Table columns={columns1} dataSource={data1} pagination={false} />
                    <Card style={{ marginTop: 16,marginBottom:16 }} type="inner" title="交易账户" >
                        <Table columns={columns2} dataSource={data2} pagination={false} />
                    </Card>
                    <Button type="primary">重置登录密码</Button>
                </Card>
                <div style={{position: 'absolute',bottom: 0,width: '100%',borderTop: '1px solid #e8e8e8',padding: '10px 16px',textAlign: 'right',left: 0,background: '#fff',borderRadius: '0 0 4px 4px',}}>
                    <Button onClick={this.onClose} type="primary">保存</Button>
                    <Button style={{marginRight: 8,}} onClick={this.onClose}>取消</Button> 
                </div>
            </Drawer>
        )
    }
}

export default Form.create()(EditBwtauser); 