import React,{PropTypes} from 'react'
import styles from '../../../containers/New/New.scss'
import Input from '../../Input/Input'
const Header = ({handleEditText,questionnarireTitle}) => {
    return (
        <Input className = {styles.header} placeholder='请填写标题' handleEditText = {handleEditText} value ={questionnarireTitle}/>
    )

}
Header.propTypes = {
    questionnarireTitle:PropTypes.string,
    handleEditText: PropTypes.func.isRequired
};
export default Header