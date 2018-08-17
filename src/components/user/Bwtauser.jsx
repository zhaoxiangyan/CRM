// Trader Work 用戶
import React, {Component} from 'react';
import { Row, Col, Card, Table, Button, Select, DatePicker, Input, Pagination } from 'antd';
import BreadcrumbCustom from '../BreadcrumbCustom';
import {FormattedMessage,injectIntl} from 'react-intl';
import axios from 'axios';
import * as config from '../../axios/config';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { receiveUser } from '@/action';
import moment from 'moment';
import EditBwtauser from './Edit_bwtauser';
import {Link,Route} from 'react-router-dom';

const Option = Select.Option;
const RangePicker = DatePicker.RangePicker;
const InputGroup = Input.Group;
const Search = Input.Search;

const columns = [{
  title: <FormattedMessage id="user.traderwork.th1" />,
  dataIndex: 'id',
  align:'center',
  sorter: (a,b) => a.id - b.id
}, {
  title: <FormattedMessage id="user.traderwork.th2" />,
  dataIndex: 'name',
  render:text=><Link to={'/app/user/bwta/200'}>{text}</Link>,
  align:'center',
  sorter: (a,b) => a.name - b.name
}, {
    title: <FormattedMessage id="user.traderwork.th3" />,
    dataIndex: 'wechat',
    align:'center',
}, {
    title: <FormattedMessage id="user.traderwork.th4" />,
    dataIndex: 'email',
    align:'center'
}, {
    title: <FormattedMessage id="user.traderwork.th5" />,
    dataIndex: 'phone',
    align:'center'
}, {
    title: <FormattedMessage id="user.traderwork.th6" />,
    dataIndex: 'username',
    align:'center'
}, {
    title: <FormattedMessage id="user.traderwork.th7" />,
    dataIndex: 'account',
    align:'center'
}, {
    title: <FormattedMessage id="user.traderwork.th8" />,
    dataIndex: 'registration',
    align:'center'
}, {
    title: <FormattedMessage id="user.traderwork.th9" />,
    dataIndex: 'lastlogin',
    align:'center'
}, {
    title: <FormattedMessage id="user.traderwork.th10" />,
    dataIndex: 'loginstatus',
    align:'center'
}];

class Bwtauser extends Component {
    state = {
        selectedRowKeys: [], // Check here to configure the default column
        reloadloading: false,
        loading:true,
        data:{},
        // 抽屉
        visible:false,
        // 登录密码框类型
        passwordType:true
    };
    componentWillMount() {
        console.log('Usermgmt');
    }
    componentDidMount(){
        const { receiveUser } = this.props;
        axios.get(config.MOCK_USER_TRADERWORK).then(res => {
            console.log(typeof(res.data.data));
            this.setState({data:res.data,loading:false});
            receiveUser(res.data,'user');
        }).catch(err => {
            console.log(err);
        });  
    }
    componentWillUnmount = () => {
        this.setState = (state,callback)=>{
           return;
        };
    }
    start = () => {
        this.setState({ reloadloading: true });
        // ajax request after empty completing
        setTimeout(() => {
            this.setState({
                selectedRowKeys: [],
                reloadloading: false,
            });
        }, 1000);
    }
    onSelectChange = (selectedRowKeys) => {
        console.log('selectedRowKeys changed: ', selectedRowKeys);
        this.setState({ selectedRowKeys });
    }
    // 时间选择器
    onChange3 = (dates, dateStrings) => {
        console.log('From: ', dates[0], ', to: ', dates[1]);
        console.log('From: ', dateStrings[0], ', to: ', dateStrings[1]);
    }
    // 分页器
    showTotal = (total) => {
        return `Total ${total} items`;
    }
    render() {
        const {user,intl} = this.props;
        const { loading,reloadloading, selectedRowKeys } = this.state;
        // 表格 Table
        const rowSelection = {
            selectedRowKeys,
            onChange: this.onSelectChange,
        };
        const hasSelected = selectedRowKeys.length > 0;
        return (
            <div className="gutter-example button-demo">
                <BreadcrumbCustom first={<FormattedMessage id="user.breadcrumb1" />} second={<FormattedMessage id="user.breadcrumb3" />} />
                <Row gutter={16}>
                    <Col className="gutter-row" md={24}>
                        <div className="gutter-box">
                            <Card title={<FormattedMessage id="user.traderwork.title" />} bordered={false} >
                                <div style={{ marginBottom: 16 }}>
                                    {hasSelected?
                                    <div>
                                        <span style={{ marginRight: 8 }}>
                                            <FormattedMessage id="user.select" values={{name:`${selectedRowKeys.length}`}} />
                                        </span>
                                        <Button type="primary" onClick={this.start} disabled={!hasSelected} loading={reloadloading}><FormattedMessage id="cancel" /></Button>
                                        <Button type="primary" ><FormattedMessage id="delete" /></Button>
                                        <Button type="primary" ><FormattedMessage id="send" /></Button>
                                    </div>
                                    :
                                    <div>
                                    <InputGroup compact>
                                        <span style={{marginRight:10,marginBottom:5}}>
                                            <InputGroup compact>
                                                <Button><FormattedMessage id="user.registertime" /></Button>
                                                <RangePicker ranges={{[intl.messages.ranges_day]:[moment(), moment()], [intl.messages.ranges_month]: [moment(), moment().endOf('month')] }} onChange={this.onChange3} />
                                            </InputGroup>
                                        </span>
                                        <span style={{float:'right'}}>
                                            <InputGroup compact >
                                            <Select defaultValue="Sign Up" >
                                                <Option value="Sign Up">Sign Up</Option>
                                                <Option value="Sign In">Sign In</Option>
                                            </Select>
                                            <Search placeholder="input search text" onSearch={value => console.log(value)} enterButton style={{width:180}} />
                                            </InputGroup>
                                        </span>
                                    </InputGroup>
                                    </div>}
                                </div>
                                <Table rowSelection={rowSelection} columns={columns} dataSource={user.data.data} loading={loading} scroll={{x:1400}} size={'small'} />
                                <div style={{textAlign:'right',marginTop:20}}>
                                    <Pagination size="small" total={50} showTotal={this.showTotal} showSizeChanger showQuickJumper />
                                </div>
                            </Card>
                        </div>
                    </Col>
                </Row>
                <Route path={this.props.match.url+'/:userid'} component={EditBwtauser} />
            </div>
        )
    }
}

const mapStateToProps = state => {
    const { user = {data: {}} } = state.httpUser;
    return {user};
};

const mapDispatchToProps = dispatch => ({
    receiveUser: bindActionCreators(receiveUser, dispatch)
});

export default connect(mapStateToProps,mapDispatchToProps)(injectIntl(Bwtauser));
// export default Usermgmt;