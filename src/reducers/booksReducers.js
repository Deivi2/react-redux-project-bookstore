"use strict";

//STEP 3 define reducers
export function booksReducers(state = {
    books: []
}, action) {
    switch (action.type) {
        case "GET_BOOK":
            return {...state, books: [...action.payload]};
            break;
        case "POST_BOOK":
            // let books = state.books.concat(action.payload);
            // return {books};
            return {
                ...state, books: [...state.books, ...action.payload], msg: 'Saved! Click to continue',
                style: 'success', validation: 'success'
            };
            break;
        case "POST_BOOK_REJECTED":
            return {...state, msg: 'Please, try again', style: 'danger', validation: 'error'};
            break;

        case "RESET_BUTTON":
            return {...state, msg: null, style: 'primary', validation: null};
            break;
        case "DELETE_BOOK":
            //Create a copy of the current array of books
            const currentBooksToDelete = [...state.books];
            //Determine at which index in books array is the book to be deleted
            const indexToDelete = currentBooksToDelete.findIndex(function (book) {
                return book._id.toString() === action.payload;

                //   console.log('action.payload.id:', action.payload.id);
            });
            //use slice to remove the book at the specified index
            return {
                books: [...currentBooksToDelete.slice(0, indexToDelete),
                    ...currentBooksToDelete.slice(indexToDelete + 1)]
            };
            break;
        case "UPDATE_BOOK":
            //Create a copy of the current array of books
            const currentBookToUpdate = [...state.books];
            // Determine at witch index in books array is the book to be updated
            const indexToUpdate = currentBookToUpdate.findIndex(
                function (book) {
                    return book._id === action.payload._id;
                });
            console.log(' <<<index to update', indexToUpdate);
            //Create a new book object with the new values with tha same array index of the item we
            // want to replace. To achieve this we will use ...spread but we could use concat method too
            const newBookToUpdate = {
                ...currentBookToUpdate[indexToUpdate],
                title: action.payload.title
            };
            //This Log has the purpose to show you how newBookToUpdate looks like
            console.log("what is it newBookToUpdate", newBookToUpdate);
            //use slice to remove the book at the specified index, replace with the new object and
            //concatenate with the rest of items in the array
            return {
                books: [...currentBookToUpdate.slice(0, indexToUpdate), newBookToUpdate,
                    ...currentBookToUpdate.slice(indexToUpdate + 1)]
            };

            break;
    }

    return state;
};