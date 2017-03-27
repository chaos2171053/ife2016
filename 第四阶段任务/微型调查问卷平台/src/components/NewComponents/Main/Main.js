import React from 'react';
import styles from '../../../containers/New/New.scss';
import AddQuestion from './AddQuestion';
// import SingleChoice from './SingleChoice';
const Main = () => {
    //这里传进status的quesions模板
    //然后根据question的tye加载不同的组件,传进不同的acion
    //push进一个数组中
    //在return里把数组展开就好了
    // <div className={styles['questions-wrapper']}>
    //             <div>
    //                 <span>Q1(单选题)</span>
    //                 <input placeholder='请填写题目' />
    //             </div>
    //             <div className={styles['options-wrapper']}>
    //                 <div className={styles['options']}>
    //                     <span className={styles['radio-icon']} />
    //                     <input placeholder='请填写题目' />
    //                 </div>
    //                 <div className={styles['options']}>
    //                     <span className={styles['radio-icon']} />
    //                     <input placeholder='请填写题目' />
    //                 </div>
    //             </div>
    //         </div>
    return (
        <div className={styles.main}>
            <hr className={styles.hr} />
            <div className={styles['radio-checkbox-wrapper']}>
                <div className={styles['choice-title']}>
                    <span>Q1</span>
                    请输入标题（这里重构input）
                </div>
                <div className={styles['option-wrapper']}>
                    <div className={styles['option']}>
                        <span className={styles['options-icon']} />
                        （选项1）这里有一个input
                        <span className={styles['optionc-delete']} />
                    </div>
                    <div className={styles['option']}>
                        <span className={styles['options-icon']} />
                        （选项2）这里有一个input
                        <span className={styles['optionc-delete']} />
                    </div>
                    <div className={styles['add-option-btn']}></div>
                </div>
                <div className={styles['option-operation']}>
                    <span>上移</span>
                    <span>下移</span>
                    <span>复用</span>
                    <span>删除</span>
                </div>
            </div>
            <AddQuestion />
            <hr className={styles.hr} />
        </div>
    )
}
export default Main