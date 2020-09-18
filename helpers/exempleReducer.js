// Exemple de reducer pour gerer le profil utilisateur
function reducerProfile(state,action) { // un reducer n'est rien d'autre qu'une  fonction  le state actuel et une action NB:un reducer peut gerer un ou plusieurs actions
   let nextState // le state mis à jour
/* !!! PRINCIPE: UN STATE DOIT RESTER IMMUABLE c a d  NE DOIT EN AUCUN CAS SUBIR UNE MODIFICATION DIRECT !!!*/
   switch (action.type) {
       case "ADD_PROFIL":
           nextState={
             ...state,// copie du state actuel
             profil:action.value
           }
            return nextState;
           
        case "UPDATE_PROFIL":
            return nextState;
    
        case "DELETE_PROFIL":
            return nextState;
           
       default:
            return nextState;
        
   }
  


}
// exemple d'action const ={type:"ADD_PROFILE",value:profil} c'est juste un objet de qui possede un type et une valeur