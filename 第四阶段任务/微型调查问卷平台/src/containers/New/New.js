import React, { Component, PropTypes } from 'react';
import styles from './New.scss'
import { Link } from 'react-router-dom'
import { NewComponents } from '../../components'

const { Header, Main, Footer } = NewComponents
class New extends Component {
    static propTypes = {

    }
    constructor(props) {
        super(props);
        this.state = {
            showChooseQuestionType: false
        }
    }

    render() {
        return (
            <div>
                <Header/>
                <Main/>
                <Footer/>
            </div>
        )
    }
}



export default New