import React, { PropTypes, Component } from 'react';
import { MainLayoutComponents } from '../../components'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
// import { withRouter } from 'react-router-dom'
import * as Actions from '../../actions/status';
import { Redirect } from 'react-router-dom';
import styles from './MainLayout.scss';

const { Navigation } = MainLayoutComponents
const mapStateToProps = state => ({
    status: state.rootReducer.status
})
const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(Actions, dispatch)
})
@connect(mapStateToProps, mapDispatchToProps)
// @withRouter
class MainLayout extends Component {
    constructor(props) {
        super(props)
    }
    static propTypes = {
        actions: React.PropTypes.shape({
            signOut: React.PropTypes.func.isRequired,
        }),
        status: React.PropTypes.shape({
            isLogin: React.PropTypes.bool.isRequired,
        }),
        children:React.PropTypes.element.isRequired,
    }
    signout() {
        // const history = this.props.history
        // history.push('/')
        this.props.actions.signOut('SIGN_OUT')
        // return <Redirect to='/' />
    }
    render() {
        const { actions: { signOut }, status: { isLogin } } = this.props;
        // debugger
        if (!isLogin) {
            return <Redirect to='/' />
        }
        return (
            <div>
                <Navigation signout={::this.signout}/>
                <div className={styles['content-wrapper']}>
                    <div className={styles.jumbotron}>
                    {this.props.children}
                    </div>
                </div>
            </div>
        )
    }
}
export default MainLayout