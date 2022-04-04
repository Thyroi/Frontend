const initialState = {
    products: [],
    allproducts: [],
    details: {},
    categories: [],
    collections: [],

    cart: []
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
              cart: [...state.cart, action.payload]
            }

        case "REMOVE_CART":
          return {
            ...state,
            cart: [...action.payload]
          }

        default:
            return state
    }
    

}
