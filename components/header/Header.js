import {withStyles, AppBar, Toolbar, Typography, IconButton, Container, Grid} from '@material-ui/core'
import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket';
import Link from 'next/link'
import Interstitial from '../Interstitial'
import {useContext, useState} from "react";
import GlobalContext from "../../state/global-context";

const useStyles = theme => ({
    toolbar: {
        padding: 0,
        display: "flex",
        justifyContent: "space-between",
    },
    cartIcon: {
        color: theme.palette.light,
    },
    navigation: {
        width: "auto",
    },
});

const Header = props => {
    const {classes} = props
    const context = useContext(GlobalContext);
    const open_interstitial = context.open_interstitial;

    const toggleDrawer = (open) => (event) => {
        if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }
        context.pushObject('open_interstitial', true);
    };

    return (
        <>
        <header className={classes.root}>
            <AppBar position="static" elevation={0}>
                <Container maxWidth="lg">
                    <Toolbar className={classes.toolbar}>
                        <div>
                            <Link href="/" passHref>
                                <a>
                                    <Typography variant="h4" className={classes.title}>
                                        SuperShop
                                    </Typography>
                                </a>
                            </Link>
                        </div>
                        <Grid container alignItems="center" classes={{root: classes.navigation}}>
                            <Grid item>
                                <Link href="/parrainage" passHref>
                                    <a>
                                        <Typography>
                                            Parrainage
                                        </Typography>
                                    </a>
                                </Link>
                            </Grid>
                            <Grid item>
                                <IconButton onClick={toggleDrawer(!open_interstitial)}>
                                    <ShoppingBasketIcon className={classes.cartIcon}/>
                                </IconButton>
                            </Grid>
                        </Grid>
                    </Toolbar>
                </Container>
            </AppBar>
        </header>
        <Interstitial/>
            </>
    )
}

export default withStyles(useStyles)(Header)