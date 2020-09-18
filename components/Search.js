import React from 'react';
import {TextInput,Button,View,StyleSheet,FlatList,Text,ActivityIndicator} from 'react-native';
import films from './../helpers/fimlDatas'; // films en dure dans data de flatlist
import FilmItems from './FilmItems';
import {connect} from 'react-redux'; // va permettre les abonnements
import {getFilmsFromApiWithSearchText} from './../api/TMDBApi';

  class Search extends React.Component {
     constructor(props){ // methodes qui va initialiser les donnees
        super(props);
        
        this.state={ // regle un state sera declarer si et seulement il est utiliser dans render() car son utilisation rafraichir la vue
            films:[],
            isLoading:false // petit chargeur
        };
        this.searchText=""; // varible simple
        this.pageCurrent=0;
        this.totalPage=0;

        
    }

    _displayDetailForFilm =(id)=>{ // affiche le detail d'un film elle sera representer dans le composant  et sur TouchableOpacity (onPress)
       // console.log('idFilm:'+idFilm);
       // on faire passé aussi le les infos dans en second paramettre
       this.props.navigation.navigate("Detail",{idFilm:id}); // la navigation est accessible partout donc on navigue vers l'ecran Detail dans navigation/navigation
    }
        

    
    _searchNewFilms(){
        this.pageCurrent=0;
        this.totalPage=0;
        this.setState({films:[],isLoading:false},()=>this._loadFilms()); // setState est asynchrone donc le deuxieme pâramettre precise bien quand il se termine
        
    }
   _displayLoading(){ // Ouh !!! methode qui retourne du jsx je suis appeler dans render() mais je rend chargement si et seulement si je vaut true
       if(this.state.isLoading){
           return(
               <View style={style.loading_container}>
                   <ActivityIndicator size="large"/>
               </View>
           )
       }
   }
    _loadFilms(){ // appeler pour charger les films depuis notre api son utilisation se trouvre quand l(utilisateur click sur rechercher)
        this.setState({isLoading:true});
        if(this.searchText.length>0){ // on s'assure que la valeur du champs n'est pas vide
             getFilmsFromApiWithSearchText(this.searchText,this.pageCurrent+1) // incrementation this.pageCurrent+1 pour ne pas appeler la meme page
             .then(data=>
                 {// on difinir cette alcolade pour modifier d'autre infos
                    this.pageCurrent=data.page;
                    this.totalPage=data.total_pages;
                    this.setState({
                        films:[...this.state.films,...data.results], // films:data.results c'est ecraser ce qui existe deja alors que [...this.state.films,...data.results] permet de concaterner les ancienne valeur aux recents
                        isLoading:false
                     })
                 }
                ); // modification du state avec setState
        }
   }

    _searchTextInputChanged(text){ // c'est la valeur du text saisie par utilisateur  il est appeler par onChangeText
        this.searchText=text // on modifie la valeur de la variable searchText
    }
    render() {
        console.log(this.state.isLoading);
        return(
            <View style={style.main_container}>
                 <TextInput
                    onSubmitEditing={()=>this._searchNewFilms()} // quand l'utiliseur appuy sur entree du clavier
                    onChangeText={(text)=>this._searchTextInputChanged(text)} // quand l'utilisateur tape du texte
                    style={style.textinput} placeholder="Titre du film" // valeur par defaut 
                   />
                 <Button 
                    style={{height:50,marginBottom:20}}
                    title="Search" // le texte du bouton
                    onPress={ () => this._searchNewFilms()}
                    />
                 <FlatList
                    data={this.state.films} // films depuis fimlDatas pour les test
                    extraData={this.props.favoritesFilm}// On utilise la prop extraData pour indiquer à notre FlatList que d’autres données doivent être prises en compte si on lui demande de se re-rendre
                    
                    onEndReachedThreshold={0.5}// tres important pour les scroll infini
                    onEndReached={()=>{ // appeler une action
                        if(this.state.films.length>0 && this.pageCurrent<this.totalPage){ // nous somme a la fin des 20 premier films  et que le nombre de page n' a pas depassé le total des pages
                           // console.log('nous somme a la fin');
                           this._loadFilms();
                        }
                    }}
                    keyExtractor={(item)=>item.id.toString()} // pour definir un id unique
                    // Ajout d'une props isFilmFavorite pour indiquer à l'item d'afficher un 🖤 ou non
                    renderItem={({item}) => <FilmItems isFilmFavorite={(this.props.favoritesFilm.findIndex(film => film.id === item.id) !== -1) ? true : false} displayDetailForFilm={this._displayDetailForFilm} film={item}/>} // C'est ici que ce trouve mon magnifique composant FilmsItems, WOOh je peux faire passer une methode parent a un composant enfant (_displayDetailForFilm())
                 />
                 {this._displayLoading()}
            </View>
           
        )
    }
}

const style = StyleSheet.create({
    main_container:{
        flex:1,
      
    },
    textinput: {
     
      marginLeft:5,
      marginRight:5,
      height:50,
      borderColor:'#FFFFFF',
      borderWidth:1,
      paddingLeft:5
    },
    loading_container:{
       position:"absolute" ,
       left:0,
       right:0,
       top:100,
       bottom:0,
       alignItems:'center',
       justifyContent:'center'
    }
  });

  // TRES IMPORTANT QUAND UN PROPS CHANGE l'APP SE REREND donc "MISE A JOUR DES COMPOSANT ABONNEE"
const mapStateToProps = (state) =>{ // il va permettre de connecter les données du state globale aux props du composant FilmDetail
    return { // je vais specifier les données du state globale qui m'interresse
         favoritesFilm : state.favoritesFilm
    }
}
export default connect(mapStateToProps)(Search); // Abonement effectuer avec les données du state globale donc depuis reducers mapé (favoritesFilm)