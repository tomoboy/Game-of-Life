import React, {Component} from 'react'

export default class Tile extends Component{
    constructor(props) {
        super(props);
        this.state = {
            alive: props.alive
            , isPlaying: props.isPlaying
            , preview: false
        }
    }

    componentWillReceiveProps({alive, isPlaying}, context){
        this.setState({alive, isPlaying});
    }
    setPreview = preview => this.setState({preview});

    render(){
        const { i, j, onHover, onClick } = this.props;
        const { alive, isPlaying, preview } = this.state;

        return (isPlaying) ?
            <svg
                style={{
                    margin: '.5px'
                    , width: '8px'
                    , height: '8px'
                    , background: (alive) ? 'black' : 'transparent'
                }}>
            </svg>
            :
            <svg
                onClick={onClick}
                onMouseOver={() => onHover(i, j)}
                style={{
                    margin: '.5px'
                    , width: '8px'
                    , height: '8px'
                    , background: (alive || preview) ? 'black' :'lightgrey'
                }}>
            </svg>
    }
}
