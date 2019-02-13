import React from 'react';
import './Square.scss';

export default class Square extends React.Component{

    getBlock(){
        if(this.props.value === 16){
            return (
                <div className="square-block empty"></div>
            );
        }

        return (
            <div className="square-block">
                <h2>{this.props.value}</h2>                
            </div>
        );
    }

    render(){
        return (
            <div onClick={this.props.onSwitch.bind(null, this.props.value)} className="square">
                {
                    this.getBlock()
                }
            </div>
        )
    }
}