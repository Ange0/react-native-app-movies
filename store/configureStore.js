import {createStore} from "redux";
import toggleFavorite from "./reducers/favoriteReducer";
 
export  default createStore(toggleFavorite); // mon reducer est prêt maintenant (les composant pourront s'abonner)
