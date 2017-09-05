'use strict';
import React from 'react';
import Menu from './components/menu';
import Footer from './components/footer';
import {bindActionCreators} from 'redux';
import {getCart} from '../src/actions/cartActions';

import {connect} from 'react-redux';

class Main extends React.Component {

    componentDidMount(){
        this.props.getCart();
    }


    render() {
        return (
            <div>
                <Menu cartItemsNumber={this.props.totalQty}/>
                {this.props.children}
                <Footer/>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        totalQty: state.cart.totalQty
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        getCart
    }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Main);