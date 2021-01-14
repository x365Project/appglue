import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';

export default function FormDialog() {
    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const [value, setValue] = useState('female');

    // const handleChange = (e) => {
    //     setValue(e.target.value);
    // };

    // const handleSubmit = (e) => {
    //     e.preventDefault();
    // }
    return (
        <div>
            <Button variant="outlined" color="primary" onClick={handleClickOpen}>
                Theme Customization Modal
            </Button>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Theme Setting</DialogTitle>
                <form >
                <DialogContent>
                    <DialogContentText>
                        Theme Setting
                    </DialogContentText>
                    
                    <FormControl component="fieldset">
                        <FormLabel component="legend">Mode</FormLabel>
                        <RadioGroup aria-label="Mode" name="ThemeMode" value={value} >
                            <FormControlLabel value="Box" control={<Radio />} label="Box" />
                            <FormControlLabel value="Full-width" control={<Radio />} label="Full-Width" />
                        </RadioGroup>
                    </FormControl>

                    <FormControl component="fieldset">
                        <FormLabel component="legend"> Layout Style</FormLabel>
                        <RadioGroup aria-label="Mode" name="ThemeMode" value={value} >
                            <FormControlLabel value="Layout1" control={<Radio />} label="Vertical" />
                            <FormControlLabel value="Layout2" control={<Radio />} label="Horizontal" />
                        </RadioGroup>
                    </FormControl>
                </DialogContent>
                
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleClose} color="primary" type="submit">
                        Update
                    </Button>
                </DialogActions>
                </form>
            </Dialog>
        </div>
    );
}
