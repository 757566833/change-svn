import React from 'react';
import { withRouter } from 'react-router-dom';
import { Input, Button, message } from 'antd';
import Control from '../../control/components/Index';
import './style.less';
export let IndexRef;
class Index extends React.Component {
    constructor(props) {
        super(props);
        IndexRef = this;
        this.isMount = true;
    }
    state = {
        username: '',
        password: '',
        npassword: '',
        cpassword: ''
    }
    componentWillUnmount = () => {
        this.isMount = false;
    }
    success = () => {
        message.info('修改成功');
    }
    interfaceError = (msg) => {
        message.error(`接口错误，错误信息${msg}`);
    }
    networkError = (code) => {
        message.error(`网络错误${code}`);
    }
    changeusername = (e) => {
        this.setState({
            username: e.target.value
        });
    }
    changepassword = (e) => {
        this.setState({
            password: e.target.value
        });
    }
    changenpassword = (e) => {
        this.setState({
            npassword: e.target.value
        });
    }
    changecpassword = (e) => {
        this.setState({
            cpassword: e.target.value
        });
    }
    submit = () => {
        const {
            username,
            password,
            npassword,
            cpassword
        } = this.state;
        if (!(username && password && npassword && cpassword)) {
            message.error('参数不全');
            return;
        }
        if (npassword !== cpassword) {
            message.error('两次密码不一致');
            return;
        }
        Control.Changepassword({ username, password, npassword });
    }
    render() {
        const {
            username,
            password,
            npassword,
            cpassword
        } = this.state;
        return (
            <div className='Index flex'>
                <div className='content flex'>
                    <div style={{ textAlign: 'center' }}>
                        <h1>公司内网svn修改密码</h1>
                    </div>
                    <div style={{ marginBottom: 16 }}>
                        <Input addonBefore={'账号'} value={username} onChange={this.changeusername} />
                    </div>
                    <div style={{ marginBottom: 16 }}>
                        <Input type='password' addonBefore={'旧密码'} value={password} onChange={this.changepassword} />
                    </div>
                    <div style={{ marginBottom: 16 }}>
                        <Input type='password' addonBefore={'新密码'} value={npassword} onChange={this.changenpassword} />
                    </div>
                    <div style={{ marginBottom: 16 }}>
                        <Input type='password' addonBefore={'确认新密码'} value={cpassword} onChange={this.changecpassword} />
                    </div>
                    <Button type="primary" onClick={this.submit}>确定</Button>
                </div>

            </div>
        );
    }
}
export default withRouter(Index);
