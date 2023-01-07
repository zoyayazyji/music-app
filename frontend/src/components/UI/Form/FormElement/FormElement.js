import {Grid, MenuItem, TextField} from "@mui/material"
import FileInput from "../FileInput/FileInput";

const FormElement = ({name, label, state, error, onChange, select, options, multiline, rows, type="text", required}) => {
    let inputChildren = null;
    if (select) {
        inputChildren = options.map(option => {
            return <MenuItem key={option._id} value={option._id}>
                {option.name || option.title}
            </MenuItem>;
        });
    };

    let input = <TextField
        select={select}
        multiline={multiline}
        rows={rows}
        id={name}
        name={name}
        label={label}
        type={type}
        variant="outlined"
        value={state?.[name]}
        error={!!error}
        helperText={error}
        fullWidth
        onChange={onChange}
        required
    >
        {inputChildren}
    </TextField>

    if (type === "file") {
        input = <FileInput
            name={name}
            label={label}
            onChange={onChange}
        />
    }
    return <Grid item xs={12}>
        {input}
    </Grid>
};



export default FormElement;

