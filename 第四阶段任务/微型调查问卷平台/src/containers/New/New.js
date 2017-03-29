import React, { Component, PropTypes } from 'react';
import styles from './New.scss'
import { Link } from 'react-router-dom'
import { NewComponents } from '../../components'

const { Header, Main, Footer,AddQuestion } = NewComponents

class New extends Component {
    static propTypes = {

    }
    constructor(props) {
        super(props);
    }

    render() {
         return (
            <div>
                <Header/>
                <AddQuestion/>
                <Footer/>
            </div>
        )
    }
}



export default New