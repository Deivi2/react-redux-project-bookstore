"use strict";
import axios from 'axios';

//GET CART
export function getCart() {
    return function (dispatch) {
        axios.get('/api/cart')
            .then(function (res) {
                dispatch({type: 'GET_CART', payload: res.data})
            })
            .catch(function (e) {
                dispatch({type: "GET_CART_REJECT", payload: 'ERROR: Cant get cart.'})
            })
    }
};


// ADD TO CART
export function addToCart(book) {

    return function(dispatch) {
        axios.post("/api/cart", book)
            .then(function (response) {
                dispatch({type: "ADD_TO_CART", payload: response.data});
            })
            .catch(function (e) {
                dispatch({type: "ADD_TO_CART_REJECTED", payload:'error when adding to cart'});
            })
    }


    // return {
    //     type: "ADD_TO_CART",
    //     payload: book
    // }
}

//DELETE FROM CART
export function deleteCartItem(cart) {
    return function(dispatch) {
        axios.post("/api/cart", cart)
            .then(function (response) {
                dispatch({type: "DELETE_CART_ITEM", payload: response.data});
            })
            .catch(function (e) {
                dispatch({type: "DELETE_CART_ITEM_REJECTED", payload:'error when deleting to cart'});
            })
    }
    // return {
    //     type: "DELETE_CART_ITEM",
    //     payload: cart
    // }
}

//UPDATE CART
export function updateCart(_id, unit, cart) {


    const currentBookToUpdate = cart;

    const indexToUpdate = currentBookToUpdate.findIndex(
        function (book) {
            return book._id === _id;
        });

    const newBookToUpdate = {
        ...currentBookToUpdate[indexToUpdate],
        quantity: currentBookToUpdate[indexToUpdate].quantity + unit
    };

    let cartUpdate = [...currentBookToUpdate.slice(0, indexToUpdate), newBookToUpdate,
        ...currentBookToUpdate.slice(indexToUpdate + 1)];

    return function(dispatch) {
        axios.post("/api/cart", cartUpdate)
            .then(function (response) {
                dispatch({type: "UPDATE_CART", payload: response.data});
            })
            .catch(function (e) {
                dispatch({type: "UPDATE_CART_REJECTED", payload:'error when adding to cart'});
            })
    };

}