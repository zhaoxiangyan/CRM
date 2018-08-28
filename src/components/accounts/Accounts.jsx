// 账户
import React, {Component} from 'react';
import { Row, Col, Card, Table, Button, Icon, Select, DatePicker, Input, Pagination, 
    Drawer, Form, Upload, Modal, Checkbox, Radio, Cascader, Switch, Alert } from 'antd';
import BreadcrumbCustom from '../BreadcrumbCustom';
import {FormattedMessage,injectIntl} from 'react-intl';
import axios from 'axios';
import * as config from '../../axios/config';
import { connect } from 'react-redux';
import moment from 'moment';
import {Link} from 'react-router-dom';

const Option = Select.Option;
const RangePicker = DatePicker.RangePicker;
const InputGroup = Input.Group;
const Search = Input.Search;
const FormItem = Form.Item;
const {TextArea} = Input;
const RadioGroup = Radio.Group;
const CheckboxGroup = Checkbox.Group;


const columns = [{
  title: <FormattedMessage id="account" />,
  dataIndex: 'account',
  align:'center',
  render:text=><Link to={`/app/accounts/${text}`} >{text}</Link>,
  sorter: (a,b) => a.account - b.account
}, {
  title: <FormattedMessage id="bound.customer" />,
  dataIndex: 'boundcustomer',
  align:'center',
}, {
    title: <FormattedMessage id="account.name" />,
    dataIndex: 'accountname',
    align:'center'
}, {
    title: <FormattedMessage id="group" />,
    dataIndex: 'group',
    align:'center'
}, {
    title: <FormattedMessage id="leverage" />,
    dataIndex: 'leverage',
    align:'center'
}, {
    title: <FormattedMessage id="rebating.user" />,
    dataIndex: 'rebatinguser',
    align:'center'
}, {
    title: <FormattedMessage id="transaction.status" />,
    dataIndex: 'transactionstatus',
    align:'center',
    render:text=><Icon type={text?'check':'close'} style={text?{color:'#00a8a6',fontWeight:'bold'}:{}} />,
}, {
    title: <FormattedMessage id="login.status" />,
    dataIndex: 'loginstatus',
    align:'center',
    render:text=><Icon type={text?'check':'close'} style={text?{color:'#00a8a6',fontWeight:'bold'}:{}} />,
}, {
    title: <FormattedMessage id="account.created.time" />,
    dataIndex: 'createtime',
    align:'center',
    sorter: (a,b) => a.createtime - b.createtime
}, {
    title: <FormattedMessage id="balance" />,
    dataIndex: 'balance',
    align:'center',
    sorter: (a,b) => a.balance - b.balance
}, {
    title: <FormattedMessage id="floating.pl" />,
    dataIndex: 'floating',
    align:'center',
    sorter: (a,b) => a.floating - b.floating
}, {
    title: <FormattedMessage id="equity" />,
    dataIndex: 'equity',
    align:'center',
    sorter: (a,b) => a.equity - b.equity
}, {
    title: <FormattedMessage id="used.margin" />,
    dataIndex: 'usedmargin',
    align:'center',
    sorter: (a,b) => a.usedmargin - b.usedmargin
}, {
    title: <FormattedMessage id="available.margin" />,
    dataIndex: 'availablemargin',
    align:'center',
    sorter: (a,b) => a.availablemargin - b.availablemargin
}, {
    title: <FormattedMessage id="margin.ratio" />,
    dataIndex: 'marginratio',
    align:'center',
    sorter: (a,b) => a.marginratio - b.marginratio
}, {
    title: <FormattedMessage id="credit" />,
    dataIndex: 'credit',
    align:'center',
    sorter: (a,b) => a.credit - b.credit
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



class Accounts extends Component {
    state = {
        // 数据更新时间
        refreshtime:'',
        selectedRowKeys: [], // Check here to configure the default column
        reloadloading: false,
        loading:true,
        data:{},
        // 抽屉
        visible:false,
        // radio
        radiovalue:0,
        // 绑定客户选中
        bindselected:false,
        // 登录密码框类型
        passwordType:true,
        // 上传文件
        fileList: [{
            uid: '-1',
            name: 'xxx.png',
            status: 'done',
            url: 'https://broker-upload.oss-cn-hangzhou.aliyuncs.com/prod/3c6a17f0-3eec-11e8-9a8b-07bdeefe7e15.png',
        }],
        // 上传文件预览modal
        previewVisible: false,
        previewImage: '',
        // 手机号区号
        code:'',
        // 列表数据查询条件
        search:{
           type:'0',
           status:'0',
           timetype:'0',
           start:'',
           end:'',
           source:'0',
           keywordtype:'0',
           keyword:'',
           page:'1',
           pagesize:'10'
        },
        // 总条数
        total:50

    };
    componentWillMount() {
        this.getCustomerlists();
        this.setState({refreshtime:moment(new Date()).format('YYYY-MM-DD hh:mm:ss')})
    }
    componentDidMount(){
        axios.get(config.MOCK_ACCOUNTS).then(res => {
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
    // 获取账户列表
    getCustomerlists = () => {
        console.log(this.state.search);
    }
    // 数据更新
    refresh = () => {
        this.setState({loading:true});
        axios.get(config.MOCK_ACCOUNTS).then(res => {
            console.log(typeof(res.data.data));
            this.setState({data:res.data,loading:false,refreshtime:moment(new Date()).format('YYYY-MM-DD hh:mm:ss')});
        }).catch(err => {
            console.log(err);
        }); 
    }
    // 取消
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
    // 表格勾选
    onSelectChange = (selectedRowKeys) => {
        console.log('selectedRowKeys changed: ', selectedRowKeys);
        this.setState({ selectedRowKeys });
    }
    // 第一个select DD
    handleChange1 = (value) => {
        this.setState({search:{type:`${value}`}},()=>{this.getCustomerlists();});
    }
    // 第二个select 所有账户
    handleChange2 = (value) => {
        console.log(`selected ${value}`);
    }
    // 时间选择器 账户创建时间
    onChange3 = (dates, dateStrings) => {
        console.log('From: ', dates[0], ', to: ', dates[1]);
        console.log('From: ', dateStrings[0], ', to: ', dateStrings[1]);
    }
    // 第四个select 姓名
    handleChange4 = (value) => {
        console.log(`selected ${value}`);
    }
    // 关键词搜索
    handleSearch = (value) => {
        console.log(value);
    }
    // 分页器
    pageChange = (page,pageSize) => {
        console.log(page,pageSize);
    }
    pagesizeChange = (current,size) => {
        console.log(current,size);
    }
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
    radioChange = (e) => {
        console.log('radio checked', e.target.value);
        this.setState({
          radiovalue: e.target.value,
        });
        if(e.target.value === 0){this.setState({bindselected:false});}
    }
    // 绑定客户 
    bindChange = (value) => {
        console.log(`${value}`);
        this.setState({bindselected:true});
    }
    // 投资经验
    experienceChange = (values) =>{
        console.log(values);
    }
    // cascader级联选择
    cascaderChange = (value) => {
        console.log(value);
    }
    // 手机区号选择
    phoneChange = (value) => {
        console.log(value);
        // this.props.form.setFieldsValue({phone:`${value} `});
        this.setState({code:`${value} `});
    }
    // upload 附件
    normFile = (e) => {
        console.log('Upload event:', e);
        if (Array.isArray(e)) {
          return e;
        }
        e.fileList = e.fileList.slice(-1);
        return e && e.fileList;
    }
    // 预览图片modal
    uploadPreview = (file) => {
        console.log(file);
        this.setState({
            previewImage: file.url || file.thumbUrl,
            previewVisible: true,
        });
    }
    closePreview = () => this.setState({ previewVisible: false })
    // 添加账户  保存
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            console.log(err);
            if (!err) {
                console.log(err);
                console.log(values);
            }
        });
    };
    render() {
        const {intl} = this.props;
        const { loading,reloadloading, selectedRowKeys,data } = this.state;
        // 表格 Table
        const rowSelection = {
            selectedRowKeys,
            onChange: this.onSelectChange,
        };
        const hasSelected = selectedRowKeys.length > 0;
        // 抽屉 Form
        const formItemLayout = {labelCol: { span: 10 },wrapperCol: { span: 14 }};
        const formItemLayout1 = {labelCol: { span: 5 },wrapperCol: { span: 19 }};
        // 财务信息 
        const formItemLayout2 = {labelCol: { span: 24,style:{paddingBottom:2} },wrapperCol: { span: 24 }};
        const { getFieldDecorator } = this.props.form;
        // 手机select
        const {code} = this.props;
        const inputBefore = getFieldDecorator('code')(
            <Select
                showSearch
                style={{ width: 80 }}
                placeholder="选择国家/地区代码"
                optionFilterProp="children"
                optionLabelProp="value"
                dropdownMatchSelectWidth={false}
                filterOption={(input, option) => (option.props.children[1].props.children.toLowerCase().indexOf(input) >= 0 ||option.props.children[2].props.children.toLowerCase().indexOf(input) >= 0)}
                onChange={this.phoneChange}
            >
            {code.map(r=>{
                return (
                    <Option key={r.value} value={r.value} className="codeOption"><img src={r.img} alt={r.option} /><span>{r.option}</span><span>{r.value}</span></Option>
                )
            })}
            </Select>
        )
        return (
            <div className="gutter-example button-demo">
                <BreadcrumbCustom first={<FormattedMessage id="accounts" />} second={<FormattedMessage id="account.management" />} />
                <Alert message="温馨提示: 为了保证数据同步的准确性，请在系统内完成开户、更改、删除等账户相关操作" type="success" showIcon={false} closable banner />
                <Row gutter={16}>
                    <Col className="gutter-row" md={24}>
                        <div className="gutter-box">
                            <Card title={<FormattedMessage id="account.management" />} bordered={false} 
                            extra={<span><Icon type="retweet" onClick={this.refresh} style={{marginRight:10,color:'#00a8a6',cursor:'pointer'}} />数据更新时间：{this.state.refreshtime}</span>} 
                            >
                                <div style={{ marginBottom: 16 }}>
                                    {hasSelected?
                                    <div>
                                        <span style={{ marginRight: 8 }}>
                                            <FormattedMessage id="user.select" values={{name:`${selectedRowKeys.length}`}} />
                                        </span>
                                        <Button type="primary" onClick={this.start} disabled={!hasSelected} loading={reloadloading}><FormattedMessage id="cancel" /></Button>
                                        <Button type="primary" ><FormattedMessage id="batch.transfer" /></Button>
                                        <Button type="primary" ><FormattedMessage id="amend.the.lever" /></Button>
                                        <Button type="primary" ><FormattedMessage id="modified.group" /></Button>
                                        <Button type="primary" ><FormattedMessage id="delete" /></Button>
                                        <Button type="primary" ><FormattedMessage id="entry.and.exit" /></Button>
                                        <Button type="primary" ><FormattedMessage id="operating.credit" /></Button>
                                    </div>
                                    :
                                    <div>
                                    <InputGroup compact>
                                        <span style={{marginRight:10,marginBottom:5}}>
                                            <Button type="primary" onClick={this.showDrawer} ><Icon type="plus" /><FormattedMessage id="create.account" /></Button>
                                        </span>
                                        <span style={{marginRight:10,marginBottom:5}}>
                                            <Select defaultValue="0" onChange={this.handleChange1}>
                                                <Option value="0">DD</Option>
                                            </Select>
                                        </span>
                                        <span style={{marginRight:10,marginBottom:5}}>
                                            <Select 
                                            showSearch
                                            defaultValue="0" 
                                            style={{ width: 120 }} 
                                            onChange={this.handleChange2}
                                            optionFilterProp="children"
                                            filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                                            >
                                                <Option value="0">所有账户</Option>
                                                <Option value="1">归属给我的账户</Option>
                                                <Option value="2">归属给下级的账户</Option>
                                                <Option value="3">无归属账户</Option>
                                            </Select>
                                        </span>
                                        <span style={{marginRight:10,marginBottom:5}}>
                                            <InputGroup compact>
                                                <Button>账户创建时间</Button>
                                                <RangePicker ranges={{[intl.messages.ranges_day]:[moment(), moment()], [intl.messages.ranges_month]: [moment(), moment().endOf('month')] }} onChange={this.onChange3} />
                                            </InputGroup>
                                        </span>
                                        <span style={{float:'right'}}>
                                            <InputGroup compact >
                                            <Select defaultValue="0" onChange={this.handleChange4}>
                                                <Option value="0">姓名</Option>
                                                <Option value="1">账号</Option>
                                                <Option value="2">账户归属</Option>
                                            </Select>
                                            <Search placeholder="搜索" onSearch={this.handleSearch} enterButton style={{width:180}} />
                                            </InputGroup>
                                        </span>
                                    </InputGroup>
                                    </div>}
                                </div>
                                <Table rowSelection={rowSelection} columns={columns} dataSource={data.data} loading={loading} scroll={{x:1400}} size={'small'} pagination={false} />
                                <div style={{textAlign:'right',marginTop:20}}>
                                    <Pagination size="small" total={this.state.total} showTotal={this.showTotal} showSizeChanger showQuickJumper onChange={this.pageChange} onShowSizeChange={this.pagesizeChange} />
                                </div>
                            </Card>
                        </div>
                    </Col>
                </Row>
                <Drawer title="添加账户" width={900} placement="right" onClose={this.onClose} visible={this.state.visible} style={{height: 'calc(100% - 55px)',overflow: 'auto',paddingBottom: 53}}> 
                    <RadioGroup onChange={this.radioChange} value={this.state.radiovalue}>
                        <Radio value={0}>新增客户并绑定</Radio>
                        <Radio value={1}>绑定已有客户</Radio>
                    </RadioGroup>
                    <Form onSubmit={this.handleSubmit} >
                        {Boolean(this.state.radiovalue)&&<FormItem labelCol={{span: 2}} wrapperCol={{span: 14}} label="绑定客户" style={{marginBottom:10,marginTop:10,textAlign:'left'}}>
                            {getFieldDecorator('bindcustomer', {
                                rules: [{ required: true, message: '请绑定客户' }],
                            })(
                                <Select
                                    showSearch
                                    style={{ width: 200 }}
                                    placeholder="输入客户编号/客户名称搜索"
                                    onChange={this.bindChange}
                                    optionFilterProp="children"
                                    filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}  
                                >
                                  <Option value="选项1">选项1</Option>
                                </Select>
                                /* 远程搜索option项 */
                            )}
                        </FormItem>}
                        {(!Boolean(this.state.radiovalue)||(Boolean(this.state.radiovalue)&&this.state.bindselected))&&
                        <div>
                            <Card type="inner" title="账户所有人资料" style={{marginTop:15}}>
                                <Card bordered={false}>
                                    <Row>
                                        <Col span={11}>
                                            <FormItem {...formItemLayout} label="手机" style={{marginBottom:10}}>
                                                {getFieldDecorator('phone', {
                                                    rules: [{ required: false, message: '请输入手机号码!' }]
                                                })(
                                                    <Input addonBefore={inputBefore} placeholder="" />
                                                )}
                                            </FormItem>
                                            <FormItem {...formItemLayout} label="即时通讯" style={{marginBottom:10}}>
                                                {getFieldDecorator('IM')(<Input />)}
                                            </FormItem>
                                        </Col>
                                        <Col span={11}>
                                            <FormItem {...formItemLayout} label="Email" style={{marginBottom:10}}>
                                                {getFieldDecorator('email', {
                                                    rules: [{ required: true, message: 'Email is required' }],
                                                })(
                                                    <Input placeholder="" />
                                                )}
                                            </FormItem>
                                        </Col>
                                    </Row> 
                                </Card>
                                <Card bordered={false} title="基本资料">
                                    <Row>
                                        <Col span={11}>
                                            <FormItem {...formItemLayout} label="姓名" style={{marginBottom:10}}>
                                                {getFieldDecorator('name', {
                                                    rules: [{ required: true, message: '请填写姓名' }],
                                                })(
                                                    <Input />
                                                )}
                                            </FormItem>
                                            <FormItem {...formItemLayout} label="出生年月" style={{marginBottom:10}}>
                                                {getFieldDecorator('birth', {
                                                    rules: [{ required: true, message: '请选择日期' }],
                                                })(
                                                    <DatePicker style={{width:'100%'}} />
                                                )}
                                            </FormItem>
                                            <FormItem {...formItemLayout} label="居住地" style={{marginBottom:10}}>
                                                {getFieldDecorator('residence', {
                                                    rules: [{ required: true, message: '' }],
                                                })(
                                                    <Cascader options={cascaderOptions} onChange={this.cascaderChange} placeholder="Please select" />
                                                )}
                                            </FormItem>
                                        </Col>
                                        <Col span={11}>
                                            <FormItem {...formItemLayout} label="性别" style={{marginBottom:10}}>
                                                {getFieldDecorator('sex', {
                                                    rules: [{ required: true, message: '请选择性别' }],
                                                })(
                                                    <Select>
                                                        <Option value="0">男</Option>
                                                        <Option value="1">女</Option>
                                                    </Select>
                                                )}
                                            </FormItem>
                                            <FormItem {...formItemLayout} label="国家和地区" style={{marginBottom:10}}>
                                                {getFieldDecorator('country', {
                                                    rules: [{required:true,message:'请选择国家和地区'}]
                                                })(
                                                    <Select style={{ width: '100%' }} >
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
                                                    <Input />
                                                )}
                                            </FormItem>
                                        </Col>
                                        <Col span={22}>
                                            <FormItem {...formItemLayout1} label="详细地址" style={{marginBottom:10}}>
                                                {getFieldDecorator('address', {
                                                    rules: [{ required: true, message: '请填写详细地址!' }],
                                                })(
                                                    <Input />
                                                )}
                                            </FormItem>
                                            <FormItem {...formItemLayout1} label="备注" style={{marginBottom:10}}>
                                                {getFieldDecorator('basicremarks', {
                                                    rules: [{ required: false, message: '请输入备注!' }],
                                                })(
                                                    <TextArea rows={3} />
                                                )}
                                            </FormItem>
                                        </Col>  
                                    </Row>
                                </Card>
                                <Card bordered={false} title="财务信息">
                                    <Row gutter={50}>
                                        <Col span={11} offset={1}>
                                            <FormItem {...formItemLayout2} label="总资产" style={{marginBottom:10}}>
                                                {getFieldDecorator('totalassets', {
                                                    rules: [{ required: true, message: '请选择' }],
                                                })(
                                                    <Select style={{ width: '100%' }}>
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
                                            <FormItem {...formItemLayout2} label="收入来源" style={{marginBottom:10}}>
                                                {getFieldDecorator('sourceofincome', {
                                                    rules: [{ required: true, message: '请选择' }],
                                                })(
                                                    <Select style={{ width: '100%' }}>
                                                        <Option value="0">工资储蓄</Option>
                                                        <Option value="1">版税</Option>
                                                        <Option value="2">遗产</Option>
                                                        <Option value="3">交易利润</Option>
                                                        <Option value="4">其他</Option>
                                                    </Select>
                                                )}
                                            </FormItem>
                                            <FormItem {...formItemLayout2} label="投资年数" style={{marginBottom:10}}>
                                                {getFieldDecorator('years', {
                                                    rules: [{ required: true, message: '请选择' }],
                                                })(
                                                    <Select style={{ width: '100%' }}>
                                                        <Option value="0">0~5</Option>
                                                        <Option value="1">5~10</Option>
                                                        <Option value="2">10~20</Option>
                                                        <Option value="3">&gt;20</Option>
                                                    </Select>
                                                )}
                                            </FormItem>
                                            <FormItem {...formItemLayout2} label="投资目的" style={{marginBottom:10}}>
                                                {getFieldDecorator('investmentpurpose', {
                                                    rules: [{ required: true, message: '请选择' }],
                                                })(
                                                    <Input />
                                                )}
                                            </FormItem>
                                            <FormItem {...formItemLayout2} label="开户银行" style={{marginBottom:10}}>
                                                {getFieldDecorator('openbank', {
                                                    rules: [{ required: true, message: '请选择' }],
                                                })(
                                                    <Select style={{ width: '100%' }} >
                                                        <Option value="0">中国银行</Option>
                                                        <Option value="1">中国农业银行</Option>
                                                        <Option value="2">中国建设银行</Option>
                                                        <Option value="3">国家开发银行</Option>
                                                        <Option value="4">中国进出口银行</Option>
                                                        <Option value="5">....</Option>
                                                    </Select>
                                                )}
                                            </FormItem>
                                            <FormItem {...formItemLayout2} label="银行账号" style={{marginBottom:10}}>
                                                {getFieldDecorator('bankaccount', {
                                                    rules: [{ required: true, message: '请选择' }],
                                                })(
                                                    <Input />
                                                )}
                                            </FormItem>
                                            <FormItem {...formItemLayout2} label="你是否有至少2个月的交易经验" style={{marginBottom:10}}>
                                                {getFieldDecorator('twomonths', {
                                                    rules: [{ required: true, message: '请选择' }],
                                                })(
                                                    <Select style={{ width: '100%' }} >
                                                        <Option value="0">是</Option>
                                                        <Option value="1">否</Option>
                                                    </Select>
                                                )}
                                            </FormItem>
                                            <FormItem {...formItemLayout2} label="请提供可以帮助您理解我们服务的专业经验和背景" style={{marginBottom:10}}>
                                                {getFieldDecorator('provide', {
                                                    rules: [{ required: true, message: '请选择' }],
                                                })(
                                                    <Select style={{ width: '100%' }} >
                                                        <Option value="0">具有金融机构的相关工作经验</Option>
                                                        <Option value="1">具有金融相关的教育背景和专业资质</Option>
                                                        <Option value="2">没有</Option>
                                                    </Select>
                                                )}
                                            </FormItem>
                                        </Col>
                                        <Col span={11}>
                                            <FormItem {...formItemLayout2} label="净资产" style={{marginBottom:10}}>
                                                {getFieldDecorator('netassets', {
                                                    rules: [{ required: true, message: '请选择' }],
                                                })(
                                                    <Select style={{ width: '100%' }}>
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
                                            <FormItem {...formItemLayout2} label="投资经验" style={{marginBottom:10}}>
                                                {getFieldDecorator('investmentexperience', {
                                                    rules: [{ required: true, message: '请选择' }],
                                                    initialValue:['1']
                                                })(
                                                    <CheckboxGroup options={experienceoptions} onChange={this.experienceChange} />
                                                )}
                                            </FormItem>
                                            <FormItem {...formItemLayout2} label="知识水平" style={{marginBottom:10}}>
                                                {getFieldDecorator('knowlevel', {
                                                    rules: [{ required: true, message: '请选择' }],
                                                })(
                                                    <Select style={{ width: '100%' }} >
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
                                            <FormItem {...formItemLayout2} label="投资额度" style={{marginBottom:10}}>
                                                {getFieldDecorator('investmentquota', {
                                                    rules: [{ required: true, message: '请选择' }],
                                                })(
                                                    <Select style={{ width: '100%' }}>
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
                                            <FormItem {...formItemLayout2} label="银行所在地" style={{marginBottom:10}}>
                                                {getFieldDecorator('banklocation', {
                                                    rules: [{ required: true, message: '请选择' }],
                                                    initialValue:['zhongguo','jiangxi','jiujiang']
                                                })(
                                                    <Cascader options={options} placeholder="Please select" style={{width:'100%'}} />
                                                )}  
                                            </FormItem>
                                            <FormItem {...formItemLayout2} label="银行支行" style={{marginBottom:10}}>
                                                {getFieldDecorator('bankbranch', {
                                                    rules: [{ required: true, message: '请填写银行支行' }],
                                                })(
                                                    <Input />
                                                )} 
                                            </FormItem>
                                            <FormItem {...formItemLayout2} label="过去三年，你曾经通过一个类似的机构，交易过OTC的保证金外汇或CFD交易么" style={{marginBottom:10}}>
                                                {getFieldDecorator('3years', {
                                                    rules: [{ required: true, message: '请选择' }],
                                                })(
                                                    <Select>
                                                        <Option value="0">是</Option>
                                                        <Option value="1">否</Option>
                                                    </Select>
                                                )} 
                                            </FormItem>
                                            <FormItem {...formItemLayout2} label="在过去的12个月内，您是否至少交易过20次？" style={{marginBottom:10}}>
                                                {getFieldDecorator('20times', {
                                                    rules: [{ required: true, message: '请选择' }],
                                                })(
                                                    <Select>
                                                        <Option value="0">是</Option>
                                                        <Option value="1">否</Option>
                                                    </Select>
                                                )} 
                                            </FormItem>
                                        </Col>
                                        <Col span={22} offset={1}>
                                            <FormItem {...formItemLayout2} label="备注" style={{marginBottom:10}}>
                                                {getFieldDecorator('financeremarks')(
                                                    <TextArea rows={3} />
                                                )} 
                                            </FormItem>
                                        </Col>  
                                    </Row> 
                                </Card>
                                <Card bordered={false} title="证件信息">
                                    <Row>
                                        <Col span={11}>
                                            <FormItem {...formItemLayout} label="身份证明类型" style={{marginBottom:10}}>
                                                {getFieldDecorator('cardtype', {
                                                    rules: [{ required: true, message: '请选择身份证明类型!' }],
                                                })(
                                                    <Select style={{width:'100%'}}>
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
                                                    true?
                                                    <Upload 
                                                    name="logo" 
                                                    action="https://www.easy-mock.com/mock/5b6a978b91ff8e254d62047e/crm/upload" 
                                                    accept="image/*" 
                                                    listType="picture"
                                                    onPreview={this.uploadPreview} 
                                                    >
                                                        <Button>
                                                        <Icon type="upload" /> Click to upload
                                                        </Button>
                                                    </Upload>:<a href="/fdf" target="_blank">查看文件</a>
                                                )}
                                            </FormItem>
                                            <FormItem {...formItemLayout} label="银行卡证明A" style={{marginBottom:10}}>
                                                {getFieldDecorator('banka', {
                                                        valuePropName: 'fileList',
                                                        getValueFromEvent: this.normFile,
                                                        initialValue:this.state.fileList,
                                                        rules: [{ required: true, message: '请上传!' }],
                                                    })(
                                                    true?
                                                    <Upload 
                                                    name="logo" 
                                                    action="https://www.easy-mock.com/mock/5b6a978b91ff8e254d62047e/crm/upload" 
                                                    accept="image/*" 
                                                    listType="picture"
                                                    onPreview={this.uploadPreview} 
                                                    >
                                                        <Button>
                                                        <Icon type="upload" /> Click to upload
                                                        </Button>
                                                    </Upload>:<a href="/fdf" target="_blank">查看文件</a>
                                                )}
                                            </FormItem>
                                            <FormItem {...formItemLayout} label="手持身份证" style={{marginBottom:10}}>
                                                {getFieldDecorator('handcard', {
                                                    rules: [{ required: true, message: '请选择!' }],
                                                })(
                                                    <Select style={{width:'100%'}}>
                                                        <Option value="1">手持身份证</Option>
                                                    </Select>
                                                )}
                                            </FormItem>
                                        </Col>
                                        <Col span={11}>
                                            <FormItem {...formItemLayout} label="身份证明号码" style={{marginBottom:10}}>
                                                {getFieldDecorator('cardnumber', {
                                                    rules: [{ required: true, message: '请填写!' }],
                                                })(
                                                    <Input />
                                                )}
                                            </FormItem>
                                            <FormItem {...formItemLayout} label="身份证明B" style={{marginBottom:10}}>
                                                {getFieldDecorator('cardb', {
                                                        valuePropName: 'fileList',
                                                        getValueFromEvent: this.normFile,
                                                        initialValue:this.state.fileList,
                                                        rules: [{ required: true, message: '请上传!' }],
                                                    })(
                                                    true?
                                                    <Upload 
                                                    name="logo" 
                                                    action="https://www.easy-mock.com/mock/5b6a978b91ff8e254d62047e/crm/upload" 
                                                    accept="image/*" 
                                                    listType="picture"
                                                    onPreview={this.uploadPreview} 
                                                    >
                                                        <Button>
                                                        <Icon type="upload" /> Click to upload
                                                        </Button>
                                                    </Upload>:<a href="/fdf" target="_blank">查看文件</a>
                                                )}
                                            </FormItem>
                                            <FormItem {...formItemLayout} label="银行卡证明B" style={{marginBottom:10}}>
                                                {getFieldDecorator('bankb', {
                                                        valuePropName: 'fileList',
                                                        getValueFromEvent: this.normFile,
                                                        initialValue:this.state.fileList,
                                                        rules: [{ required: true, message: '请上传!' }],
                                                    })(
                                                    true?
                                                    <Upload 
                                                    name="logo" 
                                                    action="https://www.easy-mock.com/mock/5b6a978b91ff8e254d62047e/crm/upload" 
                                                    accept="image/*" 
                                                    listType="picture"
                                                    onPreview={this.uploadPreview} 
                                                    >
                                                        <Button>
                                                        <Icon type="upload" /> Click to upload
                                                        </Button>
                                                    </Upload>:<a href="/fdf" target="_blank">查看文件</a>
                                                )}
                                            </FormItem>
                                        </Col>
                                    </Row> 
                                </Card>
                            </Card>
                            <Card type="inner" title="账户信息" style={{marginTop:15,marginBottom:30}}>
                                <Card bordered={false}>
                                    <Row>
                                        <Col span={11}>
                                            <FormItem {...formItemLayout} label="所属服务器" style={{marginBottom:10}}>
                                                {getFieldDecorator('server', {
                                                    initialValue:'DD'
                                                })(
                                                    <Input disabled />
                                                )}
                                            </FormItem>
                                            <FormItem {...formItemLayout} label="MT4 组" style={{marginBottom:10}}>
                                                {getFieldDecorator('mt4group', {
                                                    rules:[{required:true,message:"请选择"}]
                                                })(
                                                    <Select>
                                                        <Option value="1">GQ-50-Offset-00</Option>
                                                        <Option value="2">GQ-50-Offset-10</Option>
                                                        <Option value="3">GQ-50-Offset-20</Option>
                                                        <Option value="4">GQ-50-Offset-30</Option>
                                                        <Option value="5">....</Option>
                                                    </Select>
                                                )}
                                            </FormItem>
                                            <FormItem {...formItemLayout} label="杠杆" style={{marginBottom:10}}>
                                                {getFieldDecorator('lever', {
                                                    rules:[{required:true,message:"请选择"}]
                                                })(
                                                    <Select>
                                                        <Option value="1">1:1</Option>
                                                        <Option value="2">1:2</Option>
                                                        <Option value="3">1:3</Option>
                                                        <Option value="4">1:5</Option>
                                                        <Option value="5">....</Option>
                                                    </Select>
                                                )}
                                            </FormItem>
                                            <FormItem {...formItemLayout} label="主密码" style={{marginBottom:10}}>
                                                {getFieldDecorator('mainpassword')(
                                                    <Input type="password" />
                                                )}
                                            </FormItem>
                                            <FormItem {...formItemLayout} label="交易状态" style={{marginBottom:10}}>
                                                {getFieldDecorator('tradingstate', {
                                                    rules: [{ required: true, message: '' }],
                                                    initialValue:1
                                                })(
                                                    <RadioGroup>
                                                        <Radio value={1}>启用</Radio>
                                                        <Radio value={2}>禁用</Radio>
                                                    </RadioGroup>
                                                )}
                                            </FormItem>
                                            <FormItem {...formItemLayout} label="账户创建时间" style={{marginBottom:10}}>
                                                {getFieldDecorator('createtime')(
                                                    <DatePicker disabled />
                                                )}
                                            </FormItem>
                                            <FormItem {...formItemLayout} label="Lead source" style={{marginBottom:10}}>
                                                {getFieldDecorator('leadsource')(<Input />)}
                                            </FormItem>
                                        </Col>
                                        <Col span={11}>
                                            <FormItem {...formItemLayout} label="账号" style={{marginBottom:10}}>
                                                {getFieldDecorator('accountnumber')(
                                                    <Input placeholder="账号区间3408000~8000000" />
                                                )}
                                            </FormItem>
                                            <FormItem {...formItemLayout} label="账户组" style={{marginBottom:10}}>
                                                {getFieldDecorator('accountgroup')(
                                                    <Select
                                                    showSearch
                                                    style={{ width: 200 }}
                                                    placeholder="Select a person"
                                                    optionFilterProp="children"
                                                    filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                                                    >
                                                        <Option value="1">GQ</Option>
                                                        <Option value="2">1月底</Option>
                                                        <Option value="3">2月底</Option>
                                                        {/* 后台可设置添加的 */}
                                                    </Select>
                                                )}
                                            </FormItem>
                                            <FormItem {...formItemLayout} label="返佣用户" style={{marginBottom:10}}>
                                                {getFieldDecorator('maid')(
                                                    <Select
                                                    showSearch
                                                    style={{ width: 200 }}
                                                    placeholder="Select a person"
                                                    optionFilterProp="children"
                                                    filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                                                    >
                                                        <Option value="1">请选择</Option>
                                                        {/* 后台返回的 */}
                                                    </Select>
                                                )}
                                            </FormItem>
                                            <FormItem {...formItemLayout} label="投资密码" style={{marginBottom:10}}>
                                                {getFieldDecorator('investmentpassword')(
                                                    <Input type="password" />
                                                )}
                                            </FormItem>
                                            <FormItem {...formItemLayout} label="登录状态" style={{marginBottom:10}}>
                                                {getFieldDecorator('loginstate', {
                                                    rules: [{ required: true, message: '' }],
                                                    initialValue:1
                                                })(
                                                    <RadioGroup>
                                                        <Radio value={1}>启用</Radio>
                                                        <Radio value={2}>禁用</Radio>
                                                    </RadioGroup>
                                                )}
                                            </FormItem>
                                            <FormItem {...formItemLayout} label="发送报告" style={{marginBottom:10}}>
                                                {getFieldDecorator('report')(<Switch />)}
                                            </FormItem>
                                        </Col> 
                                    </Row> 
                                </Card>
                            </Card>
                        </div>}
                        <div style={{position: 'absolute',bottom: 0,width: '100%',borderTop: '1px solid #e8e8e8',padding: '10px 16px',textAlign: 'right',left: 0,background: '#fff',borderRadius: '0 0 4px 4px',}}>
                            <Checkbox style={{float:'left'}}>发送开户邮件</Checkbox>
                            <Button htmlType="submit" type="primary" disabled={!(!Boolean(this.state.radiovalue)||(Boolean(this.state.radiovalue)&&this.state.bindselected))}>保存</Button>
                            <Button style={{marginRight: 8,}} onClick={this.onClose}>取消</Button> 
                        </div>
                    </Form>
                </Drawer>
                <Modal 
                visible={this.state.previewVisible} 
                footer={null} 
                onCancel={this.closePreview} 
                style={{maxWidth:800}}
                bodyStyle={{textAlign:'center'}}
                >
                    <img alt="example" style={{ maxWidth: '100%' }} src={this.state.previewImage} />
                </Modal>
            </div>
        )
    }
}

const mapStateToProps = state => {
    const { code = {data: {}} } = state.httpData;
    return {code};
};


export default connect(mapStateToProps)(injectIntl(Form.create()(Accounts)));