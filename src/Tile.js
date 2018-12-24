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

    componentWillReceiveProps({alive, isPlaying, isPreview}, nextContext){
        if (isPreview) {
            this.setState({preview: alive})
        } else {
            this.setState({alive, isPlaying, preview: null})
        }
    }

    render(){
        const {i, j, isPreview, onHover, onClick} = this.props;
        const { alive, isPlaying, preview } = this.state;

        return (isPlaying) ?
            <div
                style={{
                    margin: '.5px'
                    , width: '8px'
                    , height: '8px'
                    , background: (alive) ? 'black' : 'transparent'
                }}>
            </div>
            :
            <div
                onClick={onClick}
                onMouseOver={() => onHover(i, j)}
                style={{
                    margin: '.5px'
                    , width: '8px'
                    , height: '8px'
                    , background: (alive || (isPreview && preview)) ? 'black' :'lightgrey'
                }}>
            </div>
    }
}
