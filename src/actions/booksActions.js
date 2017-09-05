"use strict";
import axios from 'axios';


// GET BOOKS

export function getBooks() {

    return function (dispatch) {
        axios.get("/api/books")
            .then(function (response) {
                dispatch({type: "GET_BOOK", payload: response.data})
            })
            .catch(function (e) {
                dispatch({type: "GET_BOOK_REJECT", payload: e})
            })
    }

    // return {
    //     type: "GET_BOOKS"
    // }
}


// POST A BOOK

export function postBooks(book) {
    return function (dispatch) {
        axios.post("/api/books", book)
            .then(function (response) {
                console.log('response', response);
                dispatch({type: "POST_BOOK", payload: response.data});
            })
            .catch(function (err) {
                dispatch({type: "POST_BOOK_REJECTED", msg: "there was an error while posting new book"});
            })
    };

    // return {
    //     type: "POST_BOOK",
    //     payload: book
    // }
}

//DELETE BOOKS
export function deleteBooks(id) {
    return function (dispatch) {
        axios.delete("/api/books/" + id)
            .then(function (res) {
                dispatch({type: "DELETE_BOOK", payload: id})
            })
            .catch(function (err) {
                dispatch({type: "DELETE_BOOK_REJECT", payload: err})
            })
    }


    // return {
    //     type: "DELETE_BOOK",
    //     payload: id
    // }
}

// UPDATE BOOKS
export function updateBooks(book) {
    return {
        type: "UPDATE_BOOK",
        payload: book
    }
}


export function resetButton() {
    return {
        type: "RESET_BUTTON"
    }
}
