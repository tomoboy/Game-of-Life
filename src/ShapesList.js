import React, {Component} from 'react';
import List from "../node_modules/@material-ui/core/List/List";
import shapes from './shapes/shapes'
import ListSubheader from "@material-ui/core/ListSubheader/ListSubheader";
import ListItem from "@material-ui/core/ListItem/ListItem";
import ListItemText from "@material-ui/core/ListItemText/ListItemText";
import {BACKGROUND_COLOUR} from "./constants";

const listStyle = {
    position: 'relative'
    , overflow: 'auto'
    , maxHeight: '500px'
};

export default class ShapesList extends Component{
    state = {
        selected: null
    };

    onClick = (shape) => {
        this.setState({selected: shape});
        this.props.setSelectedShape(shape);
    };

    componentWillMount(){
        this.setState({selected: shapes[''][0]});
        this.props.setSelectedShape(shapes[''][0]);
    }

    render(){
        const { setPreviewShape } = this.props;
        const { selected } = this.state;
        return (
            <List subheader={<li />} style={listStyle} dense disablePadding={true} >
                {Object.keys(shapes).map(category => (
                    <li key={category}>
                        <ul>
                            <ListSubheader style={{backgroundColor: BACKGROUND_COLOUR, color: 'black'}}>{category}
                            </ListSubheader>
                            {shapes[category].map(shape => {
                                    return (
                                        <ListItem
                                            button
                                            onClick={() => this.onClick(shape)}
                                            onMouseOver={() => setPreviewShape(shape)}
                                            onMouseLeave={() => setPreviewShape(null)}
                                            key={shape.name}
                                            selected={selected === shape}>
                                            <ListItemText primary={shape.name}/>
                                        </ListItem>
                                    )}
                            )}
                        </ul>
                    </li>
                ))}
            </List>
        )
    }
}