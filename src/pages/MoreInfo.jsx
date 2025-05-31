// Hooks dependencies
import useGlobalReducer from "../hooks/useGlobalReducer";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
// Services dependencies
import { FetchAndStoreData } from "../services/FetchAndStoreData";
// Components
import { MoreCard } from "../components/MoreCard";
import { Loading } from "../components/Loading";
// Images dependencies
import imgPlanet from "../assets/img/starwars_planet.png";
import imgAvatar from "../assets/img/starwars_avatar.png";
import imgStarship from "../assets/img/starwars_starship.png";

// Export Component
export const MoreInfo = () => {
  // Hooks
  const { store, dispatch } = useGlobalReducer();
  const { theId, type } = useParams();

  // Function to check if the item is favorite.
  const isFavorite = (id, type) => {
    return store.favorites[type].find((fav) => fav.uid === id);
  }

  // Starts when the component loads.
  useEffect(() => {
    if (store.loading <= 3) {
      FetchAndStoreData(store, dispatch); // Call fetch and store data from the API
    }
    localStorage.setItem(
      "favorites", JSON.stringify(store.favorites)); // Save favorites in Local Storage
  }, [store.loading, store.favorites]);

  const moreInfoElement = store[type].find((item) => item.uid === theId); // Returs the item with the id  

  return (

    <div className="container text-center">
      {store.loading > 3 ?
        <MoreCard
          imageCard={type === "characters"
            ? imgAvatar
            : type === "planets"
              ? imgPlanet
              : type === "starships"
              && imgStarship
          }
          name={moreInfoElement.properties.name}
          description={
            Object.entries(moreInfoElement.properties)
              .filter(([key]) => key !== "name"
                && key !== "url"
                && key !== "uid"
                && key !== "created"
                && key !== "edited"
                && key !== "homeworld"
                && key !== "pilots"
                && key !== "films"
                && key !== "species"
                && key !== "vehicles")
              .map(([key, value]) => (
                <li key={key}>
                  <strong>{key}:</strong> {value}
                </li>
              ))
          }
          onFav={() =>
            dispatch({
              type: isFavorite(theId, type) ? "REMOVE_FAVORITE" : "ADD_FAVORITE",
              payload: { type: type, item: moreInfoElement }
            })
          }
          isFav={isFavorite(theId, type)}
        />
        : <div className="d-flex justify-content-center align-items-center mb-5" style={{ height: `80vh` }}>
          <Loading />
        </div>
      }
    </div>
  );
};
