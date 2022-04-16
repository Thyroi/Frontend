import React from "react";
import {useDispatch} from "react-redux"
import { addWishList } from "../../actions";

export default function Favorites(product){
    const dispatch = useDispatch()

    function handleClick(){
        dispatch(addWishList(product))
    }

    return(
        <div>
            <button onClick={() => handleClick()}>⭐</button>
        </div>
    )
}