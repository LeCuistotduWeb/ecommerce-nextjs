import {useState} from 'react';
import DefaultLayaout from '../../components/DefaultLayout'
import { withStyles, Container, Grid, Typography, List, ListItem, ListItemText, Button } from '@material-ui/core'
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
    const {classes, productsData, categories} = props;
    const [products, setProducts] = useState(productsData);

    const handleProductFilters = (type, value) => event => {
        switch (type) {
            case 'categories':
                filterByCategory(value);
                break;
            case 'price':
                filterByPrice(value);
                break;
        }
    };

    const filterByCategory = async (category) => {
        const productsByCategories = await fetch(`https://fakestoreapi.com/products/category/${category}`)
            .then(res => res.json());
        return setProducts(productsByCategories);
    };

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
                                {categories && categories.map(category => (
                                    <ListItem className={classes.filterListItem}>
                                        <Button onClick={handleProductFilters('categories', category)}>
                                            {category}
                                        </Button>
                                    </ListItem>
                                ))}
                            </List>
                        </div>
                    </Grid>

                    <Grid item xs={12} md={9} className={classes.productsListContainer}>
                        {products ? (
                            <ProductsList products={products}/>
                        ) : (
                            <Typography>Aucun produit trouvé</Typography>
                        )}
                    </Grid>

                </Grid>

            </Container>
        </DefaultLayaout>
    )
};

Boutique.getInitialProps = async (ctx) => {
    const productsData = await fetch('https://fakestoreapi.com/products')
        .then(res=>res.json());

    const categories = await fetch('https://fakestoreapi.com/products/categories')
        .then(res=>res.json());

    return {
        productsData,
        categories,
    }
};

export default withStyles(useStyles)(Boutique)