import React, { Component } from 'react';
import { Form, Icon, Input, Button, Checkbox } from 'antd';

import {Link,Redirect,} from 'react-router-dom'

// const FormItem = Form.Item;
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as Actions from '../../actions/status'

const mapStateToProps = state => ({
    status: state.rootReducer.status
})

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(Actions, dispatch)
})

@connect(mapStateToProps, mapDispatchToProps)

class Login extends Component {
    constructor(props) {
        super(props);
    }
    toHome() {
    }
    render(){
        console.log(localStorage.statusState)
        const {actions:{logIn,signOut},status:{isLogin}} = this.props;
        if(isLogin){
            return <Redirect to='/home'/>
        }
        return(
            <div>
            <Button onClick = {logIn}></Button>
            </div>
        )
    }
    
  
}

//  Login = Form.create()(Login);

export default Login