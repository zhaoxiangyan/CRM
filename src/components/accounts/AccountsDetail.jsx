import React,{Component} from 'react';
import { Form, Row, Col, Card, Tabs, Button, DatePicker, Radio, Input, Table, Checkbox,
    Icon, Avatar, Upload, Select, Cascader, Switch } from 'antd';
import BreadcrumbCustom from '../BreadcrumbCustom';
import {FormattedMessage,injectIntl} from 'react-intl';
import moment from 'moment';
import { connect } from 'react-redux';
import styles from './index.module.less';


const TabPane = Tabs.TabPane;
const {TextArea} = Input;
const FormItem = Form.Item;
const Option = Select.Option;
const RadioGroup = Radio.Group;
const RangePicker = DatePicker.RangePicker;
const {Column} = Table;
const CheckboxGroup = Checkbox.Group;


// 出入金记录
const data1 = [{
    key: '1',
    time: '2018-08-28 09:12:09',
    type: 'deposit',
    number: 'USD 200',
    notes: 'dfd2018082811'
}];
// 持仓
const data2 = [];
// 交易历史
const data3 = [];
// 挂单
const data4 = [];
// 账户所有人资料  
// 居住地 级联options
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
// 银行所在地  级联
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
//   投资经验
const experienceoptions = [
    { label: '股票', value: '1' },
    { label: '债券', value: '2' },
    { label: '期货', value: '3' },
    { label: '期权', value: '4' },
    { label: '外汇', value: '5' },
  ];


// this.props.match.params.accountid 动态传参 
class CustomersDetail extends Component{
    state = {
        // 修改
        modify:true,
        // 账户所有人资料  修改
        datamodify:true,
        // 上传文件
        fileList: [{
            uid: '-1',
            name: 'xxx.png',
            status: 'done',
            url: 'https://broker-upload.oss-cn-hangzhou.aliyuncs.com/prod/3c6a17f0-3eec-11e8-9a8b-07bdeefe7e15.png',
        }],
        // 出入金  操作类型
        actiontype:1,
        // 主密码框类型
        mainpasswordType:true,
        // 投资密码框类型
        investmentpasswordType:true
    };
    // 详细信息  修改  取消  
    onModify = () => {
        this.setState({modify:false});
    }
    cancelModify = () => {
        this.setState({modify:true});
    }
    // tabs  交易记录 账户  杠杆  出入金 信用 重置密码 
    callback = (key) => {
        console.log(key);
    }
    // 交易记录  时间选择器
    onChange3 = (dates, dateStrings) => {
        console.log('From: ', dates[0], ', to: ', dates[1]);
        console.log('From: ', dateStrings[0], ', to: ', dateStrings[1]);
    }
    // 账户所有人资料
    // 修改  取消
    onDataModify = () => {
        this.setState({datamodify:false});
    }
    cancelDataModify = () => {
        this.setState({datamodify:true});
    }
    // 出入金
    // 操作类型
    actiontypeChange = (e) => {
        console.log(e.target.value);
        this.setState({actiontype: e.target.value,});
        const {setFieldsValue} = this.props.form;
        if(e.target.value ===1) setFieldsValue({'wdremarks':'Deposit'});
        if(e.target.value ===2) setFieldsValue({'wdremarks':'Withdrawal'});
    }
    // 信用 类型
    credittypeChange = (e) => {
        const {setFieldsValue} = this.props.form;
        if(e.target.value ===1) setFieldsValue({'creditremarks':'Credit in'});
        if(e.target.value ===2) setFieldsValue({'creditremarks':'Credit out'});
    }
    // 重置密码 切换密码框类型
    switchmainPassword = () => {
        this.setState({mainpasswordType:!this.state.mainpasswordType})
    }
    switchinvestmentPassword = () => {
        this.setState({investmentpasswordType:!this.state.investmentpasswordType})
    }
    render(){
        const {intl} = this.props;
        const formItemLayout = {labelCol: { span: 24,style:{paddingBottom:2} },wrapperCol: { span: 24 }};
        const formItemLayout1 = {labelCol: { span: 8 },wrapperCol: { span: 8 }};
        const formItemLayout2 = {labelCol: { span: 8 },wrapperCol: { span: 16 }};
        const formItemLayout3 = {labelCol: { span: 4 },wrapperCol: { span: 20 }};
        const { getFieldDecorator } = this.props.form;
        // 手机select
        const {code} = this.props;
        const inputBefore = getFieldDecorator('code')(
            <Select
                showSearch
                disabled={this.state.datamodify}
                style={{ width: 80 }}
                placeholder="选择国家/地区代码"
                optionFilterProp="children"
                optionLabelProp="value"
                dropdownMatchSelectWidth={false}
                filterOption={(input, option) => (option.props.children[1].props.children.toLowerCase().indexOf(input) >= 0 ||option.props.children[2].props.children.toLowerCase().indexOf(input) >= 0)}
            >
            {code.map(r=>{
                return (
                    <Option key={r.value} value={r.value} className="codeOption"><img src={r.img} alt={r.option} /><span>{r.option}</span><span>{r.value}</span></Option>
                )
            })}
            </Select>
        )
        return(
            <div>
                <BreadcrumbCustom first={<FormattedMessage id="accounts" />} second={<FormattedMessage id="account.management" />} secondlink="/app/accounts" third={<FormattedMessage id="account.detail" />} />
                <Row gutter={30} className="gutter-box">
                    <Col md={9}>
                       <Card 
                       bordered={false} 
                       style={{marginBottom:15}}
                       title={<Row type="flex" justify="space-between" align="middle">
                                <Avatar size={40} icon="wallet" style={{backgroundColor: '#00a8a6'}} />
                                <div style={{flex:1,marginLeft:10}}>
                                    <p style={{marginTop:0,marginBottom:5}}>账号：{this.props.match.params.accountid}（结算货币：）</p>
                                    <p style={{marginTop:0,marginBottom:0}}>
                                        <span style={{marginRight:20}}>返佣用户：Leslie</span>
                                        <span>账户组：请选择</span>
                                    </p>
                                </div>
                            </Row>}
                       >
                            <table className={styles.money_table}>
                                <tbody>
                                    <tr>
                                        <th>余额：</th>
                                        <td>0</td>
                                        <th>信用额：</th>
                                        <td>0</td>
                                    </tr>
                                    <tr>
                                        <th>浮动盈亏：</th>
                                        <td>0</td>
                                        <th>净值：</th>
                                        <td>0</td>
                                    </tr>
                                    <tr>
                                        <th>已用保证金：</th>
                                        <td>0</td>
                                        <th>可用保证金：</th>
                                        <td>0</td>
                                    </tr>
                                    <tr>
                                        <th>保证金比例：</th>
                                        <td>0</td>
                                        <th>创建时间：</th>
                                        <td>2018-08-28 08:41:22</td>
                                    </tr>
                                </tbody>
                            </table>
                       </Card>
                       <Card 
                            title={<div><Icon type="pay-circle" style={{marginRight:10,color: '#00a8a6',fontSize:24,verticalAlign:'middle'}} /><span style={{verticalAlign:'middle'}}>账户信息</span></div>} 
                            extra={this.state.modify&&<a href=" javascript:void(0)" style={{verticalAlign:'middle'}} onClick={this.onModify}><Icon type="form" />修改</a>} 
                            bordered={false} 
                            style={{marginBottom:15}}
                            className={this.state.datamodify&&'disabledcard1'}
                       >    
                            <FormItem {...formItemLayout} label="MT组" style={{marginBottom:10}}>
                                {getFieldDecorator('mtgroup', {
                                    rules: [{ required: true, message: '请选择' }],
                                })(
                                    <Select 
                                    showSearch 
                                    style={{ width: '100%' }} 
                                    disabled={this.state.modify} 
                                    optionFilterProp="children"
                                    filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                                    >
                                        <Option value="1">GQ-50-Offset-00</Option>
                                        <Option value="2">GQ-50-Offset-10</Option>
                                        <Option value="3">GQ-50-Offset-20</Option>
                                        <Option value="4">GQ-50-Offset-30</Option>
                                        <Option value="5">.....</Option>
                                    </Select>
                                )}
                            </FormItem>
                            <FormItem {...formItemLayout} label="杠杆" style={{marginBottom:10}}>
                                {getFieldDecorator('lever', {
                                    rules: [{ required: true, message: '' }],
                                })(
                                    <Select style={{ width: '100%' }} disabled={this.state.modify} >
                                        <Option value="1">1:1</Option>
                                        <Option value="2">1:2</Option>
                                        <Option value="3">1:3</Option>
                                        <Option value="4">.....</Option>
                                    </Select>
                                )}
                            </FormItem>
                            <FormItem {...formItemLayout} label="交易状态" style={{marginBottom:5}}>
                                {getFieldDecorator('tradingstate', {
                                    rules: [{ required: true, message: '' }],
                                    initialValue:1
                                })(
                                    <RadioGroup disabled={this.state.modify}>
                                        <Radio value={1}>启用</Radio>
                                        <Radio value={2}>禁用</Radio>
                                    </RadioGroup>
                                )}
                            </FormItem>
                            <FormItem {...formItemLayout} label="登录状态" style={{marginBottom:5}}>
                                {getFieldDecorator('loginstate', {
                                    rules: [{ required: true, message: '' }],
                                    initialValue:1
                                })(
                                    <RadioGroup disabled={this.state.modify}>
                                        <Radio value={1}>启用</Radio>
                                        <Radio value={2}>禁用</Radio>
                                    </RadioGroup>
                                )}
                            </FormItem>
                            <FormItem {...formItemLayout} label="发送报告" style={{marginBottom:10}}>
                                {getFieldDecorator('report')(<Switch disabled={this.state.modify} />)}
                            </FormItem>
                            <FormItem {...formItemLayout} label="Lead source" style={{marginBottom:10}}>
                                {getFieldDecorator('leadsource')(<Input disabled={this.state.modify} />)}
                            </FormItem>
                            {this.state.modify||<div style={{textAlign:'right'}}>
                                <Button type="primary">保存</Button><Button onClick={this.cancelModify}>取消</Button>
                            </div>}
                       </Card>
                    </Col>
                    <Col md={15}>
                        <Card bordered={false} style={{marginBottom:15}} >
                            <Tabs defaultActiveKey="1" onChange={this.callback}>
                                <TabPane key="1" tab="交易记录">
                                    <RangePicker ranges={{[intl.messages.ranges_day]:[moment(), moment()], [intl.messages.ranges_month]: [moment(), moment().endOf('month')] }} onChange={this.onChange3} />
                                    <div>
                                        <div className={styles.table_title}>出入金记录（{data1.length}）</div>
                                        <Table size="middle" dataSource={data1}>
                                            <Column
                                                title="时间（UTC-3）"
                                                dataIndex="time"
                                                key="time"
                                                sorter= {(a,b) => a.time - b.time}
                                                align="center"
                                            />
                                            <Column
                                                title="操作类型"
                                                dataIndex="type"
                                                key="type"
                                                align="center"
                                            />
                                            <Column
                                                title="数量"
                                                dataIndex="number"
                                                key="number"
                                                align="center"
                                            />
                                            <Column
                                                title="注释"
                                                dataIndex="notes"
                                                key="notes"
                                                align="center"
                                            />
                                        </Table>
                                        <div className={styles.table_title}>持仓（{data2.length}）</div>
                                        <Table size="middle" dataSource={data2}>
                                            <Column
                                                title="开仓时间（UTC-3）"
                                                dataIndex="time"
                                                key="time"
                                                sorter= {(a,b) => a.time - b.time}
                                                align="center"
                                            />
                                            <Column
                                                title="订单号"
                                                dataIndex="ordernumber"
                                                key="ordernumber"
                                                align="center"
                                            />
                                            <Column
                                                title="类型"
                                                dataIndex="type"
                                                key="type"
                                                align="center"
                                            />
                                            <Column
                                                title="品种"
                                                dataIndex="variety"
                                                key="variety"
                                                align="center"
                                            />
                                            <Column
                                                title="交易量"
                                                dataIndex="number"
                                                key="number"
                                                align="center"
                                            />
                                            <Column
                                                title="浮动盈亏"
                                                dataIndex="floating"
                                                key="floating"
                                                align="center"
                                            />
                                        </Table>
                                        <div className={styles.table_title}>交易历史（{data3.length}）</div>
                                        <Table size="middle" dataSource={data3}>
                                            <Column
                                                title="平仓时间（UTC-3）"
                                                dataIndex="time"
                                                key="time"
                                                sorter= {(a,b) => a.time - b.time}
                                                align="center"
                                            />
                                            <Column
                                                title="订单号"
                                                dataIndex="ordernumber"
                                                key="ordernumber"
                                                align="center"
                                            />
                                            <Column
                                                title="类型"
                                                dataIndex="type"
                                                key="type"
                                                align="center"
                                            />
                                            <Column
                                                title="品种"
                                                dataIndex="variety"
                                                key="variety"
                                                align="center"
                                            />
                                            <Column
                                                title="交易量"
                                                dataIndex="number"
                                                key="number"
                                                align="center"
                                            />
                                            <Column
                                                title="盈亏"
                                                dataIndex="pl"
                                                key="pl"
                                                align="center"
                                            />
                                        </Table>
                                        <div className={styles.table_title}>挂单（{data4.length}）</div>
                                        <Table size="middle" dataSource={data4}>
                                            <Column
                                                title="挂单时间（UTC-3）"
                                                dataIndex="time"
                                                key="time"
                                                sorter= {(a,b) => a.time - b.time}
                                                align="center"
                                            />
                                            <Column
                                                title="订单号"
                                                dataIndex="ordernumber"
                                                key="ordernumber"
                                                align="center"
                                            />
                                            <Column
                                                title="类型"
                                                dataIndex="type"
                                                key="type"
                                                align="center"
                                            />
                                            <Column
                                                title="品种"
                                                dataIndex="variety"
                                                key="variety"
                                                align="center"
                                            />
                                            <Column
                                                title="挂单价"
                                                dataIndex="price"
                                                key="price"
                                                align="center"
                                            />
                                            <Column
                                                title="交易量"
                                                dataIndex="number"
                                                key="number"
                                                align="center"
                                            />
                                            <Column
                                                title="执行/取消时间"
                                                dataIndex="actiontime"
                                                key="actiontime"
                                                align="center"
                                            />
                                        </Table>
                                    </div>
                                </TabPane>
                                <TabPane key="2" tab="账户所有人资料">
                                    <Card
                                    type="inner"
                                    bordered={false}
                                    >
                                        <FormItem {...formItemLayout} label="所属客户" style={{marginBottom:0,textAlign:'left'}}>
                                            {getFieldDecorator('ownercustomer', {
                                                rules: [{ required: false, message: '请选择客户' }],
                                            })(
                                                <Select
                                                    showSearch
                                                    style={{ width: 200 }}
                                                    placeholder="输入客户编号/客户名称搜索"
                                                    optionFilterProp="children"
                                                    filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}  
                                                >
                                                <Option value="1">选项1</Option>
                                                <Option value="2">....</Option>
                                                </Select>
                                                /* 远程搜索option项 */
                                            )}
                                        </FormItem>
                                    </Card>
                                    <Card 
                                    type="inner" 
                                    title="账户所有人资料"
                                    bordered={false}
                                    extra={this.state.datamodify&&<a href=" javascript:void(0)" style={{verticalAlign:'middle'}} onClick={this.onDataModify}><Icon type="form" />修改</a>} 
                                    className={this.state.datamodify&&'disabledcard1'}
                                    >
                                        <Form hideRequiredMark>
                                            <Row gutter={50}>
                                                <Col span={12}>
                                                    <FormItem {...formItemLayout} label="手机" style={{marginBottom:10}}>
                                                        {getFieldDecorator('phone', {
                                                            rules: [{ required: false, message: '请输入手机号码!' }]
                                                        })(
                                                            <Input addonBefore={inputBefore} placeholder="" disabled={this.state.datamodify} />
                                                        )}
                                                    </FormItem>
                                                    <FormItem {...formItemLayout} label="即时通讯" style={{marginBottom:10}}>
                                                        {getFieldDecorator('IM')(<Input disabled={this.state.datamodify} />)}
                                                    </FormItem>
                                                </Col>
                                                <Col span={12}>
                                                    <FormItem {...formItemLayout} label="Email" style={{marginBottom:10}}>
                                                        {getFieldDecorator('email', {
                                                            rules: [{ required: true, message: 'Email is required' }],
                                                        })(
                                                            <Input placeholder="" disabled={this.state.datamodify} />
                                                        )}
                                                    </FormItem>
                                                </Col>
                                            </Row>
                                            <Tabs defaultActiveKey="1">
                                                <TabPane key="1" tab="基本资料">
                                                    <Row gutter={50}>
                                                        <Col span={12}>
                                                            <FormItem {...formItemLayout} label="姓名" style={{marginBottom:10}}>
                                                                {getFieldDecorator('name', {
                                                                    rules: [{ required: true, message: '请填写姓名' }],
                                                                })(
                                                                    <Input disabled={this.state.datamodify} />
                                                                )}
                                                            </FormItem>
                                                            <FormItem {...formItemLayout} label="出生年月" style={{marginBottom:10}}>
                                                                {getFieldDecorator('birth', {
                                                                    rules: [{ required: true, message: '请选择日期' }],
                                                                })(
                                                                    <DatePicker style={{width:'100%'}} disabled={this.state.datamodify} />
                                                                )}
                                                            </FormItem>
                                                            <FormItem {...formItemLayout} label="居住地" style={{marginBottom:10}}>
                                                                {getFieldDecorator('residence', {
                                                                    rules: [{ required: true, message: '' }],
                                                                })(
                                                                    <Cascader disabled={this.state.datamodify} options={cascaderOptions} onChange={this.cascaderChange} placeholder="Please select" />
                                                                )}
                                                            </FormItem>
                                                        </Col>
                                                        <Col span={12}>
                                                            <FormItem {...formItemLayout} label="性别" style={{marginBottom:10}}>
                                                                {getFieldDecorator('sex', {
                                                                    rules: [{ required: true, message: '请选择性别' }],
                                                                })(
                                                                    <Select disabled={this.state.datamodify}>
                                                                        <Option value="0">男</Option>
                                                                        <Option value="1">女</Option>
                                                                    </Select>
                                                                )}
                                                            </FormItem>
                                                            <FormItem {...formItemLayout} label="国家和地区" style={{marginBottom:10}}>
                                                                {getFieldDecorator('country', {
                                                                    rules: [{required:true,message:'请选择国家和地区'}]
                                                                })(
                                                                    <Select style={{ width: '100%' }} disabled={this.state.datamodify}>
                                                                        <Option value="0">中国大陆</Option>
                                                                        <Option value="1">中国香港</Option>
                                                                        <Option value="2">中国台湾</Option>
                                                                    </Select>
                                                                )}
                                                            </FormItem>
                                                            <FormItem {...formItemLayout} label="邮编" style={{marginBottom:10}}>
                                                                {getFieldDecorator('zip',{
                                                                    rules:[{required:true,message:'请填写邮编'}]
                                                                })(
                                                                    <Input disabled={this.state.datamodify} />
                                                                )}
                                                            </FormItem>
                                                        </Col>
                                                        <Col span={24}>
                                                            <FormItem {...formItemLayout} label="详细地址" style={{marginBottom:10}}>
                                                                {getFieldDecorator('address', {
                                                                    rules: [{ required: true, message: '请填写详细地址!' }],
                                                                })(
                                                                    <Input disabled={this.state.datamodify} />
                                                                )}
                                                            </FormItem>
                                                            <FormItem {...formItemLayout} label="备注" style={{marginBottom:10}}>
                                                                {getFieldDecorator('basicremarks', {
                                                                    rules: [{ required: false, message: '请输入备注!' }],
                                                                })(
                                                                    <TextArea rows={3} disabled={this.state.datamodify} />
                                                                )}
                                                            </FormItem>
                                                        </Col>  
                                                    </Row>
                                                </TabPane>
                                                <TabPane key="2" tab="财务信息">
                                                    <Row gutter={50}>
                                                        <Col span={12}>
                                                            <FormItem {...formItemLayout} label="总资产" style={{marginBottom:10}}>
                                                                {getFieldDecorator('totalassets', {
                                                                    rules: [{ required: true, message: '请选择' }],
                                                                })(
                                                                    <Select style={{ width: '100%' }} disabled={this.state.datamodify}>
                                                                        <Option value="0">0-500000</Option>
                                                                        <Option value="1">500001-1000000</Option>
                                                                        <Option value="2">1000001-1500000</Option>
                                                                        <Option value="3">1500001-2000000</Option>
                                                                        <Option value="4">2000001-5000000</Option>
                                                                        <Option value="5">5000001-7500000</Option>
                                                                        <Option value="6">7500001-10000000</Option>
                                                                        <Option value="7">10000001-20000000</Option>
                                                                        <Option value="8">20000001-30000000</Option>
                                                                        <Option value="9">30000001-50000000</Option>
                                                                        <Option value="10">&gt;50000000</Option>
                                                                    </Select>
                                                                )}
                                                            </FormItem>
                                                            <FormItem {...formItemLayout} label="收入来源" style={{marginBottom:10}}>
                                                                {getFieldDecorator('sourceofincome', {
                                                                    rules: [{ required: true, message: '请选择' }],
                                                                })(
                                                                    <Select style={{ width: '100%' }} disabled={this.state.datamodify}>
                                                                        <Option value="0">工资储蓄</Option>
                                                                        <Option value="1">版税</Option>
                                                                        <Option value="2">遗产</Option>
                                                                        <Option value="3">交易利润</Option>
                                                                        <Option value="4">其他</Option>
                                                                    </Select>
                                                                )}
                                                            </FormItem>
                                                            <FormItem {...formItemLayout} label="投资年数" style={{marginBottom:10}}>
                                                                {getFieldDecorator('years', {
                                                                    rules: [{ required: true, message: '请选择' }],
                                                                })(
                                                                    <Select style={{ width: '100%' }} disabled={this.state.datamodify}>
                                                                        <Option value="0">0~5</Option>
                                                                        <Option value="1">5~10</Option>
                                                                        <Option value="2">10~20</Option>
                                                                        <Option value="3">&gt;20</Option>
                                                                    </Select>
                                                                )}
                                                            </FormItem>
                                                            <FormItem {...formItemLayout} label="投资目的" style={{marginBottom:10}}>
                                                                {getFieldDecorator('investmentpurpose', {
                                                                    rules: [{ required: true, message: '请选择' }],
                                                                })(
                                                                    <Input disabled={this.state.datamodify} />
                                                                )}
                                                            </FormItem>
                                                            <FormItem {...formItemLayout} label="开户银行" style={{marginBottom:10}}>
                                                                {getFieldDecorator('openbank', {
                                                                    rules: [{ required: true, message: '请选择' }],
                                                                })(
                                                                    <Select style={{ width: '100%' }} disabled={this.state.datamodify}>
                                                                        <Option value="0">中国银行</Option>
                                                                        <Option value="1">中国农业银行</Option>
                                                                        <Option value="2">中国建设银行</Option>
                                                                        <Option value="3">国家开发银行</Option>
                                                                        <Option value="4">中国进出口银行</Option>
                                                                        <Option value="5">....</Option>
                                                                    </Select>
                                                                )}
                                                            </FormItem>
                                                            <FormItem {...formItemLayout} label="银行账号" style={{marginBottom:10}}>
                                                                {getFieldDecorator('bankaccount', {
                                                                    rules: [{ required: true, message: '请选择' }],
                                                                })(
                                                                    <Input disabled={this.state.datamodify} />
                                                                )}
                                                            </FormItem>
                                                            <FormItem {...formItemLayout} label="你是否有至少2个月的交易经验" style={{marginBottom:10}}>
                                                                {getFieldDecorator('twomonths', {
                                                                    rules: [{ required: true, message: '请选择' }],
                                                                })(
                                                                    <Select style={{ width: '100%' }} disabled={this.state.datamodify} >
                                                                        <Option value="0">是</Option>
                                                                        <Option value="1">否</Option>
                                                                    </Select>
                                                                )}
                                                            </FormItem>
                                                            <FormItem {...formItemLayout} label="请提供可以帮助您理解我们服务的专业经验和背景" style={{marginBottom:10}}>
                                                                {getFieldDecorator('provide', {
                                                                    rules: [{ required: true, message: '请选择' }],
                                                                })(
                                                                    <Select style={{ width: '100%' }} disabled={this.state.datamodify}>
                                                                        <Option value="0">具有金融机构的相关工作经验</Option>
                                                                        <Option value="1">具有金融相关的教育背景和专业资质</Option>
                                                                        <Option value="2">没有</Option>
                                                                    </Select>
                                                                )}
                                                            </FormItem>
                                                        </Col>
                                                        <Col span={12}>
                                                            <FormItem {...formItemLayout} label="净资产" style={{marginBottom:10}}>
                                                                {getFieldDecorator('netassets', {
                                                                    rules: [{ required: true, message: '请选择' }],
                                                                })(
                                                                    <Select style={{ width: '100%' }} disabled={this.state.datamodify}>
                                                                        <Option value="0">0-500000</Option>
                                                                        <Option value="1">500001-1000000</Option>
                                                                        <Option value="2">1000001-1500000</Option>
                                                                        <Option value="3">1500001-2000000</Option>
                                                                        <Option value="4">2000001-5000000</Option>
                                                                        <Option value="5">5000001-7500000</Option>
                                                                        <Option value="6">7500001-10000000</Option>
                                                                        <Option value="7">10000001-20000000</Option>
                                                                        <Option value="8">20000001-30000000</Option>
                                                                        <Option value="9">30000001-50000000</Option>
                                                                        <Option value="10">&gt;50000000</Option>
                                                                    </Select>
                                                                )}
                                                            </FormItem>
                                                            <FormItem {...formItemLayout} label="投资经验" style={{marginBottom:10}}>
                                                                {getFieldDecorator('investmentexperience', {
                                                                    rules: [{ required: true, message: '请选择' }],
                                                                    initialValue:['1']
                                                                })(
                                                                    <CheckboxGroup disabled={this.state.datamodify} options={experienceoptions} onChange={this.experienceChange} />
                                                                )}
                                                            </FormItem>
                                                            <FormItem {...formItemLayout} label="知识水平" style={{marginBottom:10}}>
                                                                {getFieldDecorator('knowlevel', {
                                                                    rules: [{ required: true, message: '请选择' }],
                                                                })(
                                                                    <Select style={{ width: '100%' }} disabled={this.state.datamodify}>
                                                                        <Option value="0">小学</Option>
                                                                        <Option value="1">初中</Option>
                                                                        <Option value="2">高中</Option>
                                                                        <Option value="3">大专</Option>
                                                                        <Option value="4">本科</Option>
                                                                        <Option value="5">研究生</Option>
                                                                        <Option value="6">硕士研究生</Option>
                                                                        <Option value="7">博士研究生</Option>
                                                                    </Select>
                                                                )}
                                                            </FormItem>
                                                            <FormItem {...formItemLayout} label="投资额度" style={{marginBottom:10}}>
                                                                {getFieldDecorator('investmentquota', {
                                                                    rules: [{ required: true, message: '请选择' }],
                                                                })(
                                                                    <Select style={{ width: '100%' }} disabled={this.state.datamodify}>
                                                                        <Option value="0">0-500000</Option>
                                                                        <Option value="1">500001-1000000</Option>
                                                                        <Option value="2">1000001-1500000</Option>
                                                                        <Option value="3">1500001-2000000</Option>
                                                                        <Option value="4">2000001-5000000</Option>
                                                                        <Option value="5">5000001-7500000</Option>
                                                                        <Option value="6">7500001-10000000</Option>
                                                                        <Option value="7">10000001-20000000</Option>
                                                                        <Option value="8">20000001-30000000</Option>
                                                                        <Option value="9">30000001-50000000</Option>
                                                                        <Option value="10">&gt;50000000</Option>
                                                                    </Select>
                                                                )} 
                                                            </FormItem>
                                                            <FormItem {...formItemLayout} label="银行所在地" style={{marginBottom:10}}>
                                                                {getFieldDecorator('banklocation', {
                                                                    rules: [{ required: true, message: '请选择' }],
                                                                    initialValue:['zhongguo','jiangxi','jiujiang']
                                                                })(
                                                                    <Cascader disabled={this.state.datamodify} options={options} placeholder="Please select" style={{width:'100%'}} />
                                                                )}  
                                                            </FormItem>
                                                            <FormItem {...formItemLayout} label="银行支行" style={{marginBottom:10}}>
                                                                {getFieldDecorator('bankbranch', {
                                                                    rules: [{ required: true, message: '请填写银行支行' }],
                                                                })(
                                                                    <Input disabled={this.state.datamodify} />
                                                                )} 
                                                            </FormItem>
                                                            <FormItem {...formItemLayout} label="过去三年，你曾经通过一个类似的机构，交易过OTC的保证金外汇或CFD交易么" style={{marginBottom:10}}>
                                                                {getFieldDecorator('3years', {
                                                                    rules: [{ required: true, message: '请选择' }],
                                                                })(
                                                                    <Select disabled={this.state.datamodify}>
                                                                        <Option value="0">是</Option>
                                                                        <Option value="1">否</Option>
                                                                    </Select>
                                                                )} 
                                                            </FormItem>
                                                            <FormItem {...formItemLayout} label="在过去的12个月内，您是否至少交易过20次？" style={{marginBottom:10}}>
                                                                {getFieldDecorator('20times', {
                                                                    rules: [{ required: true, message: '请选择' }],
                                                                })(
                                                                    <Select disabled={this.state.datamodify}>
                                                                        <Option value="0">是</Option>
                                                                        <Option value="1">否</Option>
                                                                    </Select>
                                                                )} 
                                                            </FormItem>
                                                        </Col>
                                                        <Col span={24}>
                                                            <FormItem {...formItemLayout} label="备注" style={{marginBottom:10}}>
                                                                {getFieldDecorator('financeremarks')(
                                                                    <TextArea rows={3} disabled={this.state.datamodify} />
                                                                )} 
                                                            </FormItem>
                                                        </Col>  
                                                    </Row> 
                                                </TabPane>
                                                <TabPane key="3" tab="证件信息">
                                                    <Row gutter={50}>
                                                        <Col span={12}>
                                                            <FormItem {...formItemLayout} label="身份证明类型" style={{marginBottom:10}}>
                                                                {getFieldDecorator('cardtype', {
                                                                    rules: [{ required: true, message: '请选择身份证明类型!' }],
                                                                })(
                                                                    <Select style={{width:'100%'}} disabled={this.state.datamodify}>
                                                                        <Option value="1">营业执照</Option>
                                                                        <Option value="2">组织机构代码证</Option>
                                                                        <Option value="3">税务登记证</Option>
                                                                        <Option value="4">商业登记证</Option>
                                                                        <Option value="5">身份证</Option>
                                                                        <Option value="6">户口簿</Option>
                                                                        <Option value="7">护照</Option>
                                                                        <Option value="8">军官证</Option>
                                                                        <Option value="9">士兵证</Option>
                                                                        <Option value="10">香港居民来往内地通行证</Option>
                                                                        <Option value="11">台湾居民来往内地通行证</Option>
                                                                        <Option value="12">外国人居留证</Option>
                                                                        <Option value="13">警官证</Option>
                                                                        <Option value="14">驾驶证</Option>
                                                                        <Option value="15">其他证件</Option>
                                                                    </Select>
                                                                )}
                                                            </FormItem>
                                                            <FormItem {...formItemLayout} label="身份证明A" style={{marginBottom:10}}>
                                                                {getFieldDecorator('carda', {
                                                                        valuePropName: 'fileList',
                                                                        getValueFromEvent: this.normFile,
                                                                        initialValue:this.state.fileList,
                                                                        rules: [{ required: true, message: '请上传!' }],
                                                                    })(
                                                                    <Upload 
                                                                    disabled={this.state.datamodify}
                                                                    name="logo" 
                                                                    action="https://www.easy-mock.com/mock/5b6a978b91ff8e254d62047e/crm/upload" 
                                                                    accept="image/*" 
                                                                    listType="picture"
                                                                    onPreview={this.uploadPreview} 
                                                                    >
                                                                        <Button>
                                                                        <Icon type="upload" /> Click to upload
                                                                        </Button>
                                                                    </Upload>
                                                                )}
                                                            </FormItem>
                                                            <FormItem {...formItemLayout} label="银行卡证明A" style={{marginBottom:10}}>
                                                                {getFieldDecorator('banka', {
                                                                        valuePropName: 'fileList',
                                                                        getValueFromEvent: this.normFile,
                                                                        initialValue:this.state.fileList,
                                                                        rules: [{ required: true, message: '请上传!' }],
                                                                    })(
                                                                    <Upload 
                                                                    disabled={this.state.datamodify}
                                                                    name="logo" 
                                                                    action="https://www.easy-mock.com/mock/5b6a978b91ff8e254d62047e/crm/upload" 
                                                                    accept="image/*" 
                                                                    listType="picture"
                                                                    onPreview={this.uploadPreview} 
                                                                    >
                                                                        <Button>
                                                                        <Icon type="upload" /> Click to upload
                                                                        </Button>
                                                                    </Upload>
                                                                )}
                                                            </FormItem>
                                                            <FormItem {...formItemLayout} label="手持身份证" style={{marginBottom:10}}>
                                                                {getFieldDecorator('handcard', {
                                                                    rules: [{ required: true, message: '请选择!' }],
                                                                })(
                                                                    <Select style={{width:'100%'}} disabled={this.state.datamodify}>
                                                                        <Option value="1">手持身份证</Option>
                                                                    </Select>
                                                                )}
                                                            </FormItem>
                                                        </Col>
                                                        <Col span={12}>
                                                            <FormItem {...formItemLayout} label="身份证明号码" style={{marginBottom:10}}>
                                                                {getFieldDecorator('cardnumber', {
                                                                    rules: [{ required: true, message: '请填写!' }],
                                                                })(
                                                                    <Input disabled={this.state.datamodify} />
                                                                )}
                                                            </FormItem>
                                                            <FormItem {...formItemLayout} label="身份证明B" style={{marginBottom:10}}>
                                                                {getFieldDecorator('cardb', {
                                                                        valuePropName: 'fileList',
                                                                        getValueFromEvent: this.normFile,
                                                                        initialValue:this.state.fileList,
                                                                        rules: [{ required: true, message: '请上传!' }],
                                                                    })(
                                                                    <Upload 
                                                                    disabled={this.state.datamodify}
                                                                    name="logo" 
                                                                    action="https://www.easy-mock.com/mock/5b6a978b91ff8e254d62047e/crm/upload" 
                                                                    accept="image/*" 
                                                                    listType="picture"
                                                                    onPreview={this.uploadPreview} 
                                                                    >
                                                                        <Button>
                                                                        <Icon type="upload" /> Click to upload
                                                                        </Button>
                                                                    </Upload>
                                                                )}
                                                            </FormItem>
                                                            <FormItem {...formItemLayout} label="银行卡证明B" style={{marginBottom:10}}>
                                                                {getFieldDecorator('bankb', {
                                                                        valuePropName: 'fileList',
                                                                        getValueFromEvent: this.normFile,
                                                                        initialValue:this.state.fileList,
                                                                        rules: [{ required: true, message: '请上传!' }],
                                                                    })(
                                                                    <Upload 
                                                                    disabled={this.state.datamodify}
                                                                    name="logo" 
                                                                    action="https://www.easy-mock.com/mock/5b6a978b91ff8e254d62047e/crm/upload" 
                                                                    accept="image/*" 
                                                                    listType="picture"
                                                                    onPreview={this.uploadPreview} 
                                                                    >
                                                                        <Button>
                                                                        <Icon type="upload" /> Click to upload
                                                                        </Button>
                                                                    </Upload>
                                                                )}
                                                            </FormItem>
                                                        </Col>
                                                    </Row> 
                                                </TabPane>
                                            </Tabs>
                                            {this.state.datamodify||<div style={{textAlign:'right'}}>
                                                <Button type="primary">保存</Button><Button onClick={this.cancelDataModify}>取消</Button>
                                            </div>}
                                        </Form>
                                    </Card>
                                </TabPane>
                                <TabPane key="3" tab="杠杆">
                                    <Form>
                                        <Row>
                                            <Col>
                                                <FormItem {...formItemLayout1} label="修改杠杆" style={{marginBottom:10}}>
                                                    {getFieldDecorator('amendlever', {
                                                        rules: [{ required: true, message: '请选择杠杆!' }],
                                                        initialValue:'4'
                                                    })(
                                                        <Select>
                                                            <Option value="1">1:1</Option>
                                                            <Option value="2">1:2</Option>
                                                            <Option value="3">1:3</Option>
                                                            <Option value="4">1:200</Option>
                                                            <Option value="5">....</Option>
                                                        </Select>
                                                    )}
                                                </FormItem>
                                                <FormItem {...formItemLayout1} label="发送修改杠杆邮件" style={{marginBottom:10}}>
                                                    {getFieldDecorator('emailforlever')(<Switch />)}
                                                </FormItem>
                                            </Col>
                                            <Col offset={8}><Button type="primary">保存</Button></Col>
                                        </Row> 
                                    </Form>
                                </TabPane>
                                <TabPane key="4" tab="出入金">
                                    <Form>
                                        <Row>
                                            <Col span={12}>
                                                <FormItem {...formItemLayout2} label="操作类型" style={{marginBottom:10}}>
                                                    {getFieldDecorator('actiontype', {
                                                        rules: [{ required: true, message: '请选择操作类型!' }],
                                                        initialValue:1
                                                    })(
                                                        <RadioGroup onChange={this.actiontypeChange}>
                                                            <Radio value={1}>入金</Radio>
                                                            <Radio value={2}>出金</Radio>
                                                        </RadioGroup>
                                                    )}
                                                </FormItem>
                                                <FormItem {...formItemLayout2} label="金额" style={{marginBottom:10}}>
                                                    {getFieldDecorator('money', {
                                                        rules: [{ required: true, message: '请填写金额!' }]
                                                    })(
                                                        <Input />
                                                    )}
                                                </FormItem>
                                            </Col>
                                            <Col span={12}>
                                                <FormItem {...formItemLayout2} label={this.state.actiontype === 1?"入金类型":"出金类型"} style={{marginBottom:10}}>
                                                    {getFieldDecorator('withdrawaldeposittype', {
                                                        rules: [{ required: false, message: '请选择出入金类型!' }]
                                                    })(
                                                        this.state.actiontype ===1?<Select>
                                                            <Option value="1">任务入金</Option>
                                                            <Option value="2">返佣入金</Option>
                                                            <Option value="3">任务转账入金</Option>
                                                            <Option value="4">其他入金类型</Option>
                                                            <Option value="5">外佣入金</Option>
                                                            <Option value="6">赠金入金</Option>
                                                            <Option value="7">清零入金</Option>
                                                        </Select>:<Select>
                                                            <Option value="1">任务出金</Option>
                                                            <Option value="2">任务转账出金</Option>
                                                            <Option value="3">其他出金类型</Option>
                                                            <Option value="4">代理商返佣&佣金出金</Option>
                                                        </Select>  
                                                    )}
                                                </FormItem>
                                                <FormItem {...formItemLayout2} label="发送出入金邮件" style={{marginBottom:10}}>
                                                    {getFieldDecorator('emailforwd')(<Switch />)}
                                                </FormItem>
                                            </Col>
                                            <Col span={24}>
                                                <FormItem {...formItemLayout3} label="备注" style={{marginBottom:10}}>
                                                    {getFieldDecorator('wdremarks',{
                                                        initialValue:this.state.actiontype?'Deposit':'Withdrawal'
                                                    })(
                                                        <TextArea rows={3} />
                                                    )}
                                                </FormItem>
                                            </Col>
                                            <Col span={20} offset={4}><Button type="primary">保存</Button></Col>
                                        </Row> 
                                    </Form>
                                </TabPane>
                                <TabPane key="5" tab="信用">
                                    <Form>
                                        <Row>
                                            <Col span={12}>
                                                <FormItem {...formItemLayout2} label="操作类型" style={{marginBottom:10}}>
                                                    {getFieldDecorator('credittype', {
                                                        rules: [{ required: false, message: '请选择类型!' }],
                                                        initialValue:1
                                                    })(
                                                        <RadioGroup onChange={this.credittypeChange}>
                                                            <Radio value={1}>借信用</Radio>
                                                            <Radio value={2}>还信用</Radio>
                                                        </RadioGroup>
                                                    )}
                                                </FormItem>
                                                <FormItem {...formItemLayout2} label="金额" style={{marginBottom:10}}>
                                                    {getFieldDecorator('creditmoney', {
                                                        rules: [{ required: true, message: '请填写金额!' }]
                                                    })(
                                                        <Input />
                                                    )}
                                                </FormItem>
                                            </Col>
                                            <Col span={12}>
                                                <FormItem {...formItemLayout2} label="到期时间" style={{marginBottom:10}}>
                                                    {getFieldDecorator('credittime', {
                                                        rules: [{ required: true, message: '请选择到期时间!' }]
                                                    })(
                                                        <DatePicker /> 
                                                    )}
                                                </FormItem>
                                                <FormItem {...formItemLayout2} label="发送信用调整邮件" style={{marginBottom:10}}>
                                                    {getFieldDecorator('emailcredit')(<Switch />)}
                                                </FormItem>
                                            </Col>
                                            <Col span={24}>
                                                <FormItem {...formItemLayout3} label="备注" style={{marginBottom:10}}>
                                                    {getFieldDecorator('creditremarks',{
                                                        initialValue:'Credit in'
                                                    })(
                                                        <TextArea rows={3} />
                                                    )}
                                                </FormItem>
                                            </Col>
                                            <Col span={20} offset={4}><Button type="primary">保存</Button></Col>
                                        </Row> 
                                    </Form>
                                </TabPane>
                                <TabPane key="6" tab="重置密码">
                                    <Form>
                                        <Row>
                                            <Col>
                                                <FormItem {...formItemLayout1} label="主密码" style={{marginBottom:10}}>
                                                    {getFieldDecorator('mainpassword', {
                                                        rules: [{ required: true, message: '请填写主密码!' }],
                                                    })(
                                                        <div style={{position:'relative'}}>
                                                            <Input type={this.state.mainpasswordType?'password':'text'} placeholder="" />
                                                            <Icon type={this.state.mainpasswordType?'eye':'eye-o'} style={{fontSize:18,position:'absolute',top:10,right:5,cursor:'pointer'}} onClick={this.switchmainPassword} />
                                                        </div>
                                                    )}
                                                </FormItem>
                                                <FormItem {...formItemLayout1} label="投资密码" style={{marginBottom:10}}>
                                                    {getFieldDecorator('investmentpassword', {
                                                        rules: [{ required: true, message: '请填写投资密码!' }],
                                                    })(
                                                        <div style={{position:'relative'}}>
                                                            <Input type={this.state.investmentpasswordType?'password':'text'} placeholder="" />
                                                            <Icon type={this.state.investmentpasswordType?'eye':'eye-o'} style={{fontSize:18,position:'absolute',top:10,right:5,cursor:'pointer'}} onClick={this.switchinvestmentPassword} />
                                                        </div>
                                                    )}
                                                </FormItem>
                                                <FormItem {...formItemLayout1} label="发送重置密码邮件" style={{marginBottom:10}}>
                                                    {getFieldDecorator('emailpassword')(<Switch />)}
                                                </FormItem>
                                            </Col>
                                            <Col offset={8}><Button type="primary">保存</Button></Col>
                                        </Row> 
                                    </Form>
                                </TabPane>
                            </Tabs>
                        </Card>
                    </Col>
                </Row>
            </div>
        )
    }
}

const mapStateToProps = state => {
    const { code = {data: {}} } = state.httpData;
    return {code};
};


export default connect(mapStateToProps)(injectIntl(Form.create()(CustomersDetail))); 