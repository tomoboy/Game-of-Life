import React, { Component, Fragment } from 'react';
import Paper from "../node_modules/@material-ui/core/Paper/Paper";
import Typography from "../node_modules/@material-ui/core/Typography/Typography";
import Grid from "../node_modules/@material-ui/core/Grid/Grid";
import NumberInput from "./NumberInput";
import Button from "../node_modules/@material-ui/core/Button/Button";
import Snackbar from "@material-ui/core/Snackbar/Snackbar";

export default class BoardSizeControl extends Component {
    constructor(props) {
        super(props);
        this.state = {
            rows: props.rows
            , columns: props.columns
            , snackbarOpen: false
            , errorType: ''
        }
    }

    errorMessage = message => {
        this.setState({snackbarOpen: true, errorType: message})
    };

    onClick = () => {
        let { rows, columns } = this.state;
        const { newBoard } = this.props;

        if (rows < 10 || columns < 10){
            let message = '';
            if (rows < 10){
                rows = 10;
                message += 'rows'
            }if (columns < 10){
                columns = 10;
                message += (message !== '') ? 'and columns' : 'columns';
            }
            this.setState({rows, columns});
            this.errorMessage(message)
        }
        newBoard(rows, columns)
};


    render() {
        let { rows, columns, snackbarOpen, errorType } = this.state;

        return (
            <Fragment style={{margin: '5px', padding: '5px'}}>
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
                    <Button size='small' mini variant='contained' onClick={this.onClick}>New Board </Button>
                </Grid>
                <Snackbar
                    anchorOrigin={{
                        vertical: 'top'
                        , horizontal: 'center'
                    }}
                    open={snackbarOpen}
                    autoHideDuration={6000}
                    onClose={() => this.setState({snackbarOpen: false})}
                    message={<span>{errorType} can't be less than 10.</span>}
                >

                </Snackbar>
            </Fragment>
        )
    }
}

