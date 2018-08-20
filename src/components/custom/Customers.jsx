// 客戶
import React, {Component} from 'react';
import { Row, Col, Card, Table, Button, Icon, Select, DatePicker, Input, Pagination, Drawer, Form, Upload } from 'antd';
import BreadcrumbCustom from '../BreadcrumbCustom';
import {FormattedMessage,injectIntl} from 'react-intl';
import axios from 'axios';
import * as config from '../../axios/config';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { receiveUser } from '@/action';
import moment from 'moment';
import EditUsermgmt from '../user/Edit_usermgmt';
import {Link,Route} from 'react-router-dom';

const Option = Select.Option;
const RangePicker = DatePicker.RangePicker;
const InputGroup = Input.Group;
const Search = Input.Search;
const FormItem = Form.Item;
const {TextArea} = Input;

const columns = [{
  title: <FormattedMessage id="custom.customers.th1" />,
  dataIndex: 'action',
  align:'center',
}, {
  title: <FormattedMessage id="custom.customers.th2" />,
  dataIndex: 'customername',
  render:text=><Link to={'/app/custom/customers/250'}>{text}</Link>,
  align:'center',
}, {
    title: <FormattedMessage id="custom.customers.th3" />,
    dataIndex: 'followcontent',
    align:'center'
}, {
    title: <FormattedMessage id="custom.customers.th4" />,
    dataIndex: 'customerno',
    align:'center'
}, {
    title: <FormattedMessage id="custom.customers.th5" />,
    dataIndex: 'owner',
    align:'center'
}, {
    title: <FormattedMessage id="custom.customers.th6" />,
    dataIndex: 'followtime',
    align:'center',
    sorter: (a,b) => a.followtime - b.followtime
}, {
    title: <FormattedMessage id="custom.customers.th7" />,
    dataIndex: 'customertype',
    align:'center'
}, {
    title: <FormattedMessage id="custom.customers.th8" />,
    dataIndex: 'customersource',
    align:'center'
}, {
    title: <FormattedMessage id="custom.customers.th9" />,
    dataIndex: 'phone',
    align:'center'
}, {
    title: <FormattedMessage id="custom.customers.th10" />,
    dataIndex: 'email',
    align:'center'
}, {
    title: <FormattedMessage id="custom.customers.th11" />,
    dataIndex: 'createtime',
    align:'center',
    sorter: (a,b) => a.createtime - b.createtime
}, {
    title: <FormattedMessage id="custom.customers.th12" />,
    dataIndex: 'latesttime',
    align:'center',
    sorter: (a,b) => a.latesttime - b.latesttime
}, {
    title: <FormattedMessage id="custom.customers.th13" />,
    dataIndex: 'tradingaccount',
    align:'center'
}, {
    title: <FormattedMessage id="custom.customers.th14" />,
    dataIndex: 'clientstatus',
    align:'center'
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
        axios.get(config.MOCK_CUSTOM_CUSTOMERS).then(res => {
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
    // 第二个select
    handleChange2 = (value) => {
        console.log(`selected ${value}`);
    }
    // 第三个select
    handleChange3 = (value) => {
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
    // upload 附件
    normFile = (e) => {
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
                <BreadcrumbCustom first={<FormattedMessage id="custom.breadcrumb1" />} second={<FormattedMessage id="custom.breadcrumb2" />} />
                <Row gutter={16}>
                    <Col className="gutter-row" md={24}>
                        <div className="gutter-box">
                            <Card title={<FormattedMessage id="custom.customers.title" />} bordered={false} >
                                <div style={{ marginBottom: 16 }}>
                                    {hasSelected?
                                    <div>
                                        <span style={{ marginRight: 8 }}>
                                            <FormattedMessage id="user.select" values={{name:`${selectedRowKeys.length}`}} />
                                        </span>
                                        <Button type="primary" onClick={this.start} disabled={!hasSelected} loading={reloadloading}><FormattedMessage id="cancel" /></Button>
                                        <Button type="primary" ><FormattedMessage id="delete" /></Button>
                                        <Button type="primary" ><FormattedMessage id="custom.customers.transfer" /></Button>
                                        <Button type="primary" ><FormattedMessage id="send" /></Button>
                                        <Button type="primary" ><FormattedMessage id="custom.customers.send" /></Button>
                                    </div>
                                    :
                                    <div>
                                    <InputGroup compact>
                                        <span style={{marginRight:10,marginBottom:5}}>
                                            <Button type="primary" onClick={this.showDrawer} ><Icon type="plus" /><FormattedMessage id="custom.customers.add" /></Button>
                                        </span>
                                        <span style={{marginRight:10,marginBottom:5}}>
                                            <Select defaultValue="所有客户" style={{ width: 120 }} onChange={this.handleChange1}>
                                                <Option value="所有客户">所有客户</Option>
                                                <Option value="归属给我的客户">归属给我的客户</Option>
                                                <Option value="归属给下级的客户">归属给下级的客户</Option>
                                                <Option value="无归属客户">无归属客户</Option>
                                                <Option value="我关注的客户">我关注的客户</Option>
                                                <Option value="我参与的客户">我参与的客户</Option>
                                                <Option value="下级参与人的客户">下级参与人的客户</Option>
                                            </Select>
                                        </span>
                                        <span style={{marginRight:10,marginBottom:5}}>
                                            <Select defaultValue="客户状态" style={{ width: 120 }} onChange={this.handleChange2}>
                                                <Option value="客户状态">客户状态</Option>
                                                <Option value="销售线索">销售线索</Option>
                                                <Option value="潜在客户">潜在客户</Option>
                                                <Option value="开户客户">开户客户</Option>
                                                <Option value="入金客户">入金客户</Option>
                                                <Option value="交易客户">交易客户</Option>
                                            </Select>
                                        </span>
                                        <span style={{marginRight:10,marginBottom:5}}>
                                            <InputGroup compact>
                                                <Button><FormattedMessage id="custom.customers.create" /></Button>
                                                <RangePicker ranges={{[intl.messages.ranges_day]:[moment(), moment()], [intl.messages.ranges_month]: [moment(), moment().endOf('month')] }} onChange={this.onChange3} />
                                            </InputGroup>
                                        </span>
                                        <span style={{marginRight:10,marginBottom:5}}>
                                            <Select defaultValue="全部来源" style={{ width: 120 }} onChange={this.handleChange3}>
                                                <Option value="全部来源">全部来源</Option>
                                                <Option value="代理注册推广链接">代理注册推广链接</Option>
                                                <Option value="Trader注册推广链接">...</Option>
                                            </Select>
                                        </span>
                                        <span style={{float:'right'}}>
                                            <InputGroup compact >
                                            <Select defaultValue="客户姓名" >
                                                <Option value="客户姓名">客户姓名</Option>
                                                <Option value="Sign In">Sign In</Option>
                                            </Select>
                                            <Search placeholder="搜索" onSearch={value => console.log(value)} enterButton style={{width:180}} />
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
                <Drawer title="新建客户" width={900} placement="right" onClose={this.onClose} visible={this.state.visible} style={{height: 'calc(100% - 55px)',overflow: 'auto',paddingBottom: 53}}> 
                    <Form>
                        <Card bordered={false} >
                            <Row>
                                <Col span={11}>
                                    <FormItem {...formItemLayout} label="Client Status" style={{marginBottom:10}}>
                                        {getFieldDecorator('clientstatus', {
                                            rules: [{ required: true, message: 'Client Status is required' }],
                                        })(
                                            <Select style={{ width: '100%' }} >
                                                <Option value="Sales Leads">Sales Leads</Option>
                                            </Select>
                                        )}
                                    </FormItem>
                                    <FormItem {...formItemLayout} label="Customer No" style={{marginBottom:10}}>
                                        <Input placeholder="" />
                                    </FormItem>
                                    <FormItem {...formItemLayout} label="Participant" style={{marginBottom:10}}>
                                        {getFieldDecorator('participant', {
                                            rules: [{ required: false, message: '' }],
                                        })(
                                            <Select style={{ width: '100%' }} >
                                                <Option value="Sales Leads">Sales Leads</Option>
                                            </Select>
                                        )}
                                    </FormItem>
                                    <FormItem {...formItemLayout} label="Customer Level" style={{marginBottom:10}}>
                                        {getFieldDecorator('customerlevel', {
                                            rules: [{ required: false, message: '' }],
                                        })(
                                            <Select style={{ width: '100%' }} >
                                                <Option value="High">High</Option>
                                                <Option value="Middle">Middle</Option>
                                                <Option value="Low">Low</Option>
                                            </Select>
                                        )}
                                    </FormItem>
                                    <FormItem {...formItemLayout} label="People Count" style={{marginBottom:10}}>
                                        {getFieldDecorator('peoplecount', {
                                            rules: [{ required: false, message: '' }],
                                        })(
                                            <Select style={{ width: '100%' }} >
                                                <Option value="Below 20">Below 20</Option>
                                                <Option value="20-99 man">20-99 man</Option>
                                                <Option value="100-500 man">100-500 man</Option>
                                                <Option value="More than 500">More than 500</Option>
                                            </Select>
                                        )}
                                    </FormItem>
                                    <FormItem {...formItemLayout} label="手机" style={{marginBottom:10}}>
                                        {getFieldDecorator('phone', {
                                            rules: [{ required: false, message: '请输入手机号码!' }],
                                        })(
                                            <Input addonBefore={inputBefore} placeholder="" />
                                        )}
                                    </FormItem>
                                    <FormItem {...formItemLayout} label="IM" style={{marginBottom:10}}>
                                        {getFieldDecorator('IM')(<Input />)}
                                    </FormItem>
                                    <FormItem {...formItemLayout} label="Fax" style={{marginBottom:10}}>
                                        {getFieldDecorator('fax')(<Input />)}
                                    </FormItem>
                                    <FormItem {...formItemLayout} label="Other contacts" style={{marginBottom:10}}>
                                        {getFieldDecorator('othercontacts')(<Input />)}
                                    </FormItem>
                                </Col>
                                <Col span={11}>
                                    <FormItem {...formItemLayout} label="Customer Name" style={{marginBottom:10}}>
                                        {getFieldDecorator('customername', {
                                            rules: [{ required: true, message: 'Customer Name is required' }],
                                        })(
                                            <Input placeholder="" />
                                        )}
                                    </FormItem>
                                    <FormItem {...formItemLayout} label="Principal owner" style={{marginBottom:10}}>
                                        {getFieldDecorator('owner')(
                                            <Select style={{ width: '100%' }} >
                                                <Option value="Sandy">Sandy</Option>
                                            </Select>
                                        )}
                                    </FormItem>
                                    <FormItem {...formItemLayout} label="Customer Type" style={{marginBottom:10}}>
                                        {getFieldDecorator('customertype')(
                                            <Select style={{ width: '100%' }} >
                                                <Option value="Straight off">Straight off</Option>
                                                <Option value="agent">agent</Option>
                                                <Option value="VIP">VIP</Option>
                                            </Select>
                                        )}
                                    </FormItem>
                                    <FormItem {...formItemLayout} label="Customer source" style={{marginBottom:10}}>
                                        {getFieldDecorator('source')(
                                            <Select style={{ width: '100%' }} >
                                                <Option value="official website registration">official website registration</Option>
                                                <Option value="list data">list data</Option>
                                                <Option value="customer introduction">customer introduction</Option>
                                                <Option value="Intermediary">Intermediary</Option>
                                                <Option value="offline activities">offline activities</Option>
                                                <Option value="new sales">new sales</Option>
                                            </Select>
                                        )}
                                    </FormItem>
                                    <FormItem {...formItemLayout} label="Introducer" style={{marginBottom:10}}>
                                        {getFieldDecorator('introducer')(<Input />)}
                                    </FormItem>
                                    <FormItem {...formItemLayout} label="Email" style={{marginBottom:10}}>
                                        {getFieldDecorator('email', {
                                            rules: [{ required: true, message: 'Email is required' }],
                                        })(
                                            <Input placeholder="" />
                                        )}
                                    </FormItem>
                                    <FormItem {...formItemLayout} label="Social" style={{marginBottom:10}}>
                                        {getFieldDecorator('social')(<Input />)}
                                    </FormItem>
                                    <FormItem {...formItemLayout} label="Site" style={{marginBottom:10}}>
                                        {getFieldDecorator('site')(<Input />)}
                                    </FormItem>
                                    <FormItem {...formItemLayout} label="Attachment" style={{marginBottom:10}}>
                                        {getFieldDecorator('attachment', {
                                                valuePropName: 'fileList',
                                                getValueFromEvent: this.normFile,
                                            })(
                                            <Upload name="logo" action="/upload.do" listType="picture">
                                                <Button>
                                                <Icon type="upload" /> Click to upload
                                                </Button>
                                            </Upload>
                                        )}
                                    </FormItem>
                                </Col>
                                <Col span={22}>
                                    <FormItem {...formItemLayout1} label="备注" style={{marginBottom:10}}>
                                        {getFieldDecorator('remarks', {
                                            rules: [{ required: false, message: '请输入备注!' }],
                                        })(
                                            <TextArea rows={3} />
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
    return {user};
};

const mapDispatchToProps = dispatch => ({
    receiveUser: bindActionCreators(receiveUser, dispatch)
});

export default connect(mapStateToProps,mapDispatchToProps)(injectIntl(Form.create()(Usermgmt)));
// export default Usermgmt;