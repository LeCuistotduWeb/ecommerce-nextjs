import {useContext, useState} from 'react';
import DefaultLayaout from '../components/DefaultLayout'
import { withStyles, Button, Container, Grid, Typography, TextField } from '@material-ui/core'
import GlobalContext from "../state/global-context";

const useStyles = theme => ({
    container: {marginTop: theme.spacing(5)},
    inputContainer: {
        display: "flex",
        alignItems: 'center',
        margin: theme.spacing(2),
    }
});

const  Home = props => {
    const {classes} = props;
    const context = useContext(GlobalContext);
    const [email, setEmail] = useState("");

    const handleFocus = () => {

        if (!('contacts' in navigator)) {
            selectContact()
        }else {
            setEmail()
        }
    };

    const handleChange = event => {
        if (!('contacts' in navigator)) {
            const contact = selectContact();
            contact.email !== "" ? setEmail(contact.email) : '';
        }else {
            setEmail(event.target.value);
        }
    };

    const handleSubmit = event => {
        event.preventDefault();
        // TODO send Email
        context.addNotificationToQueue({type: "success", message: "Email envoyé"});
        console.log('message send');
    };

    const selectContact = async () => {
        // feature check
        if (!('contacts' in navigator)) {
            return null;
        }

        // open the picker
        const contact = await navigator.contacts.select(['email'], {
            multiple: false,
        });

        // handle the result
        return contact[0];
    };

    return (
        <DefaultLayaout>
            <Container maxWidth="sm" className={classes.container}>
                <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
                    Parrainage
                </Typography>
                <Typography variant="h5" align="center" color="textSecondary" paragraph>
                    Something short and leading about the collection below—its contents, the creator, etc.
                    Make it short and sweet, but not too short so folks don&apos;t simply skip over it
                    entirely.
                </Typography>
                <div className={classes.heroButtons}>
                    <form onSubmit={handleSubmit}>
                        <Grid container spacing={2} justify="center">
                            <Grid item className={classes.inputContainer}>
                                <TextField
                                    id="standard-basic"
                                    label={email}
                                    defaultValue="Email"
                                    onFocus={handleFocus}
                                    onChange={handleChange}
                                    type="email"
                                />
                                <Button variant="contained" type="submit">
                                    envoyer
                                </Button>
                            </Grid>
                        </Grid>
                    </form>
                </div>
            </Container>

        </DefaultLayaout>
    )
};
export default withStyles(useStyles)(Home)