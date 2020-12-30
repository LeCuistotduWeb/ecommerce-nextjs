import { createContext, Component } from 'react';
const GlobalContext = createContext();
import PropTypes from 'prop-types';

export class GlobalProvider extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open_interstitial: false,
            cart: [],
            notifications: [], // format [{type: "", message: ""}]
            pushObject: this.pushObject.bind(this),
            getCart: this.getCart.bind(this),
            addProductToCart: this.addProductToCart.bind(this),
            removeProductToCart: this.removeProductToCart.bind(this),
            addNotificationToQueue: this.addNotificationToQueue.bind(this),
        }
    }

    pushObject(key, value, callback) {
        this.setState({ [key]: value }, callback);
    }

    getCart() {
        const sessionStorageCart = JSON.parse(sessionStorage.getItem('cart')); // null if not exist

        if (sessionStorageCart !== null) {
            this.setState({ cart: sessionStorageCart });
        }else {
            this.setState({ cart: [] });
        }
    }

    addProductToCart(product, callback) {
        const newCart = [...this.state.cart];
        const newProduct = {...product};
        const isAlreadyAddIndex = this.state.cart.findIndex( p => p.id === product.id);

        if(isAlreadyAddIndex > -1){
            newProduct.quantity =  this.state.cart[isAlreadyAddIndex].quantity + 1;
            console.log(newProduct.quantity);
            newCart.splice(isAlreadyAddIndex, 1, newProduct);
        }else {
            newProduct.quantity = 1;
            newCart.push(newProduct);
        }

        this.setState({ cart: newCart }, () => {
            sessionStorage.setItem('cart', JSON.stringify(newCart));

            if (typeof callback !== 'undefined') callback();
        });
    }

    removeProductToCart(id, callback) {
        const newCart = [...this.state.cart];
        const productIndex = this.state.cart.findIndex(p => p.id === id);

        if(productIndex > -1){
            newCart.splice(productIndex, 1);
            this.setState({ cart: newCart }, () => {
                sessionStorage.setItem('cart', JSON.stringify(newCart));

                if (typeof callback !== 'undefined') callback();
            });
        }else {
            console.log('product not found');
        }
    }

    addNotificationToQueue(notification){
        const newNotifications = [...this.state.notifications];
        newNotifications.push(notification);
        this.setState({notifications: newNotifications});
    };

    componentDidMount() {
        this.getCart()
    }

    render() {
        const { children } = this.props;

        return (
            <GlobalContext.Provider value={{ ...this.state }}>
                {children}
            </GlobalContext.Provider>
        );
    }
}

GlobalProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

export const GlobalConsumer = GlobalContext.Consumer;
export default GlobalContext;
