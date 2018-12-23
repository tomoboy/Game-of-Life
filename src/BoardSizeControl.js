import React, { Component } from 'react';
import Paper from "../node_modules/@material-ui/core/Paper/Paper";
import Typography from "../node_modules/@material-ui/core/Typography/Typography";
import Grid from "../node_modules/@material-ui/core/Grid/Grid";
import NumberInput from "./NumberInput";
import Button from "../node_modules/@material-ui/core/Button/Button";

export default class BoardSizeControl extends Component {
    constructor(props) {
        super(props);
        this.state = {
            rows: props.rows
            , columns: props.columns
        }
    }


    render() {
        let { rows, columns } = this.state;
        const { newBoard } = this.props;

        return (
            <Paper style={{margin: '5px', padding: '5px'}}>
                <Typography variant='subtitle1'>board size</Typography>
                <Grid container direction='row'>
                    <Grid item>
                        <NumberInput
                            label='rows'
                            value={rows}
                            onChange={value => this.setState({rows: parseInt(value)})}/>
                    </Grid>
                    <Grid item>
                        <NumberInput
                            label='columns'
                            value={columns}
                            onChange={value => this.setState({columns: parseInt(value)})}/>
                    </Grid>
                </Grid>
                <Grid item>
                    <Button variant='contained' onClick={() => newBoard(rows, columns)}>New Board </Button>
                </Grid>
            </Paper>
        )
    }
}

