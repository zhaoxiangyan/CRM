// Broker Work 用戶
import React, {Component} from 'react';
import { Row, Col, Card, Table, Button, Icon, Select, DatePicker, Input, Pagination, Drawer, Form } from 'antd';
import BreadcrumbCustom from '../BreadcrumbCustom';
import {FormattedMessage} from 'react-intl';
import axios from 'axios';
import * as config from '../../axios/config';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { receiveUser } from '@/action';
import moment from 'moment';

const Option = Select.Option;
const RangePicker = DatePicker.RangePicker;
const InputGroup = Input.Group;
const Search = Input.Search;
const FormItem = Form.Item;

const columns = [{
  title: <FormattedMessage id="user.brokerwork.th1" />,
  dataIndex: 'userid'
}, {
  title: <FormattedMessage id="user.brokerwork.th2" />,
  dataIndex: 'name',
  render:text=><a href=" javascript:void(0)">{text}</a>
}, {
    title: <FormattedMessage id="user.brokerwork.th3" />,
    dataIndex: 'email',
}, {
    title: <FormattedMessage id="user.brokerwork.th4" />,
    dataIndex: 'telephone',
}, {
    title: <FormattedMessage id="user.brokerwork.th5" />,
    dataIndex: 'role',
}, {
    title: <FormattedMessage id="user.brokerwork.th6" />,
    dataIndex: 'country',
}, {
    title: <FormattedMessage id="user.brokerwork.th7" />,
    dataIndex: 'comment',
}, {
    title: <FormattedMessage id="user.brokerwork.th8" />,
    dataIndex: 'level',
}, {
    title: <FormattedMessage id="user.brokerwork.th9" />,
    dataIndex: 'superior',
}, {
    title: <FormattedMessage id="user.brokerwork.th10" />,
    dataIndex: 'id',
}, {
    title: <FormattedMessage id="user.brokerwork.th11" />,
    dataIndex: 'subordinate',
}, {
    title: <FormattedMessage id="user.brokerwork.th12" />,
    dataIndex: 'registration',
}, {
    title: <FormattedMessage id="user.brokerwork.th13" />,
    dataIndex: 'loginstatus',
}, {
    title: <FormattedMessage id="user.brokerwork.th14" />,
    dataIndex: 'client',
}, {
  title: <FormattedMessage id="user.brokerwork.th15" />,
  dataIndex: 'direct',
}];

// let data = [];

// for (let i = 0; i < 46; i++) {
//   data.push({
//     key: i,
//     userid: `Edward King ${i}`,
//     name: 32,
//     email: 32,
//     telephone: 32,
//     role: 32,
//     country: 32,
//     comment: 32,
//     level: 32,
//     superior: 32,
//     id: 32,
//     subordinate: 32,
//     registration: 32,
//     loginstatus: 32,
//     client: 32, 
//     direct: `London, Park Lane no. ${i}`,
//   });
// }
// let data = [];
// axios.get(config.MOCK_USER_BROKERWORK).then(res => {
//             console.log(typeof(res.data.data));
//             data = res.data.data;
//         }).catch(err => {
//             console.log(err);
//         });
class Usermgmt extends Component {
    state = {
        selectedRowKeys: [], // Check here to configure the default column
        reloadloading: false,
        loading:true,
        data:{},
        // 抽屉
        visible:false
    };
    componentWillMount() {
        console.log('Usermgmt');
    }
    componentDidMount(){
        const { receiveUser } = this.props;
        // receiveUser({funcName:'brokerwork',stateName:'user'});
        axios.get(config.MOCK_USER_BROKERWORK).then(res => {
            console.log(typeof(res.data.data));
            this.setState({data:res.data,loading:false});
            receiveUser(res.data,'user');
        }).catch(err => {
            console.log(err);
        });
        // const { receiveData } = this.props;
        // receiveData({},'user');
        
    }
    // shouldComponentUpdate(nextProps, nextState) {
    //     return false;
    // }
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
    // 第一个select
    handleChange1 = (value) => {
        console.log(`selected ${value}`);
    }
    handleBlur1 = () => {
        console.log('blur');
    }
    handleFocus1 = () => {
        console.log('focus');
    }
    // 第二个select
    handleChange2 = (value) => {
        console.log(`selected ${value}`);
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
    // 抽屉  添加
    showDrawer = () => {
        this.setState({visible:true})
    }
    onClose = () => {
        this.setState({visible: false});
    };
    render() {
        const {user,lang} = this.props;
        const { loading,reloadloading, selectedRowKeys } = this.state;
        const rowSelection = {
            selectedRowKeys,
            onChange: this.onSelectChange,
        };
        const hasSelected = selectedRowKeys.length > 0;
        // 抽屉 Form
        const formItemLayout = {labelCol: { span: 10 },wrapperCol: { span: 14 }};
        const formItemLayout1 = {labelCol: { span: 5 },wrapperCol: { span: 19 }};
        const formItemLayout2 = {labelCol: { span: 5 },wrapperCol: { span: 19, offset:5 }};
        return (
            <div className="gutter-example button-demo">
                <BreadcrumbCustom first={<FormattedMessage id="user.breadcrumb1" />} second={<FormattedMessage id="user.breadcrumb2" />} />
                <Row gutter={16}>
                    <Col className="gutter-row" md={24}>
                        <div className="gutter-box">
                            <Card title={<FormattedMessage id="user.brokerwork.title" />} bordered={false} >
                                <div style={{ marginBottom: 16 }}>
                                    {hasSelected?
                                    <div>
                                        <span style={{ marginRight: 8 }}>
                                            <FormattedMessage id="user.brokerwork.select" values={{name:`${selectedRowKeys.length}`}} />
                                        </span>
                                        <Button type="primary" onClick={this.start} disabled={!hasSelected} loading={reloadloading}><FormattedMessage id="user.brokerwork.cancel" /></Button>
                                        <Button type="primary" ><FormattedMessage id="user.brokerwork.delete" /></Button>
                                        <Button type="primary" ><FormattedMessage id="user.brokerwork.transfer" /></Button>
                                        <Button type="primary" ><FormattedMessage id="user.brokerwork.send" /></Button>
                                    </div>
                                    :
                                    <div>
                                    <InputGroup compact>
                                        <span style={{marginRight:10,marginBottom:5}}>
                                            <Button type="primary" onClick={this.showDrawer} ><Icon type="plus" /><FormattedMessage id="user.brokerwork.add" /></Button>
                                        </span>
                                        <span style={{marginRight:10,marginBottom:5}}>
                                            <Select
                                                addonBefore="Http://"
                                                showSearch
                                                style={{ width: 150 }}
                                                placeholder="Select a person"
                                                optionFilterProp="children"
                                                onChange={this.handleChange1}
                                                onFocus={this.handleFocus1}
                                                onBlur={this.handleBlur1}
                                                filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                                            >
                                                <Option value="jack">Jack</Option>
                                                <Option value="lucy">Lucy</Option>
                                                <Option value="tom">Tom</Option>
                                            </Select>
                                        </span>
                                        <span style={{marginRight:10,marginBottom:5}}>
                                            <Select defaultValue="所有层级" style={{ width: 120 }} onChange={this.handleChange2}>
                                                <Option value="所有层级">所有层级</Option>
                                                <Option value="CEO">CEO</Option>
                                                <Option value="Head of Sales">Head of Sales</Option>
                                                <Option value="Institutional Sales">Institutional Sales</Option>
                                                <Option value="Team Leader">Team Leader</Option>
                                                <Option value="Sales">Sales</Option>
                                                <Option value="★PIB">★PIB</Option>
                                                <Option value="PIB">PIB</Option>
                                                <Option value="MIB">MIB</Option>
                                                <Option value="IB">IB</Option>
                                            </Select>
                                        </span>
                                        <span style={{marginRight:10,marginBottom:5}}>
                                            <InputGroup compact>
                                                <Button><FormattedMessage id="user.brokerwork.registertime" /></Button>
                                                {(()=>{
                                                    switch (lang) {
                                                    case 'zh_CN':
                                                    return <RangePicker ranges={{'今天':[moment(), moment()], '当月': [moment(), moment().endOf('month')] }} onChange={this.onChange3} />
                                                    case 'zh_TW':
                                                    return <RangePicker ranges={{'今天':[moment(), moment()], '當月': [moment(), moment().endOf('month')] }} onChange={this.onChange3} />
                                                    case 'en_US':
                                                    return <RangePicker ranges={{'Today':[moment(), moment()], 'This Month': [moment(), moment().endOf('month')] }} onChange={this.onChange3} />
                                                    default:
                                                    return <RangePicker ranges={{'Today':[moment(), moment()], 'This Month': [moment(), moment().endOf('month')] }} onChange={this.onChange3} />
                                                    }
                                                })()}
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
                                <Drawer
                                title="添加用户"
                                width={900}
                                placement="right"
                                onClose={this.onClose}
                                visible={this.state.visible}
                                style={{
                                    height: 'calc(100% - 55px)',
                                    overflow: 'auto',
                                    paddingBottom: 53,
                                }}
                                > 
                                    <Form>
                                        <Card title="基本资料" bordered={false} >
                                            <Row>
                                                <Col span={11}>
                                                    <FormItem {...formItemLayout} label="用户编号" style={{marginBottom:10}}>
                                                        <Input placeholder="未填写可自动生成" />
                                                    </FormItem>
                                                    <FormItem {...formItemLayout} label="邮箱" style={{marginBottom:10}}>
                                                        <Input placeholder="未填写可自动生成" />
                                                    </FormItem>
                                                    <FormItem {...formItemLayout} label="手机" style={{marginBottom:10}}>
                                                        <Input placeholder="未填写可自动生成" />
                                                    </FormItem>
                                                    <FormItem {...formItemLayout} label="国家/省/市" style={{marginBottom:10}}>
                                                        <Input placeholder="未填写可自动生成" />
                                                    </FormItem>
                                                </Col>
                                                <Col span={11}>
                                                    <FormItem {...formItemLayout} label="姓名" style={{marginBottom:10}}>
                                                        <Input placeholder="未填写可自动生成" />
                                                    </FormItem>
                                                    <FormItem {...formItemLayout} label="密码" style={{marginBottom:10}}>
                                                        <Input placeholder="未填写可自动生成" />
                                                    </FormItem>
                                                    <FormItem {...formItemLayout} label="角色" style={{marginBottom:10}}>
                                                        <Input placeholder="未填写可自动生成" />
                                                    </FormItem>
                                                </Col>
                                                <Col span={22}>
                                                    <FormItem {...formItemLayout1} label="详细地址" style={{marginBottom:10}}>
                                                        <Input placeholder="未填写可自动生成" />
                                                    </FormItem>
                                                    <FormItem {...formItemLayout1} label="备注" style={{marginBottom:10}}>
                                                        <Input placeholder="未填写可自动生成" />
                                                    </FormItem>
                                                    <FormItem {...formItemLayout2} style={{marginBottom:10}}>
                                                        <Input placeholder="未填写可自动生成" />
                                                    </FormItem>
                                                    <FormItem {...formItemLayout2} style={{marginBottom:10}}>
                                                        <Input placeholder="未填写可自动生成" />
                                                    </FormItem>
                                                </Col>  
                                            </Row>  
                                        </Card>
                                        <Card title="其他信息" bordered={false} >
                                            <Row>
                                                <Col span={22}>
                                                    <FormItem {...formItemLayout1} label="身份证明类型" style={{marginBottom:10}}>
                                                        <Input placeholder="未填写可自动生成" />
                                                    </FormItem>
                                                    <FormItem {...formItemLayout1} label="身份证明号码" style={{marginBottom:10}}>
                                                        <Input placeholder="未填写可自动生成" />
                                                    </FormItem>
                                                    <FormItem {...formItemLayout1} label="身份证明A" style={{marginBottom:10}}>
                                                        <Input placeholder="未填写可自动生成" />
                                                    </FormItem>
                                                    <FormItem {...formItemLayout1} label="身份证明B" style={{marginBottom:10}}>
                                                        <Input placeholder="未填写可自动生成" />
                                                    </FormItem>
                                                    <FormItem {...formItemLayout1} label="银行卡开户行" style={{marginBottom:10}}>
                                                        <Input placeholder="未填写可自动生成" />
                                                    </FormItem>
                                                    <FormItem {...formItemLayout1} label="银行账号" style={{marginBottom:10}}>
                                                        <Input placeholder="未填写可自动生成" />
                                                    </FormItem>
                                                    <FormItem {...formItemLayout1} label="银行卡证明A" style={{marginBottom:10}}>
                                                        <Input placeholder="未填写可自动生成" />
                                                    </FormItem>
                                                    <FormItem {...formItemLayout1} label="银行卡证明B" style={{marginBottom:10}}>
                                                        <Input placeholder="未填写可自动生成" />
                                                    </FormItem>
                                                    <FormItem {...formItemLayout1} label="是否做过代理业务" style={{marginBottom:10}}>
                                                        <Input placeholder="未填写可自动生成" />
                                                    </FormItem>
                                                    <FormItem {...formItemLayout1} label="您有多少年投资股票、基金、外汇、金融衍生品等风险投资品的经验" style={{marginBottom:10}}>
                                                        <Input placeholder="未填写可自动生成" />
                                                    </FormItem>
                                                    <FormItem {...formItemLayout1} label="支行地址" style={{marginBottom:10}}>
                                                        <Input placeholder="未填写可自动生成" />
                                                    </FormItem>
                                                </Col>  
                                            </Row>  
                                        </Card>
                                        <Card title="返佣设置" bordered={false} >
                                            <Row>
                                                <Col span={11}>
                                                    <FormItem {...formItemLayout} label="返佣层级" style={{marginBottom:10}}>
                                                        <Input placeholder="未填写可自动生成" />
                                                    </FormItem>
                                                </Col>
                                                <Col span={11}>
                                                    <FormItem {...formItemLayout} label="上级用户" style={{marginBottom:10}}>
                                                        <Input placeholder="未填写可自动生成" />
                                                    </FormItem>
                                                </Col>
                                            </Row>  
                                        </Card>
                                        <Card title="绑定返佣账号" bordered={false} >
                                            <Row>
                                                <Col span={22}>
                                                    <FormItem {...formItemLayout2} style={{marginBottom:10}}>
                                                        <Input placeholder="未填写可自动生成" />
                                                    </FormItem>
                                                </Col>  
                                                <Col span={11}>
                                                    <FormItem {...formItemLayout} label="账号服务器" style={{marginBottom:10}}>
                                                        <Input placeholder="未填写可自动生成" />
                                                    </FormItem>
                                                </Col>
                                                <Col span={11}>
                                                    <FormItem {...formItemLayout} label="绑定返佣账号" style={{marginBottom:10}}>
                                                        <Input placeholder="未填写可自动生成" />
                                                    </FormItem>
                                                </Col>
                                                
                                            </Row>  
                                        </Card>
                                    </Form>
                                    <div
                                        style={{
                                        position: 'absolute',
                                        bottom: 0,
                                        width: '100%',
                                        borderTop: '1px solid #e8e8e8',
                                        padding: '10px 16px',
                                        textAlign: 'right',
                                        left: 0,
                                        background: '#fff',
                                        borderRadius: '0 0 4px 4px',
                                        }}
                                    >
                                        <Button onClick={this.onClose} type="primary">保存</Button>
                                        <Button style={{marginRight: 8,}} onClick={this.onClose}>取消</Button> 
                                    </div>
                                </Drawer>
                            </Card>
                        </div>
                    </Col>
                </Row>
            </div>
        )
    }
}

const mapStateToProps = state => {
    const { user = {data: {}} } = state.httpUser;
    const { lang = {data: {}} } = state.httpData;
    return {user,lang};
};

const mapDispatchToProps = dispatch => ({
    receiveUser: bindActionCreators(receiveUser, dispatch)
});

export default connect(mapStateToProps,mapDispatchToProps)(Usermgmt);
// export default Usermgmt;