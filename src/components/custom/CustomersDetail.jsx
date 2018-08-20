import React,{Component} from 'react';
import { Form, Row, Col, Card, Tabs, Button, DatePicker, Radio, Input, Icon, Avatar, Popover, Upload, Select, Divider } from 'antd';
import BreadcrumbCustom from '../BreadcrumbCustom';
import {FormattedMessage} from 'react-intl';


const TabPane = Tabs.TabPane;
const {TextArea} = Input;
const FormItem = Form.Item;
const Option = Select.Option;


// this.props.match.params.customerid 动态传参 
class CustomersDetail extends Component{
    // tab  全部活动
    callback = (key) => {
        console.log(key);
    }
    // 设置下次回访时间
    onChange = (date,dateString) => {
        console.log(date,dateString);
    }
    render(){
        const formItemLayout = {labelCol: { span: 24,style:{paddingBottom:2} },wrapperCol: { span: 24 }};
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
                       <Card title={<div><Avatar shape="square" icon="user" size={30} style={{marginRight:10,backgroundColor: '#00a8a6'}} /><span style={{verticalAlign:'middle'}}>详细信息</span></div>} 
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
                       <Card title={<div><Avatar shape="square" icon="wallet" size={30} style={{marginRight:10,backgroundColor: '#00a8a6'}} /><span style={{verticalAlign:'middle'}}>交易账户</span></div>} 
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
                       <Card title={<div><Avatar shape="square" icon="wallet" size={30} style={{marginRight:10,backgroundColor: '#00a8a6'}} /><span style={{verticalAlign:'middle'}}>账户所有人资料<Popover content={<div style={{maxWidth:200}}>账户所有人资料，是用于交易者开户审核合规性的信息。</div>}><Icon type="question-circle" style={{marginLeft:10,color:'#00a8a6'}} /></Popover></span></div>} 
                            bordered={false} 
                            extra={<Button style={{verticalAlign:'middle'}} size="small" type="primary" ghost>查看</Button>} 
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
                            extra={<Button style={{verticalAlign:'middle'}} size="small" type="primary" ghost>添加</Button>} 
                            headStyle={{border:'none'}}
                            bodyStyle={{display:'none'}}
                       />
                       <Card title={<div><Avatar shape="square" icon="pay-circle-o" size={30} style={{marginRight:10,backgroundColor: '#00a8a6'}} /><span style={{verticalAlign:'middle'}}>销售机会（0）</span></div>} 
                            bordered={false} 
                            style={{marginBottom:15}} 
                            extra={<Button style={{verticalAlign:'middle'}} size="small" type="primary" ghost>添加</Button>} 
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
                           <TabPane tab="交易记录" key="3">Pane3</TabPane>
                           <TabPane tab="跟进记录" key="4">Pane4</TabPane>
                       </Tabs>
                    </Col>
                </Row>
            </div>
        )
    }
}

export default Form.create()(CustomersDetail); 