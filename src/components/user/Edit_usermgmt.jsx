import React,{Component} from 'react';
import { Row, Col, Card, Button, Icon, Select, Input, Drawer, Form, Cascader, Switch, Upload, Radio } from 'antd';

// this.props.match.params.userid 动态传参
const Option = Select.Option;
const FormItem = Form.Item;
const {TextArea} = Input;
const RadioGroup = Radio.Group;


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
class EditUsermgmt extends Component{
    state = {
        // 抽屉
        visible:false,
        // 登录密码框类型
        passwordType:true
    };
    componentDidMount(){
        this.setState({visible:true}); 
    }
    // 抽屉
    onClose = () => {
        this.setState({visible: false});
        // return <Redirect to="/app/user/mgmt" />;
        this.props.history.push('/app/user/mgmt');
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
    render(){
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
        return(
            <Drawer title={'编辑用户:'+this.props.match.params.userid} width={900} placement="right" onClose={this.onClose} visible={this.state.visible} style={{height: 'calc(100% - 55px)',overflow: 'auto',paddingBottom: 53}}> 
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
        )
    }
}

export default Form.create()(EditUsermgmt); 