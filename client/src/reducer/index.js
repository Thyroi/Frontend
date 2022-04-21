const initialState = {
	actualPage: 1,
	products: [],
	allproducts: [],
	details: {},
	categories: [],
	orders: [],
	copyOrders: [],
	orderDetail: {},
	collections: [],
	users: [],
	copyUsers: [],
	specificlist: [],
	google: {},
	cart: JSON.parse(window.localStorage.getItem('cart')) || [],
	detailEdited: {},
	datosDeEnvío: JSON.parse(window.localStorage.getItem('datosDeEnvío')) || {},
	rememberMe: !!window.localStorage.getItem('loggedInClient'),
	loggedInClient:
		JSON.parse(window.localStorage.getItem('loggedInClient')) || {},

	loggedInAdmin:
		JSON.parse(window.localStorage.getItem('loggedInAdmin')) || {},

	lists: [],

  nested:{
    offer: null,
    category: null,
    collection: null,
	type: null,
	method: null
  }


};

export default function rootReducer(state = initialState, action) {
	switch (action.type) {
		case 'GET_ALL':
			return {
				...state,
				products: action.payload,
				allproducts: action.payload,
			};
		case 'RECOVER_PRODUCTS':
			alert('Nothing found, showing all products');
			return { ...state, products: state.allproducts };
		case 'GET_BY_NAME':
			return {
				...state,
				products: action.payload,
			};
		case 'GET_ORDERS':
			return {
				...state,
				orders: action.payload,
				copyOrders: action.payload,
			};

		case 'GET_ORDER_BY_ID':
			return {
				...state,
				orderDetail: action.payload,
			};
		case 'UPDATE_ORDER':
			return {
				...state,
				orderDetail: action.payload,
			};
			case 'UPDATE_PRODUCT':
				return {
					...state,
					details: action.payload,
				};
		case 'ORDER_FILTER':
			state.orders = state.copyOrders;
			return {
				...state,
				orders: action.payload,
			};

		case 'GET_BY_ID':
			return {
				...state,
				details: action.payload,
				detailEdited: Object.assign({}, action.payload),
			};
		case 'GET_SELECTOR_CAT':
			return {
				...state,
				categories: action.payload,
			};
		case 'GET_SELECTOR_COL':
			return {
				...state,
				collections: action.payload,
			};
		case 'GET_BY_CAT_ID':
			return {
				...state,
				products: action.payload,
			};
		case 'GET_BY_COL_ID':
			state.products = state.allproducts;
			return {
				...state,
				products: action.payload,
			};
		case 'CLEAR_PRODUCTS':
			return {
				...state,
				products: [],
			};
		case 'CLEAR_DETAIL':
			return {
				...state,
				details: {},
				detailEdited: {},
			};
		case 'SET_ACTUAL_PAGE':
			return { ...state, actualPage: action.payload };
		case 'GET_OFFERS':
			state.products = state.allproducts;
			return {
				...state,
				products: action.payload,
			};
		case 'ADD_CART':
			return {
				...state,
				cart: [...action.payload],
			};

		case 'ADD_TO_CART':
			return { ...state, cart: [...action.payload] };

		case 'REMOVE_CART':
			return {
				...state,
				cart: [...action.payload],
			};
		case 'GET_ALL_USERS':
			return {
				...state,
				users: action.payload,
				copyUsers: action.payload,
			};
		case 'UPDATE_PERMISSION':
			state.users = state.copyUsers;
			return {
				...state,
				copyUsers: action.payload,
			};

		case 'GET_CLIENTS':
			return { ...state, allClients: action.payload };

		case 'LOG_IN_USER':
			return {
				...state,
				loggedInClient: action.payload,
			};

		case 'LOG_IN_ADMIN':
			return {
				...state,
				loggedInAdmin: action.payload,
			};

		case 'SET_REMEMBER_ME':
			return {
				...state,
				rememberMe: !state.rememberMe,
			};

		case 'LOG_OUT_USER':
			window.localStorage.removeItem('loggedInClient');
			return {
				...state,
				loggedInClient: {},
				loggedInAdmin: {},
				cart: [],
				rememberMe: false,
			};

		case 'GET_CART':
			if (action.payload) {
				return { ...state, cart: [...action.payload] };
			}

		case 'GET_GOOGLE_INFO':
			return {
				...state,
				google: action.payload,
			};
		case 'SELECTING_PRODUCT':
			return {
				...state,
				detailEdited: action.payload,
			};
		case 'UPDATING_CART':
			return {
				...state,
				cart: [...action.payload],
			};

		case 'DATOS_DE_ENVIO':
			return {
				...state,
				datosDeEnvío: action.payload,
			};
		case 'CLEAR_CART':
			return {
				...state,
				cart: [],
			};

		case 'GET_USER_LISTS':
			return {
				...state,
				lists: action.payload,
			};

    case 'NESTED':
      return {
        ...state,
        nested: action.payload
      }
		case "ORDER_BY_PRICE":
			state.products = state.allproducts
			return{
				...state,
				products: action.payload
			};
		case "ORDER_BY_ARRIVE":
			state.products = state.allproducts
			return{
				...state,
				products: action.payload
			}
		case "GET_SPECIFIC_LIST":
			return{
				...state,
				specificlist: action.payload
			}
		case "ORDER_BY_STARS":
			state.products = state.allproducts
			return{
				...state,
				products: action.payload
			}

		default:
			return state;
	}
}
