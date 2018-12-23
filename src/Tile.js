import React, {Component} from 'react'

export default class Tile extends Component{
    constructor(props) {
        super(props);
        this.state = {
            alive: props.alive
            , isPlaying: props.isPlaying
        }
    }

    getAliveStatus = () => this.state.alive;

    componentWillReceiveProps({alive, isPlaying}, nextContext){
         this.setState({alive, isPlaying})
    }

    render(){
        const {i, j} = this.props;
        return (this.state.isPlaying) ?
            <div
                style={{
                    margin: '.5px'
                    , width: '8px'
                    , height: '8px'
                    , background: (this.state.alive) ? 'black' : 'transparent'
                }}>
            </div>
            :
            <div
                onClick={() => {this.setState({alive: !this.state.alive})}}
                onMouseOver={() => console.log(`${i},${j}`)}
                style={{
                    margin: '.5px'
                    , width: '8px'
                    , height: '8px'
                    , background: (this.state.alive) ? 'black' :'lightgrey'
                }}>
            </div>
    }
}
