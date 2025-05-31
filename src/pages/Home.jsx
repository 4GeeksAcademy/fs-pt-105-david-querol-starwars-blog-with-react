
// Hooks Dependencies
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
// Services Dependencies
import { FetchAndStoreData } from "../services/FetchAndStoreData.js";
// Components Dependencies
import { HomeCard } from "../components/HomeCard";
import { Loading } from "../components/Loading";
// Images Dependencies
import imgPlanet from "../assets/img/starwars_planet.png";
import imgAvatar from "../assets/img/starwars_avatar.png";
import imgStarship from "../assets/img/starwars_starship.png";

// Export Component
export const Home = () => {
	// Hooks
	const { store, dispatch } = useGlobalReducer();
	const navigate = useNavigate();

	// Function to check if the item is favorite.
	const isFavorite = (id, type) => {
		return store.favorites[type].some((fav) => fav.uid === id); // return true if is favorite
	}

	// Starts when the component loads.
	useEffect(() => {
		if (store.loading <= 3) {
			FetchAndStoreData(store, dispatch); // Call fetch and store data from the API
		}
		localStorage.setItem("favorites", JSON.stringify(store.favorites)); // Save favorites in Local Storage
	}, [store.loading, store.favorites]);
	return (
		<div className="text-center mt-5">
			<h1 className="display-4 fw-bold">Characters</h1>
			<div className="row text-center mt-5">
				{/* Mapping and Rendering Characters */}
				{store.loading > 1 ? store.characters.map((item) => (
					<div key={item.uid} className="col-xl-3 col-lg-4 col-sm-6 col-xs-12 mb-4">
						<HomeCard
							imageCard={imgAvatar}
							name={item.properties.name}
							description={
								<div className="card-text text-start ps-3">
									<li>gender : {item.properties.gender}</li>
									<li>birth_year : {item.properties.birth_year}</li>
								</div>
							}
							onMore={() => navigate(`more/characters/${item.uid}`)}
							onFav={() =>
								dispatch({
									type: isFavorite(item.uid, "characters") ? "REMOVE_FAVORITE" : "ADD_FAVORITE",
									payload: { type: "characters", item }
								})
							}
							isFav={isFavorite(item.uid, "characters")}
						/>
					</div>
				)) : <Loading />
				}{/** Shows Loading Spinner if data is not already loaded */}
			</div>

			<h1 className="display-4 fw-bold mt-5">Planets</h1>

			<div className="row text-center mt-5">
				{/* Mapping and Rendering {Planets} */}
				{store.loading > 2 ? store.planets.map((item) => (
					<div key={item.uid} className="col-xl-3 col-lg-4 col-sm-6 col-xs-12 mb-4">

						<HomeCard
							imageCard={imgPlanet}
							name={item.properties.name}
							description={
								<div className="card-text text-start ps-3">
									<li>climate : {item.properties.climate}</li>
									<li>diameter : {item.properties.diameter}</li>
								</div>
							}
							onMore={() => navigate(`more/planets/${item.uid}`)}
							onFav={() =>
								dispatch({
									type: isFavorite(item.uid, "planets") ? "REMOVE_FAVORITE" : "ADD_FAVORITE",
									payload: { type: "planets", item }
								})
							}
							isFav={isFavorite(item.uid, "planets")}
						/>
					</div>
				)) : <Loading />
				}{/** Shows Loading Spinner if data is not already loaded */}
			</div>

			<h1 className="display-4 fw-bold mt-5">Starships</h1>

			<div className="row text-center mt-5">
				{/* Mapping and Rendering {Starships} */}
				{store.loading > 3 ? store.starships.map((item) => (
					<div key={item.uid} className="col-xl-3 col-lg-4 col-sm-6 col-xs-12 mb-4">
						<HomeCard
							imageCard={imgStarship}
							name={item.properties.name}
							description={
								<div className="card-text text-start ps-3">
									<li>model : {item.properties.model}</li>
									<li>manufacturer : {item.properties.manufacturer}</li>
								</div>
							}
							onMore={() => navigate(`more/starships/${item.uid}`)}
							onFav={() =>
								dispatch({
									type: isFavorite(item.uid, "starships") ? "REMOVE_FAVORITE" : "ADD_FAVORITE",
									payload: { type: "starships", item }
								})
							}
							isFav={isFavorite(item.uid, "starships")}
						/>
					</div>
				)) : <Loading />
				}{/** Shows Loading Spinner if data is not already loaded */}
			</div>
		</div>
	);
}; 