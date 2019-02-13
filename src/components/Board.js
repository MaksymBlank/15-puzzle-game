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
        const emptyIndex = _.indexOf(this.state.squares, 16);

        // checking if key is movable

        if(!_.includes([keyIndex - 1, keyIndex + 1, keyIndex - 4, keyIndex + 4], emptyIndex)){
            return;
        }

        let squares = this.state.squares;

        squares = _.map(squares, (v, i) => {
            if(i === keyIndex){
                return 16;
            }
            if(i === emptyIndex){
                return key;
            }

            return v;
        })

        this.setState({
            squares: squares
        })
    }

    render(){
        return (
            <div className="game shadow">
                <div className="game-title">
                    <h1>15 puzzle</h1>
                    <div>
                        <button onClick={this.shuffle.bind(this)} className="btn btn-secondary">Shuffle</button>
                    </div>
                </div>
                <div className="board">
                    {this.state.squares.map((v, i) => <Square position={[Math.floor(i / this.props.size), i % this.props.size]} onSwitch={(key) => this.onSwitchHandler(key)} key={i} value={v} />)}
                </div>
            </div>
        )
    }
}