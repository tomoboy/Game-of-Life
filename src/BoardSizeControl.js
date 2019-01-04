import React, { Component, Fragment } from 'react';
import Typography from "../node_modules/@material-ui/core/Typography/Typography";
import Grid from "../node_modules/@material-ui/core/Grid/Grid";
import NumberInput from "./NumberInput";
import Button from "../node_modules/@material-ui/core/Button/Button";

const MinSize = 54;

export default class BoardSizeControl extends Component {
    constructor(props) {
        super(props);
        this.state = {
            rows: props.rows
            , columns: props.columns
        }
    }

    onClick = () => {
        let { rows, columns } = this.state;
        const { newBoard, reportError } = this.props;

        if (rows < MinSize || columns < MinSize){
            let message = '';
            if (rows < MinSize){
                rows = MinSize;
                message += 'rows'
            }if (columns < MinSize){
                columns = MinSize;
                message += (message !== '') ? ' and columns' : 'columns';
            }
            this.setState({rows, columns});
            reportError(message + ` must be more than ${MinSize}.`)

        }
        newBoard(rows, columns)
};


    render() {
        const { rows, columns } = this.state;

        return (
            <Fragment>
                <Typography variant='subtitle1'>Board size</Typography>
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
                    <Button size='small' mini variant='outlined' style={{marginLeft: '5px'}} onClick={this.onClick}>New Board </Button>
                </Grid>
            </Fragment>
        )
    }
}

