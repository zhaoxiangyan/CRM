import React,{Component} from 'react';
import { Form, Row, Col, Card, Tabs, Button, DatePicker, Radio, Input, Icon, Avatar, Popover, Upload, Select, Divider, Drawer, Cascader, Modal, Timeline } from 'antd';
import BreadcrumbCustom from '../BreadcrumbCustom';
import {FormattedMessage} from 'react-intl';
import moment from 'moment';


const TabPane = Tabs.TabPane;
const {TextArea} = Input;
const FormItem = Form.Item;
const Option = Select.Option;
const dateFormat = 'YYYY-MM-DD';
const TimelineItem = Timeline.Item;
// 级联
const options = [{
    value: 'zhongguo',
    label: '中国',
    children: [{
        value: 'hubei',
        label: '湖北',
        children: [{
            value: 'jingzhou',
            label: '荆州',
        }],
    },{
        value: 'jiangxi',
        label: '江西',
        children: [{
          value: 'jiujiang',
          label: '九江',
        }],
    }]
  }, {
    value: 'meiguo',
    label: '美国',
    children: [{
      value: 'xiyatu',
      label: '西雅图市',
    }],
  }];

// this.props.match.params.customerid 动态传参 
class CustomersDetail extends Component{
    state = {
        // 抽屉
        visible:false,
        // 对话框 联系人
        modalvisible:false,
        // 对话框 销售机会
        modalvisible1:false,
    };
    // tab  全部活动
    callback = (key) => {
        console.log(key);
    }
    // 设置下次回访时间
    onChange = (date,dateString) => {
        console.log(date,dateString);
    }
    // 抽屉  查看
    showDrawer = () => {
        this.setState({visible:true})
    }
    onClose = () => {
        this.setState({visible: false});
    };
    // 对话框 联系人添加
    showModal = () => {
        this.setState({modalvisible: true,});
    }
    handleOk = (e) => {
        console.log(e);
        this.setState({modalvisible: false,});
    }
    handleCancel = (e) => {
        console.log(e);
        this.setState({modalvisible: false,});
    }
    // 对话框 销售机会添加
    showModal1 = () => {
        this.setState({modalvisible1: true,});
    }
    handleOk1 = (e) => {
        console.log(e);
        this.setState({modalvisible1: false,});
    }
    handleCancel1 = (e) => {
        console.log(e);
        this.setState({modalvisible1: false,});
    }
    render(){
        const formItemLayout = {labelCol: { span: 24,style:{paddingBottom:2} },wrapperCol: { span: 24 }};
        const formItemLayout1 = {labelCol: { span: 10 },wrapperCol: { span: 14 }};
        const formItemLayout2 = {labelCol: { span: 5 },wrapperCol: { span: 19 }};
        const { getFieldDecorator } = this.props.form;
        // 手机select
        const inputBefore = (
            <Select
                showSearch
                style={{ width: 120 }}
                placeholder="选择国家/地区代码"
                optionFilterProp="children"
                filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
            >
                <Option value="+86">+86</Option>
                <Option value="+886">+886</Option>
                <Option value="+852">+852</Option>
            </Select>
        )
        // 添加联系人 手机
        const prefixSelector = getFieldDecorator('prefix', {
            initialValue: '86',
        })(
            <Select style={{ width: 70 }}>
                <Option value="86">+86</Option>
                <Option value="87">+87</Option>
            </Select>
        );
        const prefixSelector1 = getFieldDecorator('prefix1', {
            initialValue: '86',
        })(
            <Select style={{ width: 70 }}>
                <Option value="86">+86</Option>
                <Option value="87">+87</Option>
            </Select>
        );
        return(
            <div>
                <BreadcrumbCustom first={<FormattedMessage id="custom.breadcrumb1" />} second={<FormattedMessage id="custom.breadcrumb2" />} secondlink="/app/custom/customers" third={<FormattedMessage id="custom.breadcrumb3" />} />
                <Row gutter={30} className="gutter-box">
                    <Col md={15}>
                       <Card bordered={false} style={{marginBottom:15}} >
                            <Row type="flex" justify="space-between" align="middle">
                                <Icon type="star-o" style={{fontSize:24,color:'#00a8a6',cursor:'pointer'}} />
                                <Avatar size={40} icon="user" style={{marginLeft:15}} />
                                <div style={{flex:1,marginLeft:10}}>
                                    <p style={{marginTop:0,marginBottom:5}}>{this.props.match.params.customerid}</p>
                                    <p style={{marginTop:0,marginBottom:0}}>
                                        <span style={{marginRight:20}}>归属人：Leslie</span>
                                        <span style={{marginRight:20}}>参与人：请选择</span>
                                        <span>创建时间：2018-08-20 15:05:51</span>
                                    </p>
                                </div>
                                <div style={{color:'#00a8a6'}}>客户状态：开户客户
                                    <Popover content={<div style={{maxWidth:200}}>客户状态分为销售线索、潜在客户、开户客户、入金客户和交易客户。</div>}><Icon type="question-circle" style={{marginLeft:10,color:'#00a8a6'}} /></Popover>
                                </div>
                            </Row>
                       </Card>
                       <Card 
                            title={<div><Avatar shape="square" icon="user" size={30} style={{marginRight:10,backgroundColor: '#00a8a6'}} /><span style={{verticalAlign:'middle'}}>详细信息</span></div>} 
                            extra={<a href=" javascript:void(0)" style={{verticalAlign:'middle'}}><Icon type="form" />修改</a>} 
                            bordered={false} 
                            style={{marginBottom:15}} 
                       >
                            <Row gutter={50}>
                                <Col span={12}>
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
                                    <FormItem {...formItemLayout} label="People Count" style={{marginBottom:5}}>
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
                                <Col span={12}>
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
                                <Col span={24}>
                                    <FormItem {...formItemLayout} label="备注" style={{marginBottom:10}}>
                                        {getFieldDecorator('remarks', {
                                            rules: [{ required: false, message: '请输入备注!' }],
                                        })(
                                            <TextArea rows={3} />
                                        )}
                                    </FormItem>
                                </Col>  
                            </Row> 
                       </Card>
                       <Card 
                            title={<div><Avatar shape="square" icon="wallet" size={30} style={{marginRight:10,backgroundColor: '#00a8a6'}} /><span style={{verticalAlign:'middle'}}>交易账户</span></div>} 
                            bordered={false} 
                            style={{marginBottom:15}}
                       >
                            <Row style={{border:'1px solid #ddd',backgroundColor:'#fafafa',borderRadius:4,padding:10,marginBottom:20}} >
                                <Col span={12} style={{marginTop:6}}>
                                   <span>账号：</span><span>3453446</span>
                                </Col>
                                <Col span={12} style={{marginTop:6}}>
                                   <span>余额：</span><span>$ 0</span>
                                </Col>
                                <Col span={12} style={{marginTop:6}}>
                                   <span>已用保证金：</span><span>$ 0</span>
                                </Col>
                                <Col span={12} style={{marginTop:6}}>
                                   <span>首次入金时间：</span><span>无</span>
                                </Col>
                                <Col span={12} style={{marginTop:6}}>
                                    <span>杠杆：</span><span>1:200</span>
                                </Col>
                                <Col span={12} style={{marginTop:6}}>
                                    <span>净值：</span><span>$ 0</span>
                                </Col>
                                <Col span={12} style={{marginTop:6}}>
                                    <span>可用保证金：</span><span>$ 0</span>
                                </Col>
                                <Col span={12} style={{marginTop:6,marginBottom:6}}>
                                    <span>创建时间：</span><span>2018-08-20 14:23:12</span>
                                </Col>
                                <Divider dashed style={{margin:0}} />
                                <Col span={12} style={{marginTop:6}}><span>持仓单：</span><span>0</span></Col>
                                <Col span={12} style={{marginTop:6}}><span>挂单：</span><span>0</span></Col>
                            </Row>
                            <Row style={{border:'1px solid #ddd',backgroundColor:'#fafafa',borderRadius:4,padding:10}} >
                                <Col span={12} style={{marginTop:6}}>
                                   <span>账号：</span><span>3453446</span>
                                </Col>
                                <Col span={12} style={{marginTop:6}}>
                                   <span>余额：</span><span>$ 0</span>
                                </Col>
                                <Col span={12} style={{marginTop:6}}>
                                   <span>已用保证金：</span><span>$ 0</span>
                                </Col>
                                <Col span={12} style={{marginTop:6}}>
                                   <span>首次入金时间：</span><span>无</span>
                                </Col>
                                <Col span={12} style={{marginTop:6}}>
                                    <span>杠杆：</span><span>1:200</span>
                                </Col>
                                <Col span={12} style={{marginTop:6}}>
                                    <span>净值：</span><span>$ 0</span>
                                </Col>
                                <Col span={12} style={{marginTop:6}}>
                                    <span>可用保证金：</span><span>$ 0</span>
                                </Col>
                                <Col span={12} style={{marginTop:6,marginBottom:6}}>
                                    <span>创建时间：</span><span>2018-08-20 14:23:12</span>
                                </Col>
                                <Divider dashed style={{margin:0}} />
                                <Col span={12} style={{marginTop:6}}><span>持仓单：</span><span>0</span></Col>
                                <Col span={12} style={{marginTop:6}}><span>挂单：</span><span>0</span></Col>
                            </Row>
                       </Card>
                       <Card 
                            title={<div><Avatar shape="square" icon="wallet" size={30} style={{marginRight:10,backgroundColor: '#00a8a6'}} /><span style={{verticalAlign:'middle'}}>账户所有人资料<Popover content={<div style={{maxWidth:200}}>账户所有人资料，是用于交易者开户审核合规性的信息。</div>}><Icon type="question-circle" style={{marginLeft:10,color:'#00a8a6'}} /></Popover></span></div>} 
                            bordered={false} 
                            extra={<Button style={{verticalAlign:'middle'}} size="small" type="primary" ghost onClick={this.showDrawer}>查看</Button>} 
                            style={{marginBottom:15}}
                            headStyle={{border:'none'}}
                            bodyStyle={{display:'none'}}
                       />
                       <Card title={<div><Avatar shape="square" icon="solution" size={30} style={{marginRight:10,backgroundColor: '#00a8a6'}} /><span style={{verticalAlign:'middle'}}>Trader Work登录用户（已注册）</span></div>} 
                            bordered={false} 
                            style={{marginBottom:15}}
                       >
                            <Row style={{paddingLeft:10,paddingRight:10}}>
                                <Col span={12} style={{marginTop:6}}>
                                   <span>姓名：</span><span>dddd</span>
                                </Col>
                                <Col span={12} style={{marginTop:6}}>
                                   <span>电话：</span><span>13524215142</span>
                                </Col>
                                <Col span={12} style={{marginTop:6}}>
                                   <span>用户名：</span><span>3</span>
                                </Col>
                                <Col span={12} style={{marginTop:6}}>
                                   <span>邮箱：</span><span>23</span>
                                </Col>
                            </Row>
                       </Card>
                       <Card title={<div><Avatar shape="square" icon="contacts" size={30} style={{marginRight:10,backgroundColor: '#00a8a6'}} /><span style={{verticalAlign:'middle'}}>联系人（0）</span></div>} 
                            bordered={false} 
                            style={{marginBottom:15}} 
                            extra={<Button style={{verticalAlign:'middle'}} size="small" type="primary" ghost onClick={this.showModal}>添加</Button>} 
                            headStyle={{border:'none'}}
                            bodyStyle={{display:'none'}}
                       />
                       <Card title={<div><Avatar shape="square" icon="pay-circle-o" size={30} style={{marginRight:10,backgroundColor: '#00a8a6'}} /><span style={{verticalAlign:'middle'}}>销售机会（0）</span></div>} 
                            bordered={false} 
                            style={{marginBottom:15}} 
                            extra={<Button style={{verticalAlign:'middle'}} size="small" type="primary" ghost onClick={this.showModal1}>添加</Button>} 
                            headStyle={{border:'none'}}
                            bodyStyle={{display:'none'}}
                       />
                    </Col>
                    <Col md={9}>
                       <Card title="客户信息" bordered={false} style={{marginBottom:15}} actions={[<div><Button type="primary">确认</Button><Button>取消</Button></div>,<DatePicker onChange={this.onChange} placeholder="设置下次回访时间" />]} >
                            <p style={{marginTop:0,marginBottom:5}}>跟进方式：</p>
                            <Radio.Group defaultValue="a" buttonStyle="solid">
                                <Radio.Button value="a">面谈</Radio.Button>
                                <Radio.Button value="b">电话</Radio.Button>
                                <Radio.Button value="c">即时通讯</Radio.Button>
                                <Radio.Button value="d">电子邮件</Radio.Button>
                                <Radio.Button value="e">其他</Radio.Button>
                            </Radio.Group>
                            <p style={{marginTop:15,marginBottom:5}}>跟进内容：</p>
                            <TextArea rows={3} />
                       </Card>
                       <Tabs defaultActiveKey="1" onChange={this.callback}>
                           <TabPane tab="全部活动" key="1">Pane1</TabPane>
                           <TabPane tab="操作记录" key="2">Pane2</TabPane>
                           <TabPane tab="交易记录" key="3">
                                <Timeline mode="left">
                                    <TimelineItem color="red">2015-09-01</TimelineItem>
                                    <TimelineItem>
                                        <div style={{backgroundColor:'#fff',padding:15,borderRadius:4}}>
                                                <span style={{marginRight:20}}>账号：32512</span>            
                                                <span>交易了一笔订单</span>
                                                <div>(UTC+8)2018/08/21 15:33</div>
                                                <Row style={{backgroundColor:'#fafafa',border:'1px solid #ddd',padding:10,marginTop:10,borderRadius:4}}>
                                                    <Col span={12}>
                                                        <span>订单号：</span>
                                                        <span>2956415</span>
                                                    </Col>
                                                    <Col span={12}>
                                                        <span>类型：</span>
                                                        <span>sell</span>
                                                    </Col>
                                                    <Col span={12}>
                                                        <span>品种：</span>
                                                        <span>EURUSD</span>
                                                    </Col>
                                                    <Col span={12}>
                                                        <span>交易量：</span>
                                                        <span>0.5</span>
                                                    </Col>
                                                    <Col span={12}>
                                                        <span>盈亏：</span>
                                                        <span>30</span>
                                                    </Col>
                                                </Row>
                                        </div>
                                    </TimelineItem>
                                    <TimelineItem>
                                        <div style={{backgroundColor:'#fff',padding:15,borderRadius:4}}>
                                                <span style={{marginRight:20}}>账号：32512</span>            
                                                <span>交易了一笔订单</span>
                                                <div>(UTC+8)2018/08/21 15:33</div>
                                                <Row style={{backgroundColor:'#fafafa',border:'1px solid #ddd',padding:10,marginTop:10,borderRadius:4}}>
                                                    <Col span={12}>
                                                        <span>订单号：</span>
                                                        <span>2956415</span>
                                                    </Col>
                                                    <Col span={12}>
                                                        <span>类型：</span>
                                                        <span>sell</span>
                                                    </Col>
                                                    <Col span={12}>
                                                        <span>品种：</span>
                                                        <span>EURUSD</span>
                                                    </Col>
                                                    <Col span={12}>
                                                        <span>交易量：</span>
                                                        <span>0.5</span>
                                                    </Col>
                                                    <Col span={12}>
                                                        <span>盈亏：</span>
                                                        <span>30</span>
                                                    </Col>
                                                </Row>
                                        </div>
                                    </TimelineItem>
                                    <TimelineItem color="red">2015-09-01</TimelineItem>
                                    <TimelineItem>
                                        <div style={{backgroundColor:'#fff',padding:15,borderRadius:4}}>
                                                <span style={{marginRight:20}}>账号：32512</span>            
                                                <span>交易了一笔订单</span>
                                                <div>(UTC+8)2018/08/21 15:33</div>
                                                <Row style={{backgroundColor:'#fafafa',border:'1px solid #ddd',padding:10,marginTop:10,borderRadius:4}}>
                                                    <Col span={12}>
                                                        <span>订单号：</span>
                                                        <span>2956415</span>
                                                    </Col>
                                                    <Col span={12}>
                                                        <span>类型：</span>
                                                        <span>sell</span>
                                                    </Col>
                                                    <Col span={12}>
                                                        <span>品种：</span>
                                                        <span>EURUSD</span>
                                                    </Col>
                                                    <Col span={12}>
                                                        <span>交易量：</span>
                                                        <span>0.5</span>
                                                    </Col>
                                                    <Col span={12}>
                                                        <span>盈亏：</span>
                                                        <span>30</span>
                                                    </Col>
                                                </Row>
                                        </div>
                                    </TimelineItem>
                                </Timeline>
                           </TabPane>
                           <TabPane tab="跟进记录" key="4">Pane4</TabPane>
                       </Tabs>
                    </Col>
                </Row>
                {/* 查看账户所有人资料 */}
                <Drawer title="账户所有人资料" width={900} placement="right" onClose={this.onClose} visible={this.state.visible} style={{height: 'calc(100% - 55px)',overflow: 'auto',paddingBottom: 53}}> 
                    <Card title={<div><Avatar shape="square" icon="user" size={30} style={{marginRight:10,backgroundColor: '#00a8a6'}} /><span style={{verticalAlign:'middle'}}>基本资料</span></div>} 
                          bordered={false} 
                          headStyle={{padding:0}}
                    >
                        <Row gutter={50}>
                            <Col span={11} offset={1}>
                                <FormItem {...formItemLayout} label="所属客户" style={{marginBottom:10}}>
                                    <Input disabled value="朱刘" />
                                </FormItem>
                                <FormItem {...formItemLayout} label="性别" style={{marginBottom:10}}>
                                    <Select disabled defaultValue="male" style={{width:'100%'}}>
                                        <Option value="male">男</Option>
                                        <Option value="female">女</Option>
                                    </Select>
                                </FormItem>
                                <FormItem {...formItemLayout} label="国家和地区" style={{marginBottom:10}}>
                                    <Select style={{ width: '100%' }} disabled defaultValue="china">
                                        <Option value="china">中国大陆</Option>
                                    </Select>
                                </FormItem>
                                <FormItem {...formItemLayout} label="邮编" style={{marginBottom:10}}>
                                    <Input disabled value="432000" />
                                </FormItem>
                            </Col>
                            <Col span={11}>
                                <FormItem {...formItemLayout} label="姓名" style={{marginBottom:10}}>
                                    <Input placeholder="" value="朱刘" disabled />
                                </FormItem>
                                <FormItem {...formItemLayout} label="出生年月" style={{marginBottom:10}}>
                                    <DatePicker defaultValue={moment('1996-11-15', dateFormat)} disabled style={{width:'100%'}} />
                                </FormItem>
                                <FormItem {...formItemLayout} label="居住地" style={{marginBottom:10}}>
                                    <Cascader options={options} placeholder="Please select" disabled defaultValue={['zhongguo','jiangxi','jiujiang']} style={{width:'100%'}} />
                                </FormItem>
                            </Col>
                            <Col span={22} offset={1}>
                                <FormItem {...formItemLayout} label="详细地址" style={{marginBottom:10}}>
                                    <Input disabled value="湖北省松滋市刘家场镇东马路10号八组2号" />
                                </FormItem>
                                <FormItem {...formItemLayout} label="备注" style={{marginBottom:10}}>
                                    <TextArea rows={3} disabled />
                                </FormItem>
                            </Col>  
                        </Row> 
                    </Card>
                    <Card title={<div><Avatar shape="square" icon="pay-circle-o" size={30} style={{marginRight:10,backgroundColor: '#00a8a6'}} /><span style={{verticalAlign:'middle'}}>财务信息</span></div>} 
                          bordered={false} 
                          headStyle={{padding:0}}
                    >
                        <Row gutter={50}>
                            <Col span={11} offset={1}>
                                <FormItem {...formItemLayout} label="总资产" style={{marginBottom:10}}>
                                    <Select disabled defaultValue="1" style={{width:'100%'}}>
                                        <Option value="1">2000001-5000000</Option>
                                    </Select>
                                </FormItem>
                                <FormItem {...formItemLayout} label="收入来源" style={{marginBottom:10}}>
                                    <Select disabled defaultValue="gongzi" style={{width:'100%'}}>
                                        <Option value="gongzi">工资储蓄</Option>
                                        <Option value="cunkuan">存款</Option>
                                    </Select>
                                </FormItem>
                                <FormItem {...formItemLayout} label="投资年数" style={{marginBottom:10}}>
                                    <Select style={{ width: '100%' }} disabled defaultValue="1">
                                        <Option value="1">0~5</Option>
                                    </Select>
                                </FormItem>
                                <FormItem {...formItemLayout} label="投资目的" style={{marginBottom:10}}>
                                    <Input disabled value="赚钱" />
                                </FormItem>
                                <FormItem {...formItemLayout} label="开户银行" style={{marginBottom:10}}>
                                    <Select style={{ width: '100%' }} disabled defaultValue="1">
                                        <Option value="1">中国银行</Option>
                                    </Select>
                                </FormItem>
                                <FormItem {...formItemLayout} label="银行账号" style={{marginBottom:10}}>
                                    <Input disabled value="6254255566555" />
                                </FormItem>
                                <FormItem {...formItemLayout} label="你是否有至少2个月的交易经验" style={{marginBottom:10}}>
                                    <Select style={{ width: '100%' }} disabled defaultValue="1">
                                        <Option value="1">是</Option>
                                    </Select>
                                </FormItem>
                                <FormItem {...formItemLayout} label="请提供可以帮助您理解我们服务的专业经验和背景" style={{marginBottom:10}}>
                                    <Select style={{ width: '100%' }} disabled defaultValue="1">
                                        <Option value="1">dd</Option>
                                    </Select>
                                </FormItem>
                            </Col>
                            <Col span={11}>
                                <FormItem {...formItemLayout} label="净资产" style={{marginBottom:10}}>
                                    <Select style={{ width: '100%' }} disabled defaultValue="1">
                                        <Option value="1">1000001-1500000</Option>
                                    </Select>
                                </FormItem>
                                <FormItem {...formItemLayout} label="投资经验" style={{marginBottom:10}}>
                                    <Select style={{ width: '100%' }} disabled defaultValue="1">
                                        <Option value="1">外汇</Option>
                                    </Select>
                                </FormItem>
                                <FormItem {...formItemLayout} label="知识水平" style={{marginBottom:10}}>
                                    <Select style={{ width: '100%' }} disabled defaultValue="1">
                                        <Option value="1">大专</Option>
                                    </Select>
                                </FormItem>
                                <FormItem {...formItemLayout} label="投资额度" style={{marginBottom:10}}>
                                    <Select style={{ width: '100%' }} disabled defaultValue="1">
                                        <Option value="1">500001-1000000</Option>
                                    </Select>
                                </FormItem>
                                <FormItem {...formItemLayout} label="银行所在地" style={{marginBottom:10}}>
                                    <Cascader options={options} placeholder="Please select" disabled defaultValue={['zhongguo','jiangxi','jiujiang']} style={{width:'100%'}} />
                                </FormItem>
                                <FormItem {...formItemLayout} label="银行支行" style={{marginBottom:10}}>
                                    <Input value="" disabled />
                                </FormItem>
                                <FormItem {...formItemLayout} label="过去三年，你曾经通过一个类似的机构，交易过OTC的保证金外汇或CFD交易么" style={{marginBottom:10}}>
                                    <Input value="" disabled />
                                </FormItem>
                                <FormItem {...formItemLayout} label="在过去的12个月内，您是否至少交易过20次？" style={{marginBottom:10}}>
                                    <Input value="" disabled />
                                </FormItem>
                            </Col>
                            <Col span={22} offset={1}>
                                <FormItem {...formItemLayout} label="备注" style={{marginBottom:10}}>
                                    <TextArea rows={3} disabled />
                                </FormItem>
                            </Col>  
                        </Row> 
                    </Card>
                    <Card title={<div><Avatar shape="square" icon="idcard" size={30} style={{marginRight:10,backgroundColor: '#00a8a6'}} /><span style={{verticalAlign:'middle'}}>证件信息</span></div>} 
                          bordered={false} 
                          headStyle={{padding:0}}
                    >
                        <Row gutter={50}>
                            <Col span={11} offset={1}>
                                <FormItem {...formItemLayout} label="身份证明类型" style={{marginBottom:10}}>
                                    <Select disabled defaultValue="1" style={{width:'100%'}}>
                                        <Option value="1">身份证</Option>
                                    </Select>
                                </FormItem>
                                <FormItem {...formItemLayout} label="身份证明A" style={{marginBottom:10}}>
                                    <a href="/fdf" target="_blank">查看文件</a>
                                </FormItem>
                                <FormItem {...formItemLayout} label="银行卡证明A" style={{marginBottom:10}}>
                                    <a href="/fdf" target="_blank">查看文件</a>
                                </FormItem>
                                <FormItem {...formItemLayout} label="手持身份证" style={{marginBottom:10}}>
                                    <Input disabled value="" />
                                </FormItem>
                            </Col>
                            <Col span={11}>
                                <FormItem {...formItemLayout} label="身份证明号码" style={{marginBottom:10}}>
                                    <Input value="421584199512122410" disabled />
                                </FormItem>
                                <FormItem {...formItemLayout} label="身份证明B" style={{marginBottom:10}}>
                                    <a href="/fdf" target="_blank">查看文件</a>
                                </FormItem>
                                <FormItem {...formItemLayout} label="银行卡证明B" style={{marginBottom:10}}>
                                    <a href="/fdf" target="_blank">查看文件</a>
                                </FormItem>
                            </Col>
                        </Row> 
                    </Card>
                    <Card title={<div><Avatar shape="square" icon="profile" size={30} style={{marginRight:10,backgroundColor: '#00a8a6'}} /><span style={{verticalAlign:'middle'}}>适当性测试</span></div>} 
                          bordered={false} 
                          headStyle={{padding:0}}
                    >
                        <Row gutter={50}>
                            <Col span={11} offset={1}>
                                <FormItem {...formItemLayout} label="测试时间" style={{marginBottom:10}}>
                                    <Input disabled value="" />
                                </FormItem>
                                <FormItem {...formItemLayout} label="测试结果" style={{marginBottom:10}}>
                                    <Input disabled value="" />
                                </FormItem>
                            </Col>
                            <Col span={11}>
                                <FormItem {...formItemLayout} label="测试得分" style={{marginBottom:10}}>
                                    <Input value="" disabled />
                                </FormItem>
                            </Col>
                        </Row> 
                    </Card>
                </Drawer>
                {/* 联系人添加 */}
                <Modal
                    title="编辑联系人"
                    visible={this.state.modalvisible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                    style={{top:'20px'}}
                >
                    <Form>
                        <Row gutter={20}>
                            <Col span={24}>
                                <FormItem {...formItemLayout} label="姓名" style={{marginBottom:10}}>
                                    {getFieldDecorator('name', {
                                        rules: [{ required: true, message: '请填写姓名' }],
                                    })(
                                        <Input />
                                    )}
                                </FormItem>
                                <FormItem {...formItemLayout} label="客户名称" style={{marginBottom:10}}>
                                    {getFieldDecorator('customername', {
                                        rules: [{ required: true, message: '请选择客户名称' }],
                                        initialValue:'1'
                                    })(
                                        <Select style={{ width: '100%' }} disabled >
                                            <Option value="1">肖女士</Option>
                                        </Select>
                                    )}
                                </FormItem>
                                <FormItem {...formItemLayout} label="联系人归属" style={{marginBottom:10}}>
                                    {getFieldDecorator('lianxirenguishu', {
                                        rules: [{ required: false, message: '联系人归属' }],
                                        initialValue:'Jim H'
                                    })(
                                        <Select style={{ width: '100%' }} >
                                            <Option value="Jim H">Jim H</Option>
                                        </Select>
                                    )}
                                </FormItem>
                            </Col>
                            <Col span={12}>
                                <FormItem {...formItemLayout} label="手机" style={{marginBottom:10}}>
                                    {getFieldDecorator('phone')(
                                        <Input addonBefore={prefixSelector} style={{ width: '100%' }} />
                                    )}
                                </FormItem>
                                <FormItem {...formItemLayout} label="邮箱" style={{marginBottom:10}}>
                                    {getFieldDecorator('email')(
                                        <Input />
                                    )}
                                </FormItem>
                            </Col>
                            <Col span={12}>
                                <FormItem {...formItemLayout} label="电话" colon={false} style={{marginBottom:10}}>
                                    {getFieldDecorator('telephone')(
                                        <Input addonBefore={prefixSelector1} style={{ width: '100%' }} />
                                    )}
                                </FormItem>
                                <FormItem {...formItemLayout} label="副邮箱" style={{marginBottom:10}}>
                                    {getFieldDecorator('spareemail')(
                                        <Input />
                                    )}
                                </FormItem>
                            </Col>
                            <Col span={24}>
                                <FormItem {...formItemLayout} label="职务" style={{marginBottom:10}}>
                                    {getFieldDecorator('post')(<Input />)}
                                </FormItem>
                                <FormItem {...formItemLayout} label="性别" style={{marginBottom:10}}>
                                    {getFieldDecorator('sex')(
                                        <Select style={{ width: '100%' }} >
                                            <Option value="male">男</Option>
                                            <Option value="female">女</Option>
                                        </Select>
                                    )}
                                </FormItem>
                                <FormItem {...formItemLayout} label="出生年月" style={{marginBottom:10}}>
                                    {getFieldDecorator('birth')(
                                        <DatePicker style={{width:'100%'}} />
                                    )}
                                </FormItem>
                                <FormItem {...formItemLayout} label="即时通讯" style={{marginBottom:10}}>
                                    {getFieldDecorator('messaging')(<Input />)}
                                </FormItem>
                                <FormItem {...formItemLayout} label="备注" style={{marginBottom:10}}>
                                    {getFieldDecorator('remarks')(<TextArea rows={3} />)}
                                </FormItem>
                                <FormItem {...formItemLayout} label="创建时间" style={{marginBottom:10}}>
                                    {getFieldDecorator('registrationtime')(
                                        <DatePicker style={{width:'100%'}} disabled />
                                    )}
                                </FormItem>
                            </Col>
                        </Row>
                    </Form>
                </Modal>
                {/* 销售机会添加 */}
                <Modal
                    title="添加销售机会"
                    visible={this.state.modalvisible1}
                    onOk={this.handleOk1}
                    onCancel={this.handleCancel1}
                    style={{top:'200px'}}
                >
                    <Form>
                        <Row>
                            <Col span={12}>
                                <FormItem {...formItemLayout1} label="机会名称" style={{marginBottom:10}}>
                                    {getFieldDecorator('chancename', {
                                        rules: [{ required: true, message: '请填写机会名称' }],
                                    })(
                                        <Input />
                                    )}
                                </FormItem>
                                <FormItem {...formItemLayout1} label="机会归属" style={{marginBottom:10}}>
                                    {getFieldDecorator('chanceowner')(
                                        <Select>
                                            <Option value="Leslie Yin">Leslie Yin</Option>
                                        </Select>
                                    )}
                                </FormItem>
                                <FormItem {...formItemLayout1} label="销售阶段" style={{marginBottom:10}}>
                                    {getFieldDecorator('salesphase', {
                                        rules: [{ required: true, message: '请选择销售阶段' }],
                                    })(
                                        <Select>
                                            <Option value="初步接洽">初步接洽</Option>
                                            <Option value="产品推荐">产品推荐</Option>
                                            <Option value="明确意向">明确意向</Option>
                                            <Option value="确定签约">确定签约</Option>
                                            <Option value="赢单">赢单</Option>
                                            <Option value="输单">输单</Option>
                                        </Select>
                                    )}
                                </FormItem>
                                <FormItem {...formItemLayout1} label="预计成交时间" style={{marginBottom:10}}>
                                    {getFieldDecorator('estimated')(<DatePicker style={{width:'100%'}} />)}
                                </FormItem> 
                            </Col>
                            <Col span={12}>
                                <FormItem {...formItemLayout1} label="客户名称" colon={false} style={{marginBottom:10}}>
                                    {getFieldDecorator('customername', {
                                        rules: [{ required: true, message: '请选择客户名称' }],
                                        initialValue:'1'
                                    })(
                                        <Select disabled>
                                            <Option value="1">朱刘</Option>
                                        </Select>
                                    )}
                                </FormItem>
                                <FormItem {...formItemLayout1} label="机会类型" style={{marginBottom:10}}>
                                    {getFieldDecorator('chancetype')(
                                        <Select>
                                            <Option value="1">居间</Option>
                                            <Option value="2">开户</Option>
                                            <Option value="3">渠道</Option>
                                            <Option value="4">老客户续约</Option>
                                            <Option value="5">老客户购买新产品</Option>
                                        </Select>
                                    )}
                                </FormItem>
                                <FormItem {...formItemLayout1} label="预计成交金额" style={{marginBottom:10}}>
                                    {getFieldDecorator('transactionamount')(
                                        <Input />
                                    )}
                                </FormItem>
                            </Col>
                            <Col span={24}>
                                <FormItem {...formItemLayout2} label="备注" style={{marginBottom:10}}>
                                    {getFieldDecorator('chanceremarks')(<TextArea rows={3} />)}
                                </FormItem>
                            </Col>
                        </Row>
                    </Form>
                </Modal>
            </div>
        )
    }
}

export default Form.create()(CustomersDetail); 