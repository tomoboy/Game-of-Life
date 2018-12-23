import React, {Component} from 'react'

export default class Tile extends Component{
    constructor(props) {
        super(props);
        this.state = {
            alive: props.alive
        }
    }

    setAliveStatus = alive => {
        this.setState({alive})
    };

    getAliveStatus = () => this.state.alive;



    componentWillReceiveProps({alive}, nextContext){
         this.setState({alive})
    }

    render(){
        return (
            <div
                onClick={() => {
                    this.setState({alive: !this.state.alive})
                }}
                style={{
                    margin: '.5px'
                    , width: '8px'
                    , height: '8px'
                    , background: (this.state.alive) ? 'black' : 'lightgrey' }}>
            </div>)
    }

}