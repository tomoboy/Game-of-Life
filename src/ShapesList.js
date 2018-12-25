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
        selectedIndex: 0
    };

    componentWillMount(){
        this.onClick(shapes['Still lives'][0], 0)
    }

    onClick = (shape, selectedIndex) => {
        this.setState({selectedIndex});
        this.props.setSelectedShape(shape);
    };

    render(){
        const { setPreviewShape, rows, columns } = this.props;
        const { selectedIndex } = this.state;
        return (
            <List subheader={<li />} style={listStyle}>
                {Object.keys(shapes).map(category => (
                    <li key={category}>
                        <ul>
                            <ListSubheader>{category}</ListSubheader>
                                {shapes[category].map((shape, i) => (
                                    (shape.rows > rows || shape.columns > columns) ?
                                        <Tooltip title={`This shape is too big for the board.
                                         This shape needs to have at least ${shape.rows} rows and ${shape.columns} columns`}>
                                            <span>
                                                <ListItem
                                                    button
                                                    onClick={() => this.onClick(shape, i)}
                                                    disabled={true}
                                                    onMouseOver={() => setPreviewShape(shape)}
                                                    onMouseLeave={() => setPreviewShape(null)}
                                                    key={shape.name}
                                                    selected={selectedIndex}>
                                                    <ListItemText primary={shape.name}/>
                                                </ListItem>
                                            </span>
                                        </Tooltip>
                                        :
                                        <ListItem
                                            button
                                            onClick={() => this.onClick(shape, i)}
                                            onMouseOver={() => setPreviewShape(shape)}
                                            onMouseLeave={() => setPreviewShape(null)}
                                            key={shape.name}
                                            selected={selectedIndex}>
                                            <ListItemText primary={shape.name}/>
                                        </ListItem>
                                ))}
                        </ul>
                    </li>
                ))}
            </List>
        )
    }
}