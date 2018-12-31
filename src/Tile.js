import React, {Component} from 'react'
import { Rect } from 'react-konva'
import {CELL_COLOUR} from './constants'

export default class Tile extends Component{
    constructor(props) {
        super(props);
        this.state = {
            alive: props.alive
            , preview: false
            , visited: false
            , hoverTimer: 0
        }
    }

    getColour = () => {
        const { preview, alive, visited } = this.state;
        if (alive || preview) {
            return CELL_COLOUR.living;
        } else if (visited) {
            return CELL_COLOUR.visited;
        } else {
          return CELL_COLOUR.dead;
        }
    };

    onMouseOut = () => {
        clearTimeout(this.state.hoverTimer);
        this.setState({hoverTimer: 0});
    };

    onHover = () => {
        let {x, y, onHover } = this.props;
        let hoverTimer = setTimeout(() => onHover(x, y), 10);
        this.setState({hoverTimer});
    };


    componentWillReceiveProps({alive}, context){
        let {visited} = this.state;
        this.setState({alive, visited: visited || alive});
    }

    setPreview = preview => this.setState({preview});

    render(){
        const { x, y, onClick } = this.props;
        return (
            <Rect
                x={x * 10}
                y={y * 10}
                width={10}
                height={10}
                fill={this.getColour()}
                stroke='white'
                strokeWidth={0.5}
                onClick={onClick}
                onMouseOver={this.onHover}
                onMouseOut={this.onMouseOut}
            />

        )
    }
}
