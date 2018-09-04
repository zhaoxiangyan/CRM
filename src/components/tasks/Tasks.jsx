// Trader Work 用戶
import React, {Component} from 'react';
import { Row, Col, Card, Table, Button, Select, DatePicker, Input, Pagination, Tabs } from 'antd';
import BreadcrumbCustom from '../BreadcrumbCustom';
import {FormattedMessage,injectIntl} from 'react-intl';
import axios from 'axios';
import * as config from '../../axios/config';
import moment from 'moment';
import {Link,Route} from 'react-router-dom';

const Option = Select.Option;
const RangePicker = DatePicker.RangePicker;
const InputGroup = Input.Group;
const Search = Input.Search;
const TabPane = Tabs.TabPane;

const columns = [{
  title: <FormattedMessage id="user.traderwork.th1" />,
  dataIndex: 'id',
  align:'center',
  sorter: (a,b) => a.id - b.id
}, {
  title: <FormattedMessage id="user.traderwork.th2" />,
  dataIndex: 'name',
  render:text=><Link to={'/app/user/bwtauser/200'}>{text}</Link>,
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
    componentDidMount(){
        axios.get(config.MOCK_USER_TRADERWORK).then(res => {
            console.log(typeof(res.data.data));
            this.setState({data:res.data,loading:false});
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
        const {intl} = this.props;
        const { loading,reloadloading, selectedRowKeys } = this.state;
        // 表格 Table
        const rowSelection = {
            selectedRowKeys,
            onChange: this.onSelectChange,
        };
        const hasSelected = selectedRowKeys.length > 0;
        return (
            <div className="gutter-example button-demo">
                <BreadcrumbCustom first="任务" />
                <Row gutter={16}>
                    <Col className="gutter-row" md={24}>
                        <div className="gutter-box">
                            <Card>
                                <Tabs defaultActiveKey="1" style={{backgroundColor:'#fff'}} tabBarExtraContent={<Button>设置</Button>}>
                                    <TabPane tab="Trader Work相关任务" key="1">
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
                                                        <Button><FormattedMessage id="registertime" /></Button>
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
                                        <Table rowSelection={rowSelection} columns={columns} dataSource={this.state.data.data} loading={loading} scroll={{x:1400}} size={'small'} />
                                        <div style={{textAlign:'right',marginTop:20}}>
                                            <Pagination size="small" total={50} showTotal={this.showTotal} showSizeChanger showQuickJumper />
                                        </div>
                                    </TabPane>
                                    <TabPane tab="代理任务" key="2">Content of Tab Pane 2</TabPane>
                                </Tabs>
                            </Card>
                        </div>
                    </Col>
                </Row>
            </div>
        )
    }
}




export default injectIntl(Bwtauser);