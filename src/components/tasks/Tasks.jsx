// Trader Work 用戶
import React, {Component} from 'react';
import { Row, Col, Card, Table, Button, Select, DatePicker, Input, Pagination, Tabs } from 'antd';
import BreadcrumbCustom from '../BreadcrumbCustom';
import {FormattedMessage,injectIntl} from 'react-intl';
import axios from 'axios';
import * as config from '../../axios/config';
import moment from 'moment';
import {Link} from 'react-router-dom';

const Option = Select.Option;
const RangePicker = DatePicker.RangePicker;
const InputGroup = Input.Group;
const Search = Input.Search;
const TabPane = Tabs.TabPane;

// Tabs1
const columns = [{
    title: "任务ID",
    dataIndex: 'task_id',
    align:'center',
    render:text=><Link to={'/app/user/bwtauser/200'}>{text}</Link>,
    }, {
    title: "申请人",
    dataIndex: 'applicant',
    align:'center',
    }, {
        title: "申请账号",
        dataIndex: 'apply_account',
        align:'center',
    }, {
        title: "申请备注",
        dataIndex: 'apply_remark',
        align:'center'
    }, {
        title: "任务组",
        dataIndex: 'task_group',
        align:'center'
    }, {
        title: "当前处理人",
        dataIndex: 'processing_person',
        align:'center'
    }, {
        title: "申请时间",
        dataIndex: 'apply_time',
        align:'center',
        sorter:(a,b) =>a.apply_time - b.apply_time,
    }, {
        title: "附加信息",
        dataIndex: 'additional',
        align:'center'
    }, {
        title: "最新评论",
        dataIndex: 'latest_comments',
        align:'center'
    }, {
        title: "状态",
        dataIndex: 'status',
        align:'center'
    }, {
        title: "操作",
        dataIndex: 'key',
        align:'center'
}];
// Tabs2
const columns2 = [{
    title: "任务ID",
    dataIndex: 'task_id',
    align:'center',
    render:text=><Link to={'/app/user/bwtauser/200'}>{text}</Link>,
    }, {
    title: "申请人",
    dataIndex: 'applicant',
    align:'center',
    }, {
        title: "申请账号",
        dataIndex: 'apply_account',
        align:'center',
    }, {
        title: "申请备注",
        dataIndex: 'apply_remark',
        align:'center'
    }, {
        title: "任务组",
        dataIndex: 'task_group',
        align:'center'
    }, {
        title: "当前处理人",
        dataIndex: 'processing_person',
        align:'center'
    }, {
        title: "申请时间",
        dataIndex: 'apply_time',
        align:'center',
        sorter:(a,b) =>a.apply_time - b.apply_time,
    }, {
        title: "附加信息",
        dataIndex: 'additional',
        align:'center'
    }, {
        title: "最新评论",
        dataIndex: 'latest_comments',
        align:'center'
    }, {
        title: "状态",
        dataIndex: 'status',
        align:'center'
    }, {
        title: "操作",
        dataIndex: 'key',
        align:'center'
}];

class Bwtauser extends Component {
    state = {
        // Tabs1
        selectedRowKeys: [], // Check here to configure the default column
        reloadloading: false,
        loading:true,
        data:{},
        // Tabs2
        selectedRowKeys2:[],
        reloadloading2:false,
        loading2:true,
        data2:{},
    };
    componentDidMount(){
        // axios.get('https://b.gqfxcn.com/usermgmt').then(((res) => {
        //   console.log(res);
        //   console.log(res.data);
        // })).catch((err) => {
        //   console.log(err);
        // });
        axios.get(config.MOCK_TASKS).then(res => {
            console.log(typeof(res.data.data));
            this.setState({data:res.data,loading:false,data2:res.data,loading2:false});
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
    start2 = () => {
        this.setState({ reloadloading2: true });
        // ajax request after empty completing
        setTimeout(() => {
            this.setState({
                selectedRowKeys2: [],
                reloadloading2: false,
            });
        }, 1000);
    }
    onSelectChange = (selectedRowKeys) => {
        console.log('selectedRowKeys changed: ', selectedRowKeys);
        this.setState({ selectedRowKeys });
    }
    onSelectChange2 = (selectedRowKeys2) => {
        console.log('selectedRowKeys changed: ', selectedRowKeys2);
        this.setState({ selectedRowKeys2 });
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
    showTotal2 = (total) => {
        return `Total ${total} items`;
    }
    render() {
        const {intl} = this.props;
        const { loading,reloadloading, selectedRowKeys,loading2,reloadloading2,selectedRowKeys2 } = this.state;
        // 表格 Table
        const rowSelection = {
            selectedRowKeys,
            onChange: this.onSelectChange,
        };
        const rowSelection2 = {
            selectedRowKeys,
            onChange: this.onSelectChange2,
        };
        const hasSelected = selectedRowKeys.length > 0;
        const hasSelected2 = selectedRowKeys2.length > 0;
        return (
            <div className="gutter-example button-demo">
                <BreadcrumbCustom first="任务" />
                <Row gutter={16}>
                    <Col className="gutter-row" md={24}>
                        <div className="gutter-box">
                            <Card>
                                <Tabs 
                                defaultActiveKey="1" 
                                style={{backgroundColor:'#fff'}} 
                                tabBarExtraContent={<Button>设置</Button>}
                                >
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
                                                    <Select defaultValue="0">
                                                        <Option value="0">所有任务组</Option>
                                                        <Option value="1">真实账户开户</Option>
                                                        <Option value="2">同名开户</Option>
                                                        <Option value="3">入金申请</Option>
                                                        <Option value="4">出金申请</Option>
                                                        <Option value="5">转账申请</Option>
                                                        <Option value="6">调整杠杆</Option>
                                                        <Option value="7">绑定账户</Option>
                                                        <Option value="8">。。。。</Option>
                                                    </Select>
                                                </span>
                                                <span style={{marginRight:10,marginBottom:5}}>
                                                    <Select defaultValue="0">
                                                        <Option value="0">所有状态</Option>
                                                        <Option value="1">未处理</Option>
                                                        <Option value="2">未认领</Option>
                                                        <Option value="3">我待办</Option>
                                                        <Option value="4">已完成</Option>
                                                        <Option value="5">已关闭</Option>
                                                    </Select>
                                                </span>
                                                <span style={{marginRight:10,marginBottom:5}}>
                                                    <InputGroup compact>
                                                        <Button>申请时间</Button>
                                                        <RangePicker ranges={{[intl.messages.ranges_day]:[moment(), moment()], [intl.messages.ranges_month]: [moment(), moment().endOf('month')] }} onChange={this.onChange3} />
                                                    </InputGroup>
                                                </span>
                                                <span style={{float:'right'}}>
                                                    <InputGroup compact >
                                                    <Select defaultValue="0" >
                                                        <Option value="0">请选择</Option>
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
                                    <TabPane tab="代理任务" key="2">
                                        <div style={{ marginBottom: 16 }}>
                                            {hasSelected2?
                                            <div>
                                                <span style={{ marginRight: 8 }}>
                                                    <FormattedMessage id="user.select" values={{name:`${selectedRowKeys2.length}`}} />
                                                </span>
                                                <Button type="primary" onClick={this.start2} disabled={!hasSelected2} loading={reloadloading2}><FormattedMessage id="cancel" /></Button>
                                                <Button type="primary" ><FormattedMessage id="delete" /></Button>
                                                <Button type="primary" ><FormattedMessage id="send" /></Button>
                                            </div>
                                            :
                                            <div>
                                            <InputGroup compact>
                                                <span style={{marginRight:10,marginBottom:5}}>
                                                    <Select defaultValue="1">
                                                        <Option value="1">代理申请注册</Option>
                                                        <Option value="2">代理申请出金</Option>
                                                    </Select>
                                                </span>
                                                <span style={{marginRight:10,marginBottom:5}}>
                                                    <Select defaultValue="0">
                                                        <Option value="0">所有状态</Option>
                                                        <Option value="1">未处理</Option>
                                                        <Option value="2">未认领</Option>
                                                        <Option value="3">我待办</Option>
                                                        <Option value="4">已完成</Option>
                                                        <Option value="5">已关闭</Option>
                                                    </Select>
                                                </span>
                                                <span style={{marginRight:10,marginBottom:5}}>
                                                    <InputGroup compact>
                                                        <Button>申请时间</Button>
                                                        <RangePicker ranges={{[intl.messages.ranges_day]:[moment(), moment()], [intl.messages.ranges_month]: [moment(), moment().endOf('month')] }} />
                                                    </InputGroup>
                                                </span>
                                                <span style={{float:'right'}}>
                                                    <InputGroup compact >
                                                    <Select defaultValue="0" >
                                                        <Option value="0">请选择</Option>
                                                        <Option value="Sign In">Sign In</Option>
                                                    </Select>
                                                    <Search placeholder="input search text" onSearch={value => console.log(value)} enterButton style={{width:180}} />
                                                    </InputGroup>
                                                </span>
                                            </InputGroup>
                                            </div>}
                                        </div>
                                        <Table rowSelection={rowSelection2} columns={columns2} dataSource={this.state.data2.data} loading={loading2} scroll={{x:1400}} size={'small'} />
                                        <div style={{textAlign:'right',marginTop:20}}>
                                            <Pagination size="small" total={50} showTotal={this.showTotal2} showSizeChanger showQuickJumper />
                                        </div>
                                    </TabPane>
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