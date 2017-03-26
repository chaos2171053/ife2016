import React, { PropTypes, Component } from 'react';
import { MainLayoutComponents } from '../../components'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import * as Actions from '../../actions/status'
import { Redirect } from 'react-router-dom'
const { Navigation } = MainLayoutComponents
const mapStateToProps = state => ({
    status: state.rootReducer.status
})
const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(Actions, dispatch)
})
@connect(mapStateToProps, mapDispatchToProps)
@withRouter
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
        })
    }
    signout() {
        const history = this.props.history
        history.push('/')
        this.props.actions.signOut('SIGN_OUT')
    }
    render() {
        const { actions: { signOut }, status: { isLogin } } = this.props;
        debugger
        return (
            <div>
                <Navigation signout={::this.signout}/>
                {this.props.children}
            </div>
        )
    }
}
export default MainLayout