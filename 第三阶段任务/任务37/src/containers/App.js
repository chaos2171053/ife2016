import React, {
	Component,
	PropTypes
} from 'react';
import {
	bindActionCreators
} from 'redux';
import {
	connect
} from 'react-redux'
import {
	DragDropContext
} from "react-dnd";
import HTML5Backend from "react-dnd-html5-backend";
import Dialog from '../components/Dialog';
import DialogActions from '../actions/dialog';
import styles from '../styles/App.css';


// 这个函数来指定如何把当前 Redux store state 映射到展示组件的 props 中
const mapStateToProps = state => ({
	dialog: state.dialog
});


//mapDispatchToProps() 方法接收 dispatch() 方法并返回期望注入到展示组件的 props 中的回调方法
const mapDispatchToProps = dispatch => ({
	actions: bindActionCreators(DialogActions, dispatch)
});


@connect(mapStateToProps, mapDispatchToProps)
@DragDropContext(HTML5Backend)

class App extends Component {
	constructor(props) {
		super(props);
		this.handleClick = this.handleClick.bind(this);
	}

	//props 校验
	static propTypes = {
		dialog: PropTypes.object.isRequired,
		actions: PropTypes.object.isRequired
	};

	//点击弹出浮出层
	handleClick() {
		const {
			dialog: {
				enter
			},
			actions: {
				alertDialog,
				displayDialog
			}
		} = this.props;
		alertDialog();
		document.body.style["overflow-y"] = "hidden";
		setTimeout(() => {
			if (enter) {
				displayDialog();
			}
		}, 416);

	}

	//渲染浮出层
	renderDialog(dialog, actions) {
		if (dialog.visible) {
			const {
				displayDialog,
				dragDialog,
				hideDialog,
				initDialog
			} = actions;

			//返回一个矩形对象，包含四个属性：left、top、right和bottom。分别表示元素各边与页面上边和左边的距离
			const {
				top,
				right,
				bottom,
				left
			} = this.refs.btn.getBoundingClientRect();

			const [animationX, animationY] = [left + right >> 1, top + bottom >> 1];

			return (
				<Dialog
                    {...dialog}
                    displayDialog={displayDialog}
                    dragDialog={dragDialog}
                    hideDialog={hideDialog}
                    initDialog={initDialog}
                    title="Dialog"
                    hint="this is a dialog"
                    confirm="confirm"
                    cancel="cancel"
                    width={600}
                    height={300}
                    animationX={animationX}
                    animationY={animationY}
                    duration={.5}
                />
			);
		}
	}



	render() {
		const {
			dialog,
			actions
		} = this.props;
		return (
			<div>
			    <input ref="btn" type="button" value="click" className={styles.btn} onClick = {this.handleClick}/>
			    <p className={styles.paragraph}>hello chaos</p>
			    {this.renderDialog(dialog, actions)}
			</div>
		);
	}
}

export default App;