import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as StatusActions from '../../actions/status'
import * as QuestionnairesActions from '../../actions/questionnaires'
import { Link, Redirect } from 'react-router-dom'
import '../../styles/reset.css';
import styles from './Login.scss'
import classNames from "classnames";

import { Main } from '../';
import { LoginComponents } from '../../components'


const { Header, Navigation, Signup, Signin, Starry } = LoginComponents

const mapStateToProps = state => ({
    status: state.rootReducer.status,
    questionnaires: state.rootReducer.questionnaires,
})


const mapDispatchToProps = dispatch => ({
    actions: Object.assign({},
        bindActionCreators(StatusActions, dispatch),
        bindActionCreators(QuestionnairesActions, dispatch),
    )
})

@connect(mapStateToProps, mapDispatchToProps)

class Login extends Component {
    static propTypes = {
        actions: React.PropTypes.shape({
            logIn: React.PropTypes.func.isRequired,
            renderSignin: React.PropTypes.func,
            renderSignup: React.PropTypes.func,
            userSignup: React.PropTypes.func.isRequired,
        }),
        status: React.PropTypes.shape({
            isLogin: React.PropTypes.bool.isRequired,
            isRenderSignin: React.PropTypes.bool,
            isRenderSignup: React.PropTypes.bool,
        }),
        questionnaires: React.PropTypes.arrayOf(React.PropTypes.object)
    }
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        var cx = document.getElementById('canvas');
        var ctx = cx.getContext('2d');
        var St = new Starry(cx, ctx);
        St.step();
        window.onresize = function () {
            St.cx.width = St.cx.clientWidth;
            St.cx.height = St.cx.clientHeight;
            if (St.dots.length == 0) {
                St.construct();
            }
            St.render();
        };
        
        cx.onmousemove = function (e) {
            St.mousePos[0] = e.clientX - cx.offsetLeft;
            St.mousePos[1] = e.clientY - 64;
        }
        window.onresize();
    }
    render() {
        
        const {
            actions: { logIn, renderSignin, renderSignup, userSignup },
            status: { isLogin, isRenderSignin, isRenderSignup },
            questionnaires,
            location,
        } = this.props;
        // const WIDTH = window.innerWidth, HEIGHT = window.innerHeight;
        const canvasStyle = {
            position: 'absolute',
            top: '0',
            height: '100%',
            width: '100%',
            margin: '0',
            padding: '0',
            display: 'block',
            // background: 'blue',
        }

        //如果已经登录过，跳到home页面
        if (isLogin) {
            return <Redirect to='/home' />
        }

        return (
            <div className={styles['main-warpper']}>
                <div className={styles.main}>
                    <div className={styles['main-body']}>
                        <Header />
                        <div className={styles.content}>
                            <Navigation {...this.props} />
                            {isRenderSignup ?
                                (<Signup
                                    renderSignin={renderSignin}
                                    questionnaires={questionnaires}
                                    userSignup={userSignup} />)
                                : (<Signin
                                    logIn={logIn}
                                    questionnaires={questionnaires} />)}
                        </div>
                    </div>
                </div>
                <canvas id='canvas' style={canvasStyle} className={styles.canvasBackground}></canvas>
            </div>
        )
    }
}



export default Login