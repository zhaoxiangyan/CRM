// Broker Work 用戶
import React, {Component} from 'react';
import { Row, Col, Card, Table, Button, Icon, Select, DatePicker, Input, 
    Pagination, Drawer, Form, Cascader, Switch, Upload, Radio, message, Modal } from 'antd';
import BreadcrumbCustom from '../BreadcrumbCustom';
import {FormattedMessage,injectIntl} from 'react-intl';
import { get, post, CRM } from '../../axios/tools';
import { connect } from 'react-redux';
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
  dataIndex: 'number',
  align:'center',
  sorter: true
}, {
  title: <FormattedMessage id="user.brokerwork.th2" />,
  dataIndex: 'name',
  render:(text,record)=><Link to={'/app/user/usermgmt/'+record.id}>{text}</Link>,
  align:'center',
  sorter: true
}, {
    title: <FormattedMessage id="user.brokerwork.th3" />,
    dataIndex: 'email',
    align:'center'
}, {
    title: <FormattedMessage id="user.brokerwork.th4" />,
    dataIndex: 'mobile',
    render:(text,record)=><span>{record.mobile_prefix}&nbsp;{text}</span>,
    align:'center'
}, {
    title: <FormattedMessage id="user.brokerwork.th5" />,
    dataIndex: 'role_user',
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
        passwordType:true,
        // 查询条件
        search:{
            maid_level:'',
            start_time:'',
            end_time:'',
            keyword_type:'name',
            keyword:'',
            page:'1',
            pageSize:'10',
            sorttype:'',
            sortname:''
         },
         // 总条数
         total:50,
        //  批量划转Modal
        transferVisible:false,
        transferLoading:false,
        transferData:[],
        transferValue:undefined,
        // 账号服务器
        agent_hosts:[],
    };
    componentWillMount(){
        this.getUsers();
    }
    componentWillUnmount = () => {
        this.setState = (state,callback)=>{
           return;
        };
    }
    // 获取用户列表
    getUsers = () => {
        console.log(this.state.search);
        this.setState({loading:true});
        get({
            url:CRM.users,
            data:this.state.search
        }).then(res=>{
            console.log("res:",res);
            if(res.is_succ){
                this.setState({data:res.data,loading:false});
            }else{
                message.error(res.message);
            }
        })
    }
    start = () => {
        this.setState({ reloadloading: true });
        // ajax request after empty completing
        setTimeout(() => {this.setState({selectedRowKeys: [], reloadloading: false,});},1000);
    }
    onSelectChange = (selectedRowKeys) => {
        console.log('selectedRowKeys changed: ', selectedRowKeys);
        this.setState({ selectedRowKeys });
    }
    // 第一个select 可搜索
    handleChange1 = (value) => {
        console.log(`selected ${value}`);
    }
    // 第二个select  所有层级
    handleChange2 = (maid_level) => {
        this.setState({search:{...this.state.search,maid_level}},()=>{
            this.getUsers();
        }); 
    }
    // 时间选择器  创建时间
    onChange3 = (dates, dateStrings) => {
        console.log('From: ', dates[0], ', to: ', dates[1]);
        console.log('From: ', dateStrings[0], ', to: ', dateStrings[1]);
        this.setState({search:{...this.state.search,'start_time':dateStrings[0],'end_time':dateStrings[1]}},()=>{
            this.getUsers();
        }); 
    }
    // 第三个select 姓名
    handleChange4 = (keyword_type) => {
        this.setState({search:{...this.state.search,keyword_type}}); 
    }
    // 关键词搜索
    handleSearch = (keyword) => {
        this.setState({search:{...this.state.search,keyword}},()=>{
            this.getUsers();
        }); 
    }
    // 分页器
    showTotal = (total) => {
        return `Total ${total} items`;
    }
    pageChange = (page,pageSize) => {
        this.setState({search:{...this.state.search,page,pageSize}},()=>{
            this.getUsers();
        }); 
    }
    pagesizeChange = (page,pageSize) => {
        this.setState({search:{...this.state.search,page,pageSize}},()=>{
            this.getUsers();
        }); 
    }
    // 排序
    sorterChange = (pagination,filters,sorter) => {
        console.log(sorter.order,sorter.field);
         this.setState({search:{...this.state.search,sorttype:sorter.order,sortname:sorter.field}},()=>{
            this.getUsers();
        });
    }
    // 批量划转Modal
    transferModal = () => {
        this.setState({transferVisible:true})
    }
    transferOk = () => {
        console.log(this.state.selectedRowKeys);
        this.setState({ transferLoading: true });
        post({
            url:CRM.usertransfer,
            data:{
                id:this.state.selectedRowKeys,
                user_id:3
            }
        }).then(res=>{
            console.log("res:",res);
            if(res.is_succ){
                this.setState({ transferLoading: false, transferVisible: false });
            }else{
                message.error(res.message);
            }
        })
    }
    transferCancel = () => {
        this.setState({ transferVisible: false });
    }
    transferSearch = (value) => {
        
    }
    transferChange = (value) => {
        
    }
    // 抽屉  添加
    showDrawer = () => {
        // 获取账号服务器
        get({url:CRM.hosts}).then(res=>{
            console.log("res:",res);
            if(res.is_succ){
                this.setState({agent_hosts:res.data});
            }else{
                message.error(res.message);
            }
        })
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
    drawerSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            console.log(values);
            if (!err) {
                console.log('Received values of form: ', values);
                    // 用户登录
                    post({
                        url:CRM.usercreate,
                        data:values,
                    }).then(res=>{
                        console.log("res:",res);
                        if(res.is_succ){
                            
                        }else{
                            
                        }
                    })
            }
        });
    };
    render() {
        const {intl,user,code,auth} = this.props;
        const { loading,reloadloading, selectedRowKeys } = this.state;
        // 批量划转
        const transferOptions = this.state.transferData.map(d => <Option key={d.value}>{d.text}</Option>);
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
        const { getFieldDecorator,getFieldValue } = this.props.form;
        // 手机select
        const inputBefore = getFieldDecorator('user.mobile_prefix')(
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
                <BreadcrumbCustom first={<FormattedMessage id="user.breadcrumb1" />} second={<FormattedMessage id="user.breadcrumb2" />} />
                <Row gutter={16}>
                    <Col className="gutter-row" md={24}>
                        <div className="gutter-box">
                            <Card title={<FormattedMessage id="user.brokerwork.title" />} bordered={false} >
                                <div style={{ marginBottom: 16 }}>
                                    {hasSelected?
                                    <div>
                                        <span style={{ marginRight: 8 }}>
                                            <FormattedMessage id="user.select" values={{name:`${selectedRowKeys.length}`}} />
                                        </span>
                                        <Button type="primary" onClick={this.start} disabled={!hasSelected} loading={reloadloading}><FormattedMessage id="cancel" /></Button>
                                        <Button type="primary" ><FormattedMessage id="delete" /></Button>
                                        <Button type="primary" onClick={this.transferModal} ><FormattedMessage id="user.brokerwork.transfer" /></Button>
                                        <Button type="primary" ><FormattedMessage id="send" /></Button>
                                    </div>
                                    :
                                    <div>
                                    <InputGroup compact>
                                        <span style={{marginRight:10,marginBottom:5}}>
                                            <Button type="primary" onClick={this.showDrawer} ><Icon type="plus" /><FormattedMessage id="user.brokerwork.add" /></Button>
                                        </span>
                                        <span style={{marginRight:10,marginBottom:5}}>
                                            <Select
                                                showSearch
                                                style={{ width: 150 }}
                                                placeholder="Select a person"
                                                optionFilterProp="children"
                                                onChange={this.handleChange1}
                                                filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                                            >
                                                <Option value="0">全部</Option>
                                                <Option value="1">直属下级</Option>
                                                <Option value="2">非直属下级</Option>
                                                <Option value="3">无上级</Option>
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
                                                <Button><FormattedMessage id="registertime" /></Button>
                                                <RangePicker ranges={{[intl.messages.ranges_day]:[moment(), moment()], [intl.messages.ranges_month]: [moment(), moment().endOf('month')] }} onChange={this.onChange3} />
                                            </InputGroup>
                                        </span>
                                        <span style={{float:'right'}}>
                                            <InputGroup compact >
                                            <Select defaultValue="name" onChange={this.handleChange4} >
                                                <Option value="name">姓名</Option>
                                                <Option value="maid_account">返佣账号</Option>
                                                <Option value="number">用户编号</Option>
                                                <Option value="parent_name">上级用户</Option>
                                                <Option value="role_name">角色</Option>
                                                <Option value="email">邮箱</Option>
                                                <Option value="mobile">手机</Option>
                                            </Select>
                                            <Search placeholder="input search text" onSearch={this.handleSearch} enterButton style={{width:180}} />
                                            </InputGroup>
                                        </span>
                                    </InputGroup>
                                    </div>}
                                </div>
                                <Table onChange={this.sorterChange} rowSelection={rowSelection} columns={columns} dataSource={this.state.data.data} loading={loading} scroll={{x:1400}} size={'small'} pagination={false} rowKey="id" />
                                <div style={{textAlign:'right',marginTop:20}}>
                                    <Pagination size="small" total={this.state.data.total} showTotal={this.showTotal} showSizeChanger showQuickJumper onChange={this.pageChange} onShowSizeChange={this.pagesizeChange} />
                                </div>
                            </Card>
                        </div>
                    </Col>
                </Row>
                <Drawer title="添加用户" width={900} placement="right" onClose={this.onClose} visible={this.state.visible} style={{height: 'calc(100% - 55px)',overflow: 'auto',paddingBottom: 53}}> 
                    <Form onSubmit={this.drawerSubmit}>
                        <Card title="基本资料" bordered={false} >
                            <Row>
                                <Col span={11}>
                                    <FormItem {...formItemLayout} label="用户编号" style={{marginBottom:10}}>
                                        <Input placeholder="未填写可自动生成" />
                                    </FormItem>
                                    <FormItem {...formItemLayout} label="邮箱" style={{marginBottom:10}}>
                                        {getFieldDecorator('user.email', {
                                            rules: [{ required: true, message: '请输入邮箱!' }],
                                        })(
                                            <Input placeholder="" />
                                        )}
                                    </FormItem>
                                    <FormItem {...formItemLayout} label="手机" style={{marginBottom:10}}>
                                        {getFieldDecorator('user.mobile', {
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
                                        {getFieldDecorator('user.name', {
                                            rules: [{ required: true, message: '请输入姓名!' }],
                                        })(
                                            <Input placeholder="" />
                                        )}
                                    </FormItem>
                                    <FormItem {...formItemLayout} label="登录密码" style={{marginBottom:10}}>
                                        {getFieldDecorator('user.password', {
                                            rules: [{ required: false, message: '请输入登录密码!' }],
                                        })(
                                            <div style={{position:'relative'}}>
                                                <Input type={this.state.passwordType?'password':'text'} placeholder="" />
                                                <Icon type={this.state.passwordType?'eye':'eye-o'} style={{fontSize:18,position:'absolute',top:10,right:5,cursor:'pointer'}} onClick={this.switchPassword} />
                                            </div>
                                        )}
                                    </FormItem>
                                    <FormItem {...formItemLayout} label="角色" style={{marginBottom:10}}>
                                        {getFieldDecorator('user.role_id', {
                                            rules: [{ required: true, message: '请选择角色!' }],
                                        })(
                                            <Select style={{ width: '100%' }} >
                                                <Option value={user.data.user_id}>{user.data.id}....未知数据</Option>
                                            </Select>
                                        )}
                                    </FormItem>
                                </Col>
                                <Col span={22}>
                                    <FormItem {...formItemLayout1} label="详细地址" style={{marginBottom:10}}>
                                        {getFieldDecorator('userData.address', {
                                            rules: [{ required: false, message: '请输入详细地址!' }],
                                        })(
                                            <TextArea rows={2} />
                                        )}
                                    </FormItem>
                                    <FormItem {...formItemLayout1} label="备注" style={{marginBottom:10}}>
                                        {getFieldDecorator('userData.comment', {
                                            rules: [{ required: false, message: '请输入备注!' }],
                                        })(
                                            <TextArea rows={3} />
                                        )}
                                    </FormItem>
                                    <FormItem {...formItemLayout1} label="首次登录修改初始密码" style={{marginBottom:10}}>
                                        {getFieldDecorator('user.modify_password', {
                                            rules: [{ required: false, message: '!' }],
                                        })(
                                            <Switch defaultChecked onChange={this.switchChange1} />,
                                        )}
                                    </FormItem>
                                    <FormItem {...formItemLayout1} label="发送用户创建邮件" style={{marginBottom:10}}>
                                        {getFieldDecorator('customerAccount.is_send_mail', {
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
                                        {getFieldDecorator('userData.proof_of_identity')(
                                            <Select style={{ width: '100%' }}>
                                                <Option value="Business License">Business License</Option>
                                                <Option value="Organization Code certificate">Organization Code certificate</Option>
                                            </Select>
                                        )}
                                    </FormItem>
                                    <FormItem {...formItemLayout1} label="身份证明号码" style={{marginBottom:10}}>
                                        {getFieldDecorator('userData.proof_of_identity_number')(
                                            <Input />
                                        )}
                                    </FormItem>
                                    <FormItem {...formItemLayout1} label="身份证明A" style={{marginBottom:10}}>
                                        {getFieldDecorator('userData.proof_of_identity_img_a', {
                                                valuePropName: 'fileList',
                                                getValueFromEvent: this.normFile1,
                                            })(
                                            <Upload 
                                            action={CRM.userupload} 
                                            listType="picture"
                                            headers={{'Authorization':'Bearer '+auth.data.access_token}}
                                            data={
                                                (s)=>{ return {'file':s,'type':'proof_of_identity_img_a'}}
                                            }
                                            >
                                                <Button>
                                                <Icon type="upload" /> Click to upload
                                                </Button>
                                            </Upload>
                                        )}
                                    </FormItem>
                                    <FormItem {...formItemLayout1} label="身份证明B" style={{marginBottom:10}}>
                                        {getFieldDecorator('userData.proof_of_identity_img_b', {
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
                                        {getFieldDecorator('userData.bank')(
                                            <Select style={{ width: '100%' }} >
                                                <Option value="1">Bank of China</Option>
                                                <Option value="2">China Construction Bank</Option>
                                                <Option value="3">China Citic Bank</Option>
                                            </Select>
                                        )}
                                    </FormItem>
                                    <FormItem {...formItemLayout1} label="银行账号" style={{marginBottom:10}}>
                                        {getFieldDecorator('userData.bank_card_number')(
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
                                        {getFieldDecorator('userData.agency_experience')(
                                            <Switch defaultChecked />,
                                        )}
                                    </FormItem>
                                    <FormItem {...formItemLayout1} label="您有多少年投资股票、基金、外汇、金融衍生品等风险投资品的经验" style={{marginBottom:10}}>
                                        {getFieldDecorator('userData.investing_year')(
                                            <Select style={{ width: '100%' }} >
                                                <Option value="1">Less than 2 years</Option>
                                                <Option value="2">2 years to 5 years</Option>
                                                <Option value="3">5 years to 8 years</Option>
                                            </Select>
                                        )}
                                    </FormItem>
                                    <FormItem {...formItemLayout1} label="支行地址" style={{marginBottom:10}}>
                                        {getFieldDecorator('userData.bank_address')(
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
                                        {getFieldDecorator('userData.maid_level')(
                                            <Select style={{ width: '100%' }} >
                                                <Option value="1">CEO</Option>
                                                <Option value="2">Head of Sales</Option>
                                                <Option value="3">Sales</Option>
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
                                        {getFieldDecorator('customerAccount.bind',{
                                            initialValue:'0'
                                        })(
                                            <RadioGroup>
                                                <Radio value="1">绑定已有账号</Radio>
                                                <Radio value="2">新建账号并绑定</Radio>
                                                <Radio value="0">不绑定返佣账号</Radio>
                                            </RadioGroup>
                                        )}
                                    </FormItem>
                                </Col>
                            </Row>
                            {getFieldValue('customerAccount.bind') === '0'||<Row>
                                <Col span={11}>
                                    <FormItem {...formItemLayout} label="账号服务器" style={{marginBottom:10}}>
                                        {getFieldDecorator('customerAccount.host_id',{
                                            rules:[{ required: true, message: '请选中账号服务器' }],
                                        })(
                                            <Select style={{ width: '100%' }} >
                                                {this.state.agent_hosts.map(v=>{
                                                    return (<Option value={v.id} key={v.id}>{v.name}</Option>)
                                                })}
                                            </Select>
                                        )}
                                    </FormItem>
                                    {getFieldValue('customerAccount.bind') === '2'&&Boolean(getFieldValue('customerAccount.host_id'))&&
                                        <div>
                                            <FormItem {...formItemLayout} label="MT4 组" style={{marginBottom:10}}>
                                                {getFieldDecorator('customerAccount.mt_group_id', {
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
                                                {getFieldDecorator('customerAccount.leverage_id', {
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
                                                {getFieldDecorator('customerAccount.password')(
                                                    <Input type="password" />
                                                )}
                                            </FormItem>
                                            <FormItem {...formItemLayout} label="交易状态" style={{marginBottom:10}}>
                                                {getFieldDecorator('customerAccount.transaction_status', {
                                                    rules: [{ required: true, message: '' }],
                                                    initialValue:1
                                                })(
                                                    <RadioGroup>
                                                        <Radio value={1}>启用</Radio>
                                                        <Radio value={0}>禁用</Radio>
                                                    </RadioGroup>
                                                )}
                                            </FormItem>
                                            <FormItem {...formItemLayout} label="Lead source" style={{marginBottom:10}}>
                                                {getFieldDecorator('customerAccount.lead_source')(<Input />)}
                                            </FormItem>
                                        </div>
                                    }   
                                </Col>
                                <Col span={11}>
                                    <FormItem {...formItemLayout} label="绑定返佣账号" style={{marginBottom:10}}>
                                        {getFieldDecorator('customerAccount.id',{
                                            rules:[{ required: true, message: '请填写或选择返佣账号' }],
                                        })(
                                            (getFieldValue('customerAccount.bind') === '1')?<Select
                                                showSearch
                                                style={{ width: '100%' }}
                                                placeholder="Select a person"
                                                optionFilterProp="children"
                                                filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                                                                                            >
                                                <Option value="jack">Jack</Option>
                                            </Select>:<Input />)
                                        }
                                    </FormItem>
                                    {getFieldValue('customerAccount.bind') === '2'&&Boolean(getFieldValue('customerAccount.host_id'))&&
                                        <div>
                                            <FormItem {...formItemLayout} label="账户组" style={{marginBottom:10}}>
                                                {getFieldDecorator('customerAccount.acc_group_id')(
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
                                                {getFieldDecorator('customerAccount.user_id')(
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
                                                {getFieldDecorator('customerAccount.password_investor')(
                                                    <Input type="password" />
                                                )}
                                            </FormItem>
                                            <FormItem {...formItemLayout} label="登录状态" style={{marginBottom:10}}>
                                                {getFieldDecorator('customerAccount.login_status', {
                                                    rules: [{ required: true, message: '' }],
                                                    initialValue:1
                                                })(
                                                    <RadioGroup>
                                                        <Radio value={1}>启用</Radio>
                                                        <Radio value={0}>禁用</Radio>
                                                    </RadioGroup>
                                                )}
                                            </FormItem>
                                            <FormItem {...formItemLayout} label="发送报告" style={{marginBottom:10}}>
                                                {getFieldDecorator('customerAccount.is_report')(<Switch />)}
                                            </FormItem>
                                        </div>
                                    }
                                </Col>
                            </Row>}
                        </Card>
                        <div style={{position: 'absolute',bottom: 0,width: '100%',borderTop: '1px solid #e8e8e8',padding: '10px 16px',textAlign: 'right',left: 0,background: '#fff',borderRadius: '0 0 4px 4px',}}>
                            <Button htmlType="submit" type="primary">保存</Button>
                            <Button style={{marginRight: 8,}} onClick={this.onClose}>取消</Button> 
                        </div>
                    </Form>
                </Drawer>
                {/* 批量划转Modal */}
                <Modal
                visible={this.state.transferVisible}
                title="批量划转"
                onOk={this.transferOk}
                onCancel={this.transferCancel}
                footer={[
                    <Button key="back" onClick={this.transferCancel}>取消</Button>,
                    <Button key="submit" type="primary" loading={this.state.transferLoading} onClick={this.transferOk}>确认</Button>,
                ]}
                >
                    <p>是否将选中的用户转移给其他负责人？</p>
                    <Select
                        showSearch
                        style={{width:200}}
                        value={this.state.transferValue}
                        defaultActiveFirstOption={false}
                        showArrow={false}
                        filterOption={false}
                        onSearch={this.transferSearch}
                        onChange={this.transferChange}
                        notFoundContent={null}
                    >
                        <Option value="1">User_id:1</Option>
                        {transferOptions}
                    </Select>
                </Modal>
                {/* 编辑用户 */}
                <Route path={this.props.match.url+'/:userid'} component={EditUsermgmt} />
            </div>
        )
    }
}

const mapStateToProps = state => {
    const { code = {data: {}},auth = {data:{}} } = state.httpData;
    const { user = {data: {}} } = state.httpUser;
    return {code,auth,user};
};


export default connect(mapStateToProps)(injectIntl(Form.create()(Usermgmt)));
// export default Usermgmt;