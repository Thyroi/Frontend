const initialState = {
    products: [],
    allproducts: [],
    details: {},
    categories: [],
    collections: [],
    wishlist: [],
    clients: [],
    cart: JSON.parse(window.localStorage.getItem("cart")) || [],
}

export default function rootReducer (state = initialState, action){

    switch(action.type){
        case "GET_ALL": 
            return{
                ...state,
                products: action.payload,
                allproducts: action.payload
            }
        case "GET_BY_NAME":
            return{
                ...state,
                products: action.payload
            }
        case "GET_BY_ID":
            return{
                ...state,
                details: action.payload
            }
        case "GET_SELECTOR_CAT":
            return{
                ...state,
                categories: action.payload
            }
        case "GET_SELECTOR_COL":
            return{
                ...state, 
                collections: action.payload
            }
        case "GET_BY_CAT_ID":
            state.products = state.allproducts
            return{
                ...state,
                products: action.payload
            }
        case "GET_BY_COL_ID":
            state.products = state.allproducts
            return{
                ...state,
                products: action.payload
            }
        case "GET_OFFERS":
            state.products = state.allproducts
            return{
                ...state,
                products: action.payload
            }

        case "ADD_CART":
            return {
              ...state,
              cart: [...action.payload]
            }

        case "REMOVE_CART":
          return {
            ...state,
            cart: [...action.payload]
          }

        case "ADD_WISH_LIST":
            if(state.wishlist?.find(e => e.id === action.payload.id)){
                alert("This item is in your wish list")
                return{
                    ...state
                }
            } else {
                alert("Item add to your wishlist succesfully")
                return{
                    ...state,
                    wishlist: [...state.wishlist, action.payload]
                }
            }

        case "REMOVE_WISH_LIST":
            let eliminated = state.wishlist.filter(e => e.id !== action.payload)
            return{
                ...state,
                wishlist: eliminated
            }

        case "GET_CLIENTS":
            return{
                ...state,
                clients: action.payload
            }
            
        default:
            return state
    }
    

}

