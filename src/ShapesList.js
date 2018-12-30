import React, {Component} from 'react';
import List from "../node_modules/@material-ui/core/List/List";
import shapes from './shapes/shapes'
import ListSubheader from "@material-ui/core/ListSubheader/ListSubheader";
import ListItem from "@material-ui/core/ListItem/ListItem";
import ListItemText from "@material-ui/core/ListItemText/ListItemText";
import Tooltip from "../node_modules/@material-ui/core/Tooltip/Tooltip";

const listStyle = {
    maxHeight: 300
    , position: 'relative'
    , overflow: 'auto'
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
        console.log(shapes['Still lives'][0]);
        this.setState({selected: shapes['Still lives'][0]});
        this.props.setSelectedShape(shapes['Still lives'][0]);
    }

    render(){
        const { setPreviewShape, rows, columns } = this.props;
        const { selected } = this.state;
        return (
            <List subheader={<li />} style={listStyle}>
                {Object.keys(shapes).map(category => (
                    <li key={category}>
                        <ul>
                            <ListSubheader>{category}</ListSubheader>
                                {shapes[category].map((shape, i) => {
                                    let disabled = shape.rows > rows || shape.columns > columns;
                                    const tooltipText = (disabled) ? `This shape is too big for the board.
                                        Board must have at least ${shape.rows} rows and ${shape.columns} columns`: '';
                                    return <Tooltip key ={`${category}${i}`} title={tooltipText}>
                                        <span>
                                            <ListItem
                                                button
                                                disabled={disabled}
                                                onClick={() => this.onClick(shape)}
                                                onMouseOver={() => setPreviewShape(shape)}
                                                onMouseLeave={() => setPreviewShape(null)}
                                                key={shape.name}
                                                selected={selected === shape}>
                                                <ListItemText primary={shape.name}/>
                                            </ListItem>
                                        </span>
                                    </Tooltip>
                                    }
                                )}
                        </ul>
                    </li>
                ))}
            </List>
        )
    }
}