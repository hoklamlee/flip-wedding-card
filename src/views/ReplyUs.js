import * as React from "react";
import MenuItem from "@mui/material/MenuItem";
import fb from '../services/firebase';
import { Link } from 'react-router-dom';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import AppBar from '@mui/material/AppBar';
import TextField from '@mui/material/TextField';
import Checkbox from '@mui/material/Checkbox';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import Toolbar from '@mui/material/Toolbar';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

import './ReplyUs.css';



export default function ReplyUs() {
    const [name, setName] = React.useState("");
    const [phone, setPhone] = React.useState("");
    const [vaccinated, setVaccinated] = React.useState(false);
    const [state, setState] = React.useState({
        open: false,
        vertical: 'bottom',
        horizontal: 'center'
    });

    const [message, setMessage] = React.useState("");
    const [severity, setSeverity] = React.useState("success");

    const { vertical, horizontal, open } = state;



    React.useEffect(() => {

    }, []);


    const handleClose = () => {
        setState({ ...state, open: false });
    };

    const submit =async () => {
        try {
            await fb.write(name, phone, vaccinated);

            setState({ ...state, open: true });
            setMessage("Submitted");
            setSeverity("success");

            setName("");
            setPhone("");
            setVaccinated(false);
        } catch (e) {
            setState({ ...state, open: true });
            setMessage("Oops, something went wrong. Please use other device.");
            setSeverity("error");
        }

    }

    return (
        <div className="ReplyUsPage">
            <AppBar style={{ display: "block" }}>

                <Toolbar >
                    <div style={{ display: "inline" }}>

                        <Link to="/" role="button" style={{ textDecoration: 'none', color: 'white', marginTop: "10px" }}>
                            <Button startIcon={<ArrowBackIosIcon />} style={{ color: "white" }}>Back</Button>
                        </Link>

                        {/* <div style={{ display: "inline",    marginLeft: "20px" }}>SIGNIN FORM </div> */}
                    </div>

                </Toolbar>
            </AppBar>
            <Snackbar
                open={open}
                onClose={handleClose}
                key={vertical + horizontal}
                autoHideDuration={6000}
            >
                  <Alert onClose={handleClose} severity={severity} sx={{ width: '100%' }}>
                    {message}
                </Alert>
            </Snackbar>
            <Grid container style={{ marginTop: 80 }} direction="column" alignItems="center" justifyContent="center" spacing={2}>
                <Grid item>
                    <h2 className="playfair">Reply Us</h2>
                </Grid>
                <Grid item>
                    <TextField label="Name" onChange={(e) => setName(e.target.value)} value={name}></TextField>
                </Grid>
                <Grid item>
                    <TextField label="Phone No." onChange={(e) => setPhone(e.target.value)} value={phone}></TextField>
                </Grid>
                <Grid item>
                    <FormControl >
                        <div className="playfair" >Have you been vaccinated yet</div>
                        <RadioGroup
                            className="playfair"
                            row
                            aria-labelledby="demo-row-radio-buttons-group-label"
                            name="row-radio-buttons-group"
                        >
                            <FormControlLabel value="Yes" control={<Radio onChange={(e) => setVaccinated(true)} checked={vaccinated ?? true} />} label="Yes" />
                            <FormControlLabel value="No" control={<Radio onChange={(e) => setVaccinated(false)} checked={!vaccinated ?? true} />} label="No" />

                        </RadioGroup>
                    </FormControl>
                </Grid>

                <Grid item>
                    <Button className="playfair" disabled={name&&phone?false:true} onClick={() => submit()}>Submmit</Button>
                </Grid>
            </Grid>

        </div>
    );
}
