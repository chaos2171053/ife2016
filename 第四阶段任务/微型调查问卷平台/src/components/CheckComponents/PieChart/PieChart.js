import React, { Component } from 'react';
export class PieChart extends React.Component {
    
    render() {
        return (
            <div className="pie-react">
                <div ref="PieChart" style={{width: "100%", height: "200px"}}></div>
            </div>
        )
    }
}