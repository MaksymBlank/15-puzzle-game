import React from 'react';
import './Board.scss';
import Square from './Square';

import _ from 'lodash';

export default class Board extends React.Component{
    constructor(props){
        super(props);

        this.state = {squares: Array.apply(null, {length: Math.pow(props.size, 2)}).map((v, i) => i + 1)};
    }

    shuffle(){
        this.setState({
            squares: _.shuffle(this.state.squares)
        })
    }

    onSwitchHandler(key){
        const keyIndex = _.indexOf(this.state.squares, key);
    }

    render(){
        return (
            <div>
                <div className="game-title">
                    <h1>15 puzzle</h1>
                    <div>
                        <button onClick={this.shuffle.bind(this)} className="btn btn-secondary">Shuffle</button>
                    </div>
                </div>
                <div className="board shadow">
                    {this.state.squares.map((v, i) => <Square onSwitch={(key) => this.onSwitchHandler(key)} key={i} value={v} />)}
                </div>
            </div>
        )
    }
}