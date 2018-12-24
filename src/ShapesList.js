import React, {Component} from 'react';
import List from "../node_modules/@material-ui/core/List/List";
import shapes from './shapes/shapes'
import ListSubheader from "@material-ui/core/ListSubheader/ListSubheader";
import ListItem from "@material-ui/core/ListItem/ListItem";
import ListItemText from "@material-ui/core/ListItemText/ListItemText";

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
        const { setPreviewShape } = this.props;
        const { selectedIned} = this.state;
        return (
            <List subheader={<li/>}>
                {Object.keys(shapes).map(category => (
                    <li key={category}>
                        <ul>
                            <ListSubheader>{category}</ListSubheader>
                                {shapes[category].map((shape, i) => (
                                    <ListItem
                                        button
                                        onClick={() => this.onClick(shape, i)}
                                        onMouseOver={() => setPreviewShape(shape)}
                                        onMouseLeave={() => setPreviewShape(null)}
                                        key={shape.name}
                                        selected={this.state.selectedIndex === i}>
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