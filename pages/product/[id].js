import DefaultLayaout from '../../components/DefaultLayout'
import {withStyles, Container, Grid, Typography, Button} from '@material-ui/core'
import {useContext} from "react";
import GlobalContext from "../../state/global-context";

const useStyles = theme => ({
    root: {
        marginTop: theme.spacing(5),
    },
});

const Product = props => {
    const {classes, productsData} = props;
    const context = useContext(GlobalContext);

    const handleAddToCart = event => {
        context.addProductToCart(productsData, ()=>{
            context.pushObject('open_interstitial', true);
            window.navigator.vibrate(300);
        })
    };

    return (
        <DefaultLayaout>
            <Container maxWidth="lg" className={classes.root}>

                <Grid container>

                    <Grid align="center" item xs={12} md={4} className={classes.productThumbnails}>
                        <img width={200} src={productsData.image} alt={productsData.title}/>
                    </Grid>

                    <Grid item xs={12} md={7} className={classes.productDetails}>
                        <Typography gutterBottom component="h2" className={classes.title}>
                            {productsData.title}
                        </Typography>
                        <Typography variant="body2" color="textSecondary" component="p">
                            {productsData.description}
                        </Typography>
                        <Typography variant="body2" color="textSecondary" component="p">
                            {productsData.price} euros
                        </Typography>

                        <Button color="primary" variant="contained" onClick={handleAddToCart}>Ajouter au panier</Button>
                    </Grid>

                </Grid>

            </Container>
        </DefaultLayaout>
    )
};

Product.getInitialProps = async (ctx) => {
    const res = await fetch(`https://fakestoreapi.com/products/${ctx.query.id}`);
    const json = await res.json();
    return { productsData: json }
};

export default withStyles(useStyles)(Product)