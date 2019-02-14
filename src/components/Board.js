import React from 'react';
import './Board.scss';
import Square from './Square';

import _ from 'lodash';
import swal from 'sweetalert2';

export default class Board extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            squares: Array.apply(null, {length: Math.pow(props.size, 2)}).map((v, i) => i + 1),
            started: false
        };
    }

    shuffle(){
        // stop game if started
        if(this.state.started){
            this.setState({
                started: false,
                squares: Array.apply(null, {length: Math.pow(this.props.size, 2)}).map((v, i) => i + 1)
            })
            return;
        }

        let squares = this.state.squares;

        this.setState({
            started: true
        })

        let possibleMoves, emptyIndex, oldIndex;

        for(let i = 0; i < 1000; i ++){
            possibleMoves = []
            emptyIndex = _.indexOf(squares, 16);
            const chunks = _.chunk(squares, 4);

            const lineIndex = Math.floor(emptyIndex / 4); // line index

            // checks if left block exists
            if(_.indexOf(chunks[lineIndex], 16) !== 0){
                possibleMoves.push(emptyIndex - 1);
            }

            // checks if right block exists
            if(_.indexOf(chunks[lineIndex], 16) !== 3){
                possibleMoves.push(emptyIndex + 1);
            }

            // checks if top block exists
            if(chunks[lineIndex - 1]){
                possibleMoves.push(emptyIndex - 4);
            }

            // checks if bottom block exists
            if(chunks[lineIndex + 1]){
                possibleMoves.push(emptyIndex + 4);
            }

            // Removes old moves to make it more difficult
            possibleMoves = _.without(possibleMoves, oldIndex);

            // Random pick
            const pickedIndex = possibleMoves[Math.floor(Math.random()*possibleMoves.length)];

            squares = _.map(squares, (v, i) => {
                if(i === pickedIndex){
                    return 16;
                }
                if(i === emptyIndex){
                    return squares[pickedIndex];
                }
    
                return v;
            })
            oldIndex = emptyIndex;
        }

        this.setState({
            squares: squares
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

        // checks if you won
        if(_.size(_.filter(squares, (v,i) => v === i + 1)) === 16){
            this.setState({
                started:false
            })

            swal.fire({
                title: 'You won! Congrats!',
                text: 'Wanna play another game?',
                confirmButtonText: 'Play',
                showCancelButton: true,
                showCloseButton: true,
                type: 'success'
            }).then((res) => {
                if(res.value){
                    this.shuffle();
                }
            })
        }
    }

    render(){
        return (
            <div className="game shadow">
                <div className="game-title">
                    <h1>15 puzzle</h1>
                    <div>
                        <button onClick={this.shuffle.bind(this)} className={this.state.started ? 'btn btn-danger' : 'btn btn-primary'}>{this.state.started ? 'Stop' : 'Start game'}</button>
                    </div>
                </div>
                <div className="board" style={this.state.started ? {} : {pointerEvents: 'none'}}>
                    {this.state.squares.map((v, i) => <Square position={[Math.floor(i / this.props.size), i % this.props.size]} onSwitch={(key) => this.onSwitchHandler(key)} key={i} value={v} />)}
                </div>
            </div>
        )
    }
}