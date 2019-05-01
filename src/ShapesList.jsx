import React, { Component } from 'react';
import ListSubheader from '@material-ui/core/ListSubheader/ListSubheader';
import ListItem from '@material-ui/core/ListItem/ListItem';
import ListItemText from '@material-ui/core/ListItemText/ListItemText';
import List from '../node_modules/@material-ui/core/List/List';
import { BACKGROUND_COLOUR } from './constants';

const listStyle = {
  position: 'relative',
  overflow: 'auto',
  maxHeight: '600px'
};

export default class ShapesList extends Component {
  state = {
    selected: null,
    shapes: {}
  };

  async componentDidMount() {
    const { setSelectedShape } = this.props;
    const response = await fetch('/shapes');
    const shapes = await response.json();
    this.setState({ selected: shapes[''][0], shapes });
    setSelectedShape(shapes[''][0]);
  }

  onClick = shape => {
    const { setSelectedShape } = this.props;
    this.setState({ selected: shape });
    setSelectedShape(shape);
  };

  render() {
    const { setPreviewShape } = this.props;
    const { selected, shapes } = this.state;
    if (Object.keys(shapes).length === 0) {
      return <div>Loading...</div>;
    }
    const singleCell = shapes[''][0];
    return (
      <List subheader={<li />} style={listStyle} disablePadding>
        <li key={singleCell.name}>
          <ul>
            <ListItem
              button
              onClick={() => this.onClick(singleCell)}
              onFocus={() => setPreviewShape(singleCell)}
              onBlur={() => setPreviewShape(null)}
              onMouseOver={() => setPreviewShape(singleCell)}
              onMouseLeave={() => setPreviewShape(null)}
              key={singleCell.name}
              selected={selected === singleCell}
            >
              <ListItemText primary={singleCell.name} />
            </ListItem>
          </ul>
        </li>
        {Object.keys(shapes)
          .filter(cat => cat !== '')
          .map(category => (
            <li key={category}>
              <ul>
                <ListSubheader style={{ backgroundColor: BACKGROUND_COLOUR, color: 'black' }}>
                  {category}
                </ListSubheader>
                {shapes[category].map(shape => {
                  return (
                    <ListItem
                      button
                      onClick={() => this.onClick(shape)}
                      onMouseOver={() => setPreviewShape(shape)}
                      onMouseLeave={() => setPreviewShape(null)}
                      onFocus={() => setPreviewShape(singleCell)}
                      onBlur={() => setPreviewShape(null)}
                      key={shape.name}
                      selected={selected === shape}
                    >
                      <ListItemText primary={shape.name} />
                    </ListItem>
                  );
                })}
              </ul>
            </li>
          ))}
      </List>
    );
  }
}
