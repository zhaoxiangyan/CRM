// Broker Work 用戶
import React, {Component} from 'react';
import { Row, Col, Card, Table, Button, Icon, Select, DatePicker, Input, Pagination, Drawer, Form, Cascader, Switch, Upload, Radio } from 'antd';
import BreadcrumbCustom from '../BreadcrumbCustom';
import {FormattedMessage,injectIntl} from 'react-intl';
import axios from 'axios';
import * as config from '../../axios/config';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { receiveUser } from '@/action';
import moment from 'moment';
import EditUsermgmt from './Edit_usermgmt';
import {Link,Route} from 'react-router-dom';

const Option = Select.Option;
const RangePicker = DatePicker.RangePicker;
const InputGroup = Input.Group;
const Search = Input.Search;
const FormItem = Form.Item;
const {TextArea} = Input;
const RadioGroup = Radio.Group;

const columns = [{
  title: <FormattedMessage id="user.brokerwork.th1" />,
  dataIndex: 'userid',
  align:'center',
  sorter: (a,b) => a.userid - b.userid
}, {
  title: <FormattedMessage id="user.brokerwork.th2" />,
  dataIndex: 'name',
  render:text=><Link to={'/app/user/mgmt/250'}>{text}</Link>,
  align:'center',
  sorter: (a,b) => a.name - b.name
}, {
    title: <FormattedMessage id="user.brokerwork.th3" />,
    dataIndex: 'email',
    align:'center'
}, {
    title: <FormattedMessage id="user.brokerwork.th4" />,
    dataIndex: 'telephone',
    align:'center'
}, {
    title: <FormattedMessage id="user.brokerwork.th5" />,
    dataIndex: 'role',
    align:'center'
}, {
    title: <FormattedMessage id="user.brokerwork.th6" />,
    dataIndex: 'country',
    align:'center'
}, {
    title: <FormattedMessage id="user.brokerwork.th7" />,
    dataIndex: 'comment',
    align:'center'
}, {
    title: <FormattedMessage id="user.brokerwork.th8" />,
    dataIndex: 'level',
    align:'center'
}, {
    title: <FormattedMessage id="user.brokerwork.th9" />,
    dataIndex: 'superior',
    align:'center'
}, {
    title: <FormattedMessage id="user.brokerwork.th10" />,
    dataIndex: 'id',
    align:'center'
}, {
    title: <FormattedMessage id="user.brokerwork.th11" />,
    dataIndex: 'subordinate',
    align:'center'
}, {
    title: <FormattedMessage id="user.brokerwork.th12" />,
    dataIndex: 'registration',
    align:'center',
    sorter: (a,b) => a.registration - b.registration
}, {
    title: <FormattedMessage id="user.brokerwork.th13" />,
    dataIndex: 'loginstatus',
    align:'center'
}, {
    title: <FormattedMessage id="user.brokerwork.th14" />,
    dataIndex: 'client',
    align:'center'
}, {
  title: <FormattedMessage id="user.brokerwork.th15" />,
  dataIndex: 'direct',
  align:'center'
}];

// 级联options
const cascaderOptions = [{
    value: 'zhejiang',
    label: 'Zhejiang',
    children: [{
      value: 'hangzhou',
      label: 'Hangzhou',
      children: [{
        value: 'xihu',
        label: 'West Lake',
      }],
    }],
  }, {
    value: 'jiangsu',
    label: 'Jiangsu',
    children: [{
      value: 'nanjing',
      label: 'Nanjing',
      children: [{
        value: 'zhonghuamen',
        label: 'Zhong Hua Men',
      }],
    }],
  }];
class Usermgmt extends Component {
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
        // receiveUser({funcName:'brokerwork',stateName:'user'});
        axios.get(config.MOCK_USER_BROKERWORK).then(res => {
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
    // 切换登录密码框类型
    switchPassword = () => {
        this.setState({passwordType:!this.state.passwordType})
    }
    // cascader级联选择
    cascaderChange = (value) => {
        console.log(value);
    }
    // 开关switch
    switchChange1 = (checked) => {
        console.log(`swith to ${checked}`);
    }
    switchChange2 = (checked) => {
        console.log(`swith to ${checked}`);
    }
    // upload 身份证 银行卡
    normFile1 = (e) => {
        console.log('Upload event:', e);
        if (Array.isArray(e)) {
          return e;
        }
        return e && e.fileList;
    }
    normFile2 = (e) => {
        console.log('Upload event:', e);
        if (Array.isArray(e)) {
          return e;
        }
        return e && e.fileList;
    }
    normFile3 = (e) => {
        console.log('Upload event:', e);
        if (Array.isArray(e)) {
          return e;
        }
        return e && e.fileList;
    }
    normFile4 = (e) => {
        console.log('Upload event:', e);
        if (Array.isArray(e)) {
          return e;
        }
        return e && e.fileList;
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
        // 抽屉 Form
        const formItemLayout = {labelCol: { span: 10 },wrapperCol: { span: 14 }};
        const formItemLayout1 = {labelCol: { span: 5 },wrapperCol: { span: 19 }};
        const formItemLayout2 = {labelCol: { span: 5 },wrapperCol: { span: 19, offset:5 }};
        const { getFieldDecorator } = this.props.form;
        // 手机select
        const inputBefore = (
            <Select
                showSearch
                style={{ width: 80 }}
                placeholder="选择国家/地区代码"
                optionFilterProp="children"
                filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
            >
                <Option value="+86">中国大陆</Option>
                <Option value="+886">台湾</Option>
                <Option value="+852">香港</Option>
            </Select>
        )
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
                <Drawer title="添加用户" width={900} placement="right" onClose={this.onClose} visible={this.state.visible} style={{height: 'calc(100% - 55px)',overflow: 'auto',paddingBottom: 53}}> 
                    <Form>
                        <Card title="基本资料" bordered={false} >
                            <Row>
                                <Col span={11}>
                                    <FormItem {...formItemLayout} label="用户编号" style={{marginBottom:10}}>
                                        <Input placeholder="未填写可自动生成" />
                                    </FormItem>
                                    <FormItem {...formItemLayout} label="邮箱" style={{marginBottom:10}}>
                                        {getFieldDecorator('email', {
                                            rules: [{ required: true, message: '请输入邮箱!' }],
                                        })(
                                            <Input placeholder="" />
                                        )}
                                    </FormItem>
                                    <FormItem {...formItemLayout} label="手机" style={{marginBottom:10}}>
                                        {getFieldDecorator('phone', {
                                            rules: [{ required: false, message: '请输入手机号码!' }],
                                        })(
                                            <Input addonBefore={inputBefore} placeholder="" />
                                        )}
                                    </FormItem>
                                    <FormItem {...formItemLayout} label="国家/省/市" style={{marginBottom:10}}>
                                        {getFieldDecorator('country', {
                                            rules: [{ required: false, message: '!' }],
                                        })(
                                            <Cascader options={cascaderOptions} onChange={this.cascaderChange} placeholder="Please select" />
                                        )}
                                    </FormItem>
                                </Col>
                                <Col span={11}>
                                    <FormItem {...formItemLayout} label="姓名" style={{marginBottom:10}}>
                                        {getFieldDecorator('name', {
                                            rules: [{ required: true, message: '请输入姓名!' }],
                                        })(
                                            <Input placeholder="" />
                                        )}
                                    </FormItem>
                                    <FormItem {...formItemLayout} label="登录密码" style={{marginBottom:10}}>
                                        {getFieldDecorator('password', {
                                            rules: [{ required: false, message: '请输入登录密码!' }],
                                        })(
                                            <div style={{position:'relative'}}>
                                                <Input type={this.state.passwordType?'password':'text'} placeholder="" />
                                                <Icon type={this.state.passwordType?'eye':'eye-o'} style={{fontSize:18,position:'absolute',top:10,right:5,cursor:'pointer'}} onClick={this.switchPassword} />
                                            </div>
                                        )}
                                    </FormItem>
                                    <FormItem {...formItemLayout} label="角色" style={{marginBottom:10}}>
                                        {getFieldDecorator('role', {
                                            rules: [{ required: true, message: '请选择角色!' }],
                                        })(
                                            <Select style={{ width: '100%' }} >
                                                <Option value="S Manager">S Manager</Option>
                                            </Select>
                                        )}
                                    </FormItem>
                                </Col>
                                <Col span={22}>
                                    <FormItem {...formItemLayout1} label="详细地址" style={{marginBottom:10}}>
                                        {getFieldDecorator('address', {
                                            rules: [{ required: false, message: '请输入详细地址!' }],
                                        })(
                                            <TextArea rows={2} />
                                        )}
                                    </FormItem>
                                    <FormItem {...formItemLayout1} label="备注" style={{marginBottom:10}}>
                                        {getFieldDecorator('remarks', {
                                            rules: [{ required: false, message: '请输入备注!' }],
                                        })(
                                            <TextArea rows={3} />
                                        )}
                                    </FormItem>
                                    <FormItem {...formItemLayout1} label="首次登录修改初始密码" style={{marginBottom:10}}>
                                        {getFieldDecorator('firstpassword', {
                                            rules: [{ required: false, message: '!' }],
                                        })(
                                            <Switch defaultChecked onChange={this.switchChange1} />,
                                        )}
                                    </FormItem>
                                    <FormItem {...formItemLayout1} label="发送用户创建邮件" style={{marginBottom:10}}>
                                        {getFieldDecorator('sendemail', {
                                            rules: [{ required: false, message: '!' }],
                                        })(
                                            <Switch defaultChecked onChange={this.switchChange2} />,
                                        )}
                                    </FormItem>
                                </Col>  
                            </Row>  
                        </Card>
                        <Card title="其他信息" bordered={false} >
                            <Row>
                                <Col span={22}>
                                    <FormItem {...formItemLayout1} label="身份证明类型" style={{marginBottom:10}}>
                                        {getFieldDecorator('identitytype')(
                                            <Select style={{ width: '100%' }}>
                                                <Option value="Business License">Business License</Option>
                                                <Option value="Organization Code certificate">Organization Code certificate</Option>
                                            </Select>
                                        )}
                                    </FormItem>
                                    <FormItem {...formItemLayout1} label="身份证明号码" style={{marginBottom:10}}>
                                        {getFieldDecorator('idnumber')(
                                            <Input />
                                        )}
                                    </FormItem>
                                    <FormItem {...formItemLayout1} label="身份证明A" style={{marginBottom:10}}>
                                        {getFieldDecorator('idphotoa', {
                                                valuePropName: 'fileList',
                                                getValueFromEvent: this.normFile1,
                                            })(
                                            <Upload name="logo" action="/upload.do" listType="picture">
                                                <Button>
                                                <Icon type="upload" /> Click to upload
                                                </Button>
                                            </Upload>
                                        )}
                                    </FormItem>
                                    <FormItem {...formItemLayout1} label="身份证明B" style={{marginBottom:10}}>
                                        {getFieldDecorator('idphotob', {
                                                valuePropName: 'fileList',
                                                getValueFromEvent: this.normFile2,
                                            })(
                                            <Upload name="logo" action="/upload.do" listType="picture">
                                                <Button>
                                                <Icon type="upload" /> Click to upload
                                                </Button>
                                            </Upload>
                                        )}
                                    </FormItem>
                                    <FormItem {...formItemLayout1} label="银行卡开户行" style={{marginBottom:10}}>
                                        {getFieldDecorator('bankofdeposit')(
                                            <Select style={{ width: '100%' }} >
                                                <Option value="Bank of China">Bank of China</Option>
                                                <Option value="China Construction Bank">China Construction Bank</Option>
                                                <Option value="China Citic Bank">China Citic Bank</Option>
                                            </Select>
                                        )}
                                    </FormItem>
                                    <FormItem {...formItemLayout1} label="银行账号" style={{marginBottom:10}}>
                                        {getFieldDecorator('bankaccount')(
                                            <Input />
                                        )}
                                    </FormItem>
                                    <FormItem {...formItemLayout1} label="银行卡证明A" style={{marginBottom:10}}>
                                        {getFieldDecorator('bankcarda', {
                                                valuePropName: 'fileList',
                                                getValueFromEvent: this.normFile3,
                                            })(
                                            <Upload name="logo" action="/upload.do" listType="picture">
                                                <Button>
                                                <Icon type="upload" /> Click to upload
                                                </Button>
                                            </Upload>
                                        )}
                                    </FormItem>
                                    <FormItem {...formItemLayout1} label="银行卡证明B" style={{marginBottom:10}}>
                                        {getFieldDecorator('bankcardb', {
                                                valuePropName: 'fileList',
                                                getValueFromEvent: this.normFile4,
                                            })(
                                            <Upload name="logo" action="/upload.do" listType="picture">
                                                <Button>
                                                <Icon type="upload" /> Click to upload
                                                </Button>
                                            </Upload>
                                        )}
                                    </FormItem>
                                    <FormItem {...formItemLayout1} label="是否做过代理业务" style={{marginBottom:10}}>
                                        {getFieldDecorator('havebusiness')(
                                            <Switch defaultChecked />,
                                        )}
                                    </FormItem>
                                    <FormItem {...formItemLayout1} label="您有多少年投资股票、基金、外汇、金融衍生品等风险投资品的经验" style={{marginBottom:10}}>
                                        {getFieldDecorator('howlong')(
                                            <Select style={{ width: '100%' }} >
                                                <Option value="Less than 2 years">Less than 2 years</Option>
                                                <Option value="2 years to 5 years">2 years to 5 years</Option>
                                                <Option value="5 years to 8 years">5 years to 8 years</Option>
                                            </Select>
                                        )}
                                    </FormItem>
                                    <FormItem {...formItemLayout1} label="支行地址" style={{marginBottom:10}}>
                                        {getFieldDecorator('bankaddress')(
                                            <TextArea rows={2} />
                                        )}
                                    </FormItem>
                                </Col>  
                            </Row>  
                        </Card>
                        <Card title="返佣设置" bordered={false} >
                            <Row>
                                <Col span={11}>
                                    <FormItem {...formItemLayout} label="返佣层级" style={{marginBottom:10}}>
                                        {getFieldDecorator('commissionlevel')(
                                            <Select style={{ width: '100%' }} >
                                                <Option value="CEO">CEO</Option>
                                                <Option value="Head of Sales">Head of Sales</Option>
                                                <Option value="Sales">Sales</Option>
                                            </Select>
                                        )}
                                    </FormItem>
                                </Col>
                                <Col span={11}>
                                    <FormItem {...formItemLayout} label="上级用户" style={{marginBottom:10}}>
                                        {getFieldDecorator('superioruser')(
                                            <Select
                                                showSearch
                                                style={{ width: '100%' }}
                                                placeholder="Select a person"
                                                optionFilterProp="children"
                                                filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                                            >
                                                <Option value="jack">Jack</Option>
                                            </Select>
                                        )}
                                    </FormItem>
                                </Col>
                            </Row>  
                        </Card>
                        <Card title="绑定返佣账号" bordered={false} >
                            <Row>
                                <Col span={22}>
                                    <FormItem {...formItemLayout2} style={{marginBottom:10}}>
                                        {getFieldDecorator('commissionaccount')(
                                            <RadioGroup>
                                                <Radio value="bind">Bind An Existing Account</Radio>
                                                <Radio value="create and bind">Create a new account and bind with a client</Radio>
                                                <Radio value="not bind">Do Not Bind Commission Account</Radio>
                                            </RadioGroup>
                                        )}
                                    </FormItem>
                                </Col>  
                                <Col span={11}>
                                    <FormItem {...formItemLayout} label="账号服务器" style={{marginBottom:10}}>
                                        {getFieldDecorator('accountserver')(
                                            <Select style={{ width: '100%' }} >
                                                <Option value="CEO">CEO</Option>
                                                <Option value="Head of Sales">Head of Sales</Option>
                                                <Option value="Sales">Sales</Option>
                                            </Select>
                                        )}
                                    </FormItem>
                                </Col>
                                <Col span={11}>
                                    <FormItem {...formItemLayout} label="绑定返佣账号" style={{marginBottom:10}}>
                                        {getFieldDecorator('bindaccount')(
                                            <Select
                                                showSearch
                                                style={{ width: '100%' }}
                                                placeholder="Select a person"
                                                optionFilterProp="children"
                                                filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                                            >
                                                <Option value="jack">Jack</Option>
                                            </Select>
                                        )}
                                    </FormItem>
                                </Col>
                                
                            </Row>  
                        </Card>
                    </Form>
                    <div style={{position: 'absolute',bottom: 0,width: '100%',borderTop: '1px solid #e8e8e8',padding: '10px 16px',textAlign: 'right',left: 0,background: '#fff',borderRadius: '0 0 4px 4px',}}>
                        <Button onClick={this.onClose} type="primary">保存</Button>
                        <Button style={{marginRight: 8,}} onClick={this.onClose}>取消</Button> 
                    </div>
                </Drawer>
                <Route path={this.props.match.url+'/:userid'} component={EditUsermgmt} />
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

export default connect(mapStateToProps,mapDispatchToProps)(injectIntl(Form.create()(Usermgmt)));
// export default Usermgmt;