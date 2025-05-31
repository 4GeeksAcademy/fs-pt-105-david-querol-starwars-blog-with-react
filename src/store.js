// Initial Data Store Loaded from Local Storage
export const initialStore=()=>{ 
  return {
    characters: JSON.parse(localStorage.getItem("characters")) || [],
    planets: JSON.parse(localStorage.getItem("planets")) || [],
    starships: JSON.parse(localStorage.getItem("starships")) || [],
    favorites: JSON.parse(localStorage.getItem("favorites")) || {
      characters: [], 
      planets: [], 
      starships: []
    },
      loading: 0,   
  }
}

// Store Reducer Setting Data
export default function storeReducer(store, action = {}) {
  switch(action.type){
    case 'SET_DATA_INDEX':
      return {
        ...store, characters: action.payload[0] || store.characters,
        planets: action.payload[1] || store.planets,
        starships: action.payload[2] || store.starships
      }         
    case 'SET_CHARACTERS':
      return {
        ...store, characters: action.payload.map(item => ({ ...item, isFav: false }))
      }
    case 'SET_PLANETS':
      return {
        ...store, planets: action.payload.map(item => ({ ...item, isFav: false }))
      }
    case 'SET_STARSHIPS': 
      return {
        ...store, starships: action.payload.map(item => ({ ...item, isFav: false }))
      }
    case 'UPDATE_LOADING':
      return {
        ...store, loading: action.payload || store.loading
      }
    case 'ADD_FAVORITE':{
      const { type, item } = action.payload;
      const exists = store.favorites[type].find(fav => fav.uid === item.uid);
      if (exists) return store;
        return {
          ...store,
          favorites: {
            ...store.favorites,
            [type]: [...store.favorites[type], item]
          }
        }
    }
    case 'REMOVE_FAVORITE':{
      const { type, item } = action.payload;
      return {
        ...store,
        favorites: {
          ...store.favorites,
          [type]: 
            store.favorites[type].filter(fav => fav.uid !== item.uid)
        }
      }
    }
    default:
      throw Error('Unknown action.');
  }    
}
