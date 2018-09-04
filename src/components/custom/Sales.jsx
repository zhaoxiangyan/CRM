// 销售机会
import React, {Component} from 'react';
import { Row, Col, Card, Table, Button, Select, Input, Pagination } from 'antd';
import BreadcrumbCustom from '../BreadcrumbCustom';
import {FormattedMessage,injectIntl} from 'react-intl';
import axios from 'axios';
import * as config from '../../axios/config';
import moment from 'moment';

const Option = Select.Option;
const InputGroup = Input.Group;
const Search = Input.Search;

const columns = [{
  title: <FormattedMessage id="custom.sales.th1" />,
  dataIndex: 'chancename',
  align:'center'
}, {
  title: <FormattedMessage id="custom.sales.th2" />,
  dataIndex: 'customername',
  render:text=>text,
  align:'center'
}, {
    title: <FormattedMessage id="custom.sales.th3" />,
    dataIndex: 'chanceowner',
    align:'center',
}, {
    title: <FormattedMessage id="custom.sales.th4" />,
    dataIndex: 'chancetype',
    align:'center',
    render:text=>{
        switch(text){
            case '1':return'居间';
            case '2':return '开户';
            case '3':return '渠道';
            case '4':return '老客户续约';
            case '5':return '老客户购买新产品';
            default:return '';
        }
    }
}, {
    title: <FormattedMessage id="custom.sales.th5" />,
    dataIndex: 'salesstatus',
    align:'center',
    render:text=>{
        switch(text){
            case '1':return'初步接洽';
            case '2':return '产品推荐';
            case '3':return '明确意向';
            case '4':return '确定签约';
            case '5':return '赢单';
            case '6':return '输单';
            default:return '';
        }
    }
}, {
    title: <FormattedMessage id="custom.sales.th6" />,
    dataIndex: 'salesamount',
    align:'center'
}, {
    title: <FormattedMessage id="custom.sales.th7" />,
    dataIndex: 'salesdate',
    align:'center',
    render:text=>moment(Number(text)).format('YYYY-MM-DD hh:mm:ss')
}, {
    title: <FormattedMessage id="custom.sales.th8" />,
    dataIndex: 'closingdate',
    align:'center',
    render:text=>moment(Number(text)).format('YYYY-MM-DD hh:mm:ss')
}, {
    title: <FormattedMessage id="custom.sales.th9" />,
    dataIndex: 'registrationdate',
    align:'center',
    render:text=>moment(Number(text)).format('YYYY-MM-DD hh:mm:ss')
}];

class Sales extends Component {
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
        axios.get(config.MOCK_CUSTOM_SALES).then(res => {
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
    // 分页器
    showTotal = (total) => {
        return `Total ${total} items`;
    }
    render() {
        const { loading,reloadloading, selectedRowKeys } = this.state;
        // 表格 Table
        const rowSelection = {
            selectedRowKeys,
            onChange: this.onSelectChange,
        };
        const hasSelected = selectedRowKeys.length > 0;
        return (
            <div className="gutter-example button-demo">
                <BreadcrumbCustom first={<FormattedMessage id="custom.breadcrumb1" />} second={<FormattedMessage id="custom.breadcrumb4" />} />
                <Row gutter={16}>
                    <Col className="gutter-row" md={24}>
                        <div className="gutter-box">
                            <Card title={<FormattedMessage id="custom.breadcrumb4" />} bordered={false} >
                                <div style={{ marginBottom: 16 }}>
                                    {hasSelected?
                                    <div>
                                        <span style={{ marginRight: 8 }}>
                                            <FormattedMessage id="user.select" values={{name:`${selectedRowKeys.length}`}} />
                                        </span>
                                        <Button type="primary" onClick={this.start} disabled={!hasSelected} loading={reloadloading}><FormattedMessage id="cancel" /></Button>
                                        <Button type="primary" ><FormattedMessage id="delete" /></Button>
                                    </div>
                                    :
                                    <div>
                                        <InputGroup compact>
                                            <span style={{marginRight:10,marginBottom:5}}>
                                                <Select defaultValue="全部" style={{ width: 100 }} >
                                                    <Option value="全部">全部</Option>
                                                    <Option value="初步接洽">初步接洽</Option>
                                                    <Option value="产品推荐">产品推荐</Option>
                                                    <Option value="明确意向">明确意向</Option>
                                                    <Option value="确定签约">确定签约</Option>
                                                    <Option value="赢单">赢单</Option>
                                                    <Option value="输单">输单</Option>
                                                </Select>
                                            </span>
                                            <span style={{marginRight:10,marginBottom:5}}>
                                                <Select defaultValue="所有机会" style={{ width: 140 }} >
                                                    <Option value="所有机会">所有机会</Option>
                                                    <Option value="归属给我的机会">归属给我的机会</Option>
                                                    <Option value="归属给下级的机会">归属给下级的机会</Option>
                                                    <Option value="无归属的机会">无归属的机会</Option>
                                                </Select>
                                            </span>
                                            <span style={{float:'right'}}>
                                                <InputGroup compact >
                                                <Select defaultValue="客户名称" >
                                                    <Option value="客户名称">客户名称</Option>
                                                    <Option value="机会名称">机会名称</Option>
                                                    <Option value="机会归属">机会归属</Option>
                                                </Select>
                                                <Search placeholder="input search text" onSearch={value => console.log(value)} enterButton style={{width:180}} />
                                                </InputGroup>
                                            </span>
                                        </InputGroup>
                                    </div>}
                                </div>
                                <Table rowSelection={rowSelection} columns={columns} dataSource={this.state.data.data} loading={loading} scroll={{x:1400}} size={'small'} rowKey="id" />
                                <div style={{textAlign:'right',marginTop:20}}>
                                    <Pagination size="small" total={50} showTotal={this.showTotal} showSizeChanger showQuickJumper />
                                </div>
                            </Card>
                        </div>
                    </Col>
                </Row>
            </div>
        )
    }
}



export default injectIntl(Sales);