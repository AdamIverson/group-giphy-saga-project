import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { useState } from 'react';



function SearchView() {
    //Initial state is an OBJECT, with keys id and name
    let [newGif, setGif] = useState('');

    // Declare dispatch and history
    const dispatch = useDispatch();
    const history = useHistory();

    // Saves value of current text input
    const handleNameChange = (event) => {
        console.log('event happened');
        //Similar to in redux -- we dont want to get rid of the id field when we update name
        setGif({...newGif, name: event.target.value})
    }

    // Submits new gif object
    const addNewGif = event => {
        event.preventDefault();
        dispatch({ 
            type: 'GET_RESULTS',
            payload: newGif 
        });
        //updates the next Gif
        setGif('');
    }
    //---------------------------------------------------------------------
    useEffect(() => {
        getSearches();
    }, []);
    
    const searchReducer = useSelector(store => store.searchReducer)


    const getSearches = () => {
        console.log('in searching');
        dispatch({
            type: 'FETCH_SEARCHES'
        })
    }

    const addFavorite = () => {
        console.log('in addFavorite');
        dispatch({
            type: 'ADD_FAVORITE'
        })
    }
     //---------------------------------------------------------------------

    return (
        <form onSubmit={addNewGif}>
            <input placeholder="Search for a gif, or don't" 
            value={newGif.name}
            onChange={handleNameChange} />
            <button type="submit">Submit</button>
        </form>
    );
}

//For Favoriting the GIF once map of GIFs is made
//             <button type="submit" onClick={addFavorite}>Favorite</button>

export default SearchView;
