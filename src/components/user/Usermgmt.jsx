// Broker Work 用戶
import React, {Component} from 'react';
import { Row, Col, Card, Table, Button } from 'antd';
import BreadcrumbCustom from '../BreadcrumbCustom';
import {FormattedMessage} from 'react-intl';
// import axios from 'axios';
// import * as config from '../../axios/config';
// import { connect } from 'react-redux';
// import { bindActionCreators } from 'redux';
// import { receiveUser } from '@/action';


const columns = [{
  title: <FormattedMessage id="user.brokerwork.th1" />,
  dataIndex: 'userid',
  fixed:'left'
}, {
  title: <FormattedMessage id="user.brokerwork.th2" />,
  dataIndex: 'name',
  fixed:'left'
}, {
    title: <FormattedMessage id="user.brokerwork.th3" />,
    dataIndex: 'email',
}, {
    title: <FormattedMessage id="user.brokerwork.th4" />,
    dataIndex: 'telephone',
}, {
    title: <FormattedMessage id="user.brokerwork.th5" />,
    dataIndex: 'role',
}, {
    title: <FormattedMessage id="user.brokerwork.th6" />,
    dataIndex: 'country',
}, {
    title: <FormattedMessage id="user.brokerwork.th7" />,
    dataIndex: 'comment',
}, {
    title: <FormattedMessage id="user.brokerwork.th8" />,
    dataIndex: 'level',
}, {
    title: <FormattedMessage id="user.brokerwork.th9" />,
    dataIndex: 'superior',
}, {
    title: <FormattedMessage id="user.brokerwork.th10" />,
    dataIndex: 'id',
}, {
    title: <FormattedMessage id="user.brokerwork.th11" />,
    dataIndex: 'subordinate',
}, {
    title: <FormattedMessage id="user.brokerwork.th12" />,
    dataIndex: 'registration',
}, {
    title: <FormattedMessage id="user.brokerwork.th13" />,
    dataIndex: 'loginstatus',
}, {
    title: <FormattedMessage id="user.brokerwork.th14" />,
    dataIndex: 'client',
}, {
  title: <FormattedMessage id="user.brokerwork.th15" />,
  dataIndex: 'direct',
}];

let data = [];

for (let i = 0; i < 46; i++) {
  data.push({
    key: i,
    userid: `Edward King ${i}`,
    name: 32,
    email: 32,
    telephone: 32,
    role: 32,
    country: 32,
    comment: 32,
    level: 32,
    superior: 32,
    id: 32,
    subordinate: 32,
    registration: 32,
    loginstatus: 32,
    client: 32, 
    direct: `London, Park Lane no. ${i}`,
  });
}
class Usermgmt extends Component {
    state = {
        selectedRowKeys: [], // Check here to configure the default column
        loading: false,
        data:[]
    };
    componentWillMount() {
        
    }
    componentDidMount(){
        // const { fetchData } = this.props;
        // fetchData({funcName:'brokerwork',stateName:'user'});
        // axios.get(config.MOCK_USER_BROKERWORK).then(res => {
        //     console.log(res.data.data);
        //     this.setState({data:res.data.data});
        // }).catch(err => {
        //     console.log(err);
        // });
        // const { receiveUser } = this.props;
        // receiveUser(data,'user');
        // console.log('Usermgmt');
    }
    start = () => {
        this.setState({ loading: true });
        // ajax request after empty completing
        setTimeout(() => {
        this.setState({
            selectedRowKeys: [],
            loading: false,
        });
        }, 1000);
    }
    onSelectChange = (selectedRowKeys) => {
        console.log('selectedRowKeys changed: ', selectedRowKeys);
        this.setState({ selectedRowKeys });
    }
    render() {
        // const {user} = this.props;
        // console.log(user.data);
        const { loading, selectedRowKeys } = this.state;
        const rowSelection = {
            selectedRowKeys,
            onChange: this.onSelectChange,
        };
        const hasSelected = selectedRowKeys.length > 0;
        return (
            <div className="gutter-example button-demo">
                <BreadcrumbCustom first={<FormattedMessage id="user.breadcrumb1" />} second={<FormattedMessage id="user.breadcrumb2" />} />
                <Row gutter={16}>
                    <Col className="gutter-row" md={24}>
                        <div className="gutter-box">
                            <Card bordered={false} >
                            <div style={{ marginBottom: 16 }}>
                                <Button type="primary" onClick={this.start} disabled={!hasSelected} loading={loading}>
                                    Reload
                                </Button>
                                <span style={{ marginLeft: 8 }}>
                                    {hasSelected ? <FormattedMessage id="user.brokerwork.select" values={{name:`${selectedRowKeys.length}`}} /> : ''}
                                </span>
                            </div>
                            <Table rowSelection={rowSelection} columns={columns} dataSource={data} scroll={{x:1400}} />
                            </Card>
                        </div>
                    </Col>
                </Row>
            </div>
        )
    }
}

// const mapStateToProps = state => {
//     const { user = {data: {}} } = state.httpData;
//     return {user};
// };

// const mapDispatchToProps = dispatch => ({
//     receiveUser: bindActionCreators(receiveUser, dispatch)
// });

// export default connect(mapStateToProps,mapDispatchToProps)(Usermgmt);
export default Usermgmt;