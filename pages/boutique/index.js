import DefaultLayaout from '../../components/DefaultLayout'
import { withStyles, Container, Grid, Typography, List, ListItem, ListItemText } from '@material-ui/core'
import ProductsList from '../../components/boutique/ProductsList'

const useStyles = theme => ({
    root: {marginBottom: theme.spacing(3)},
    h1: {
        margin: theme.spacing(5, 0)
    },
    filterTitle: {
        backgroundColor: theme.palette.primary,
        color: theme.palette.primary.main
    },
    filterListItem: {
        paddingLeft: 0,
    }
});

const Boutique = props => {
    const {classes, productsData} = props;

    return (
        <DefaultLayaout>
            <Container maxWidth="lg" className={classes.root}>

                <Grid container justify={'center'}>
                    <Grid item>
                        <Typography variant="h3" component="h1" className={classes.h1}>SuperShop</Typography>
                    </Grid>
                </Grid>

                <Grid container>

                    <Grid item xs={12} md={3}>
                        <Typography variant="h6" className={classes.filterTitle}>Catégories</Typography>
                        <div className={classes.filterListContainer}>
                            <List>
                                <ListItem className={classes.filterListItem}>
                                    <ListItemText
                                        primary="Maquillage"
                                    />
                                </ListItem>
                                <ListItem className={classes.filterListItem}>
                                    <ListItemText
                                        primary="Soins visage"
                                    />
                                </ListItem>
                                <ListItem className={classes.filterListItem}>
                                    <ListItemText
                                        primary="Parfums"
                                    />
                                </ListItem>
                            </List>
                        </div>
                    </Grid>

                    <Grid item xs={12} md={9} className={classes.productsListContainer}>
                        <ProductsList products={productsData}/>
                    </Grid>

                </Grid>

            </Container>
        </DefaultLayaout>
    )
};

Boutique.getInitialProps = async (ctx) => {
    const res = await fetch('https://fakestoreapi.com/products')
    const json = await res.json();
    return { productsData: json }
};

export default withStyles(useStyles)(Boutique)