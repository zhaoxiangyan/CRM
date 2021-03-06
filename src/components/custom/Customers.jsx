// 客戶
import React, {Component} from 'react';
import { Row, Col, Card, Table, Button, Icon, Select, DatePicker, Input, Pagination, Drawer, Form, Upload, Modal, Popover, message } from 'antd';
import BreadcrumbCustom from '../BreadcrumbCustom';
import {FormattedMessage,injectIntl} from 'react-intl';
import { connect } from 'react-redux';
import moment from 'moment';
import {Link} from 'react-router-dom';
import {post, CRM } from '../../axios/tools';

const Option = Select.Option;
const RangePicker = DatePicker.RangePicker;
const InputGroup = Input.Group;
const Search = Input.Search;
const FormItem = Form.Item;
const {TextArea} = Input;

const columns = [{
    title: <FormattedMessage id="custom.customers.th1" />,
    dataIndex: 'dfd',
    align:'center',
}, {
    title: <FormattedMessage id="custom.customers.th2" />,
    dataIndex: 'name',
    render:(text,record)=><Link to={'/app/custom/customers/'+record.id}>{text}</Link>,
    align:'center',
}, {
    title: <FormattedMessage id="custom.customers.th3" />,
    dataIndex: 'follow_ups.content',
    align:'center',   
}, {
    title: <FormattedMessage id="custom.customers.th4" />,
    dataIndex: 'number',
    align:'center'
}, {
    title: <FormattedMessage id="custom.customers.th5" />,
    dataIndex: 'principal_owner_name',
    align:'center'
}, {
    title: <FormattedMessage id="custom.customers.th6" />,
    dataIndex: 'return_v_time',
    align:'center',
    sorter: true
}, {
    title: <FormattedMessage id="custom.customers.th7" />,
    dataIndex: 'type_name',
    align:'center'
}, {
    title: <FormattedMessage id="custom.customers.th8" />,
    dataIndex: 'source_name',
    align:'center'
}, {
    title: <FormattedMessage id="custom.customers.th9" />,
    dataIndex: 'mobile',
    render:(text,record)=><span>{record.mobile_prefix}&nbsp;{text}</span>,
    align:'center'
}, {
    title: <FormattedMessage id="custom.customers.th10" />,
    dataIndex: 'email',
    align:'center'
}, {
    title: <FormattedMessage id="custom.customers.th11" />,
    dataIndex: 'created_at',
    align:'center',
    sorter: true
}, {
    title: <FormattedMessage id="custom.customers.th12" />,
    dataIndex: 'follow_ups.created_at',
    align:'center',
    sorter:true
}, {
    title: <FormattedMessage id="custom.customers.th13" />,
    dataIndex: 'accounts',
    align:'center',
    render:text=>{
        if(text.length === 0){
            return <span />;
        }else if(text.length === 1){
            return <Link to={"/app/accounts/"+text[0].number} target="_blank">{text[0].number}</Link>;
        }else{
            return <Popover 
                    content={<div>
                        {text.map( (v,i) =>(
                            <p key={i} style={{marginBottom:0}}><Link to={"/app/accounts/"+v.number} target="_blank">{v.number}</Link></p>
                        ))}
                    </div>}
                   >
                        <Link to={"/app/accounts/"+text[0].number} target="_blank">{text[0].number}&nbsp;...</Link>
                   </Popover>;
        }
    }
}, {
    title: <FormattedMessage id="custom.customers.th14" />,
    dataIndex: 'status_name',
    align:'center'
}];

class Customers extends Component {
    state = {
        selectedRowKeys: [], // Check here to configure the default column
        reloadloading: false,
        loading:true,
        data:{},
        // 抽屉
        visible:false,
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
        // 查询条件
        search:{
           type:'0',
           status:'0',
           timetype:'1',
           start:'',
           end:'',
           source:'0',
           keywordtype:'1',
           keyword:'',
           page:'1',
           pagesize:'10',
           sorttype:'',
           sortname:''
        },
        // 总条数
        total:50

    };
    componentWillMount(){
        this.getCustomerlists();
    }
    componentWillUnmount = () => {
        this.setState = (state,callback)=>{
           return;
        };
    }
    // 获取客户列表
    getCustomerlists = () => {
        console.log(this.state.search);
        this.setState({loading:true});
        post({
            url:CRM.getcustomerlists,
            data:this.state.search,
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
    // 第一个select 所有客户
    handleChange1 = (type) => {
        this.setState({search:{...this.state.search,type}},()=>{
            this.getCustomerlists();
        }); 
    }
    // 第二个select 客户状态
    handleChange2 = (status) => {
        this.setState({search:{...this.state.search,status}},()=>{
            this.getCustomerlists();
        }); 
    }
    timetypeChange = (timetype) => {
        this.setState({search:{...this.state.search,timetype}}); 
    }
    // 时间选择器 创建时间
    onChange3 = (dates, dateStrings) => {
        console.log('From: ', dates[0], ', to: ', dates[1]);
        console.log('From: ', dateStrings[0], ', to: ', dateStrings[1]);
    }
    // 第三个select 全部来源
    handleChange3 = (source) => {
        this.setState({search:{...this.state.search,source}},()=>{
            this.getCustomerlists();
        }); 
    }
    // 第四个select 客户姓名
    handleChange4 = (keywordtype) => {
        this.setState({search:{...this.state.search,keywordtype}}); 
    }
    // 关键词搜索
    handleSearch = (keyword) => {
        this.setState({search:{...this.state.search,keyword}},()=>{
            this.getCustomerlists();
        }); 
    }
    // 分页器
    pageChange = (page,pagesize) => {
        this.setState({search:{...this.state.search,page,pagesize}},()=>{
            this.getCustomerlists();
        }); 
    }
    pagesizeChange = (page,pagesize) => {
        this.setState({search:{...this.state.search,page,pagesize}},()=>{
            this.getCustomerlists();
        }); 
    }
    showTotal = (total) => {
        return `Total ${total} items`;
    }
    // 排序
    sorterChange = (pagination,filters,sorter) => {
        console.log(sorter.order,sorter.field);
         this.setState({search:{...this.state.search,sorttype:sorter.order,sortname:sorter.field}},()=>{
            this.getCustomerlists();
        });
    }
    // 抽屉  添加
    showDrawer = () => {
        this.setState({visible:true})
    }
    onClose = () => {
        this.setState({visible: false});
    };
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
    // 新建客户  保存
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
        const {phone_code} = this.props;
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
            {phone_code.map(r=>{
                return (
                    <Option key={r.value} value={r.value} className="codeOption"><img src={r.img} alt={r.option} /><span>{r.option}</span><span>{r.value}</span></Option>
                )
            })}
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
                                            <Select defaultValue="0" style={{ width: 120 }} onChange={this.handleChange1}>
                                                <Option value="0">所有客户</Option>
                                                <Option value="1">归属给我的客户</Option>
                                                <Option value="2">归属给下级的客户</Option>
                                                <Option value="3">无归属客户</Option>
                                                <Option value="4">我关注的客户</Option>
                                                <Option value="5">我参与的客户</Option>
                                                <Option value="6">下级参与人的客户</Option>
                                            </Select>
                                        </span>
                                        <span style={{marginRight:10,marginBottom:5}}>
                                            <Select defaultValue="0" style={{ width: 120 }} onChange={this.handleChange2}>
                                                <Option value="0">客户状态</Option>
                                                <Option value="1">销售线索</Option>
                                                <Option value="2">潜在客户</Option>
                                                <Option value="3">开户客户</Option>
                                                <Option value="4">入金客户</Option>
                                                <Option value="5">交易客户</Option>
                                            </Select>
                                        </span>
                                        <span style={{marginRight:10,marginBottom:5}}>
                                            <InputGroup compact>
                                                {/* <Button><FormattedMessage id="custom.customers.create" /></Button> */}
                                                <Select defaultValue="0" onChange={this.timetypeChange}>
                                                    <Option value="0">创建时间</Option>
                                                    <Option value="1">回访时间</Option>
                                                    <Option value="2">最近跟进时间</Option>
                                                </Select>
                                                <RangePicker ranges={{[intl.messages.ranges_day]:[moment(), moment()], [intl.messages.ranges_month]: [moment(), moment().endOf('month')] }} onChange={this.onChange3} />
                                            </InputGroup>
                                        </span>
                                        <span style={{marginRight:10,marginBottom:5}}>
                                            <Select defaultValue="0" style={{ width: 120 }} onChange={this.handleChange3}>
                                                <Option value="0">全部来源</Option>
                                                <Option value="1">代理注册推广链接</Option>
                                                <Option value="2">Trader注册推广链接</Option>
                                                <Option value="3">官网代理申请</Option>
                                                <Option value="4">FX168推广</Option>
                                                <Option value="5">官网注册</Option>
                                                <Option value="6">名单数据</Option>
                                                <Option value="7">客户介绍</Option>
                                                <Option value="8">居间介绍</Option>
                                                <Option value="9">线下活动</Option>
                                                <Option value="10">销售新增</Option>
                                            </Select>
                                        </span>
                                        <span style={{float:'right'}}>
                                            <InputGroup compact >
                                            <Select defaultValue="0" onChange={this.handleChange4}>
                                                <Option value="0">客户姓名</Option>
                                                <Option value="1">客户归属</Option>
                                                <Option value="2">客户编号</Option>
                                                <Option value="3">电话</Option>
                                                <Option value="4">邮箱</Option>
                                                <Option value="5">参与人</Option>
                                                <Option value="6">实盘账号</Option>
                                            </Select>
                                            <Search placeholder="搜索" onSearch={this.handleSearch} enterButton style={{width:180}} />
                                            </InputGroup>
                                        </span>
                                    </InputGroup>
                                    </div>}
                                </div>
                                <Table onChange={this.sorterChange} rowSelection={rowSelection} columns={columns} dataSource={this.state.data.data} loading={loading} scroll={{x:1400}} size={'small'} pagination={false} rowKey="id" />
                                <div style={{textAlign:'right',marginTop:20}}>
                                    <Button style={{float:'left'}} size="small" title="回收站"><Icon type="delete" /></Button>
                                    <Pagination size="small" total={this.state.data.total} showTotal={this.showTotal} showSizeChanger showQuickJumper onChange={this.pageChange} onShowSizeChange={this.pagesizeChange} />
                                </div>
                            </Card>
                        </div>
                    </Col>
                </Row>
                <Drawer title="新建客户" width={900} placement="right" onClose={this.onClose} visible={this.state.visible} style={{height: 'calc(100% - 55px)',overflow: 'auto',paddingBottom: 53}}> 
                    <Form onSubmit={this.handleSubmit}>
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
                                            rules: [{ required: false, message: '请输入手机号码!' }]
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
                                                initialValue:this.state.fileList
                                            })(
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
                        <div style={{position: 'absolute',bottom: 0,width: '100%',borderTop: '1px solid #e8e8e8',padding: '10px 16px',textAlign: 'right',left: 0,background: '#fff',borderRadius: '0 0 4px 4px',}}>
                            <Button htmlType="submit" type="primary">保存</Button>
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
    const { phone_code } = state.clientData;
    return {phone_code};
};


export default connect(mapStateToProps)(injectIntl(Form.create()(Customers)));