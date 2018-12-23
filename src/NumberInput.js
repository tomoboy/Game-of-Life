import React, {Component} from 'react'
import TextField from "@material-ui/core/TextField/TextField";
import NumberFormat from 'react-number-format'

export default class NumberInput extends Component{

    render(){
        return (
             <TextField
                margin='dense'
                label={this.props.label}
                value={this.props.value}
                onChange={this.props.onChange }
                variant="outlined"
                style={{width: '90px', margin: '5px'}}
                InputProps={{
                    inputComponent: NumberFormatCustom
                }}>
            </TextField>
        )
    }
}
function NumberFormatCustom(props) {
    const {inputRef, onChange, ...other} = props;

    return (
        <NumberFormat
            {...other}
            getInputRef={inputRef}
            onValueChange={({value}) => onChange(value)}
        />
    );
}
