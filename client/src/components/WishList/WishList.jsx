import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeWishList } from "../../actions";

export default function Favorite(){
    const dispatch = useDispatch()
    const stateWish = useSelector((state) => state.wishlist)

    function handleDelete(e){
        dispatch(removeWishList(e.id))
    }

    return(
        <div>
            {
                stateWish?.map(e => {
                    return(
                        <div>{e.name}</div>
                    )
                })
            }
        </div>
    )
}