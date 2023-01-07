import {useRef, useState} from "react";
import {Button, Grid, TextField} from "@mui/material";

const FileInput = ({onChange, name, label}) => {
    const [filename, setFilename] = useState("");

    const inputRef = useRef();

    const activateInput = () => {
        inputRef.current.click();
    };

    const onFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setFilename(file.name);
        } else {
            setFilename("");
        }
        onChange(e);
    };

    return (
        <>
            <input
                type="file"
                name={name}
                ref={inputRef}
                style={{display: "none"}}
                onChange={onFileChange}
                accept="image/png, image/jpeg"
               
            />
            <Grid
                container
                direction="row"
                spacing={2}
                alignItems="center"
            >
                <Grid item xs>
                    <TextField
                        variant="standard"
                        disabled
                        fullWidth
                        label={label}
                        value={filename}
                        onClick={activateInput}
                    />
                </Grid>
                <Grid item>
                    <Button
                        variant="contained"
                        onClick={activateInput}
                    >
                        Browse
                    </Button>
                </Grid>
            </Grid>
        </>
    );
};

export default FileInput;
