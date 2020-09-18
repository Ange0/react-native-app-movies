
const initialState={favoritesFilm:[]} // le state initial !! très important c'est lui qui definir le state global! !

function toggleFavorite(state=initialState,action){
    let nextState;
    switch (action.type) {
        case "TOGGLE_FAVORITE":
            const favoriteFilmIndex=state.favoritesFilm.findIndex((item)=> item.id === action.value.id) // verification si l'index du film courrant est egale a la valeur de l'action
            if(favoriteFilmIndex!==-1){ // cela signifie que le film est deja present dans les favoris du state globale
                //suppression du film

                // PENSE AU PRINCIPE D'IMMUABLE
                nextState={ // je cree une copie du state  et je supprime le film des favorites (favoritesFilm) en utilisant filter de js
                    ...state,
                    favoritesFilm:state.favoritesFilm.filter((item,index)=> index !== favoriteFilmIndex) // garde tous les films dont les identifiant seront different dans les index des films favoris dans le cas contraire tu les supprime
                }
            }else{
                //ajouter du film
                nextState={
                    ...state,
                    favoritesFilm: [...state.favoritesFilm,action.value]// concaternation des films qui sont dans les films favoris et du film qui est dans action
                }
            }

          return nextState || state; // on retourne state si et seulement si nextState vaut undefined
    
        default:
            return state;
            break;
    }
}

export default toggleFavorite; // pour etre utiliser partout dans l'Application