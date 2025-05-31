// Hooks Dependencies
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
// FontAwesome Dependencies
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faTrash } from '@fortawesome/free-solid-svg-icons'

// Images Dependencies
import imgLogoStarwars from "../assets/img/logo_star_wars.png";

// Exports Component
export const Navbar = () => {
	// Global Reuducer Hook
	const { store, dispatch } = useGlobalReducer();

	const [show, setShow] = useState(false);// State Of Favorites Dropdown List Show if its True
	const [searchQuery, setSearchQuery] = useState(''); // States Of Search Input
	const [suggestions, setSuggestions] = useState([]);

	// Sum all Elemets and put in one array
	const allFavorites = [
		...store.favorites.characters,
		...store.favorites.planets,
		...store.favorites.starships];

	const handleSearchChange = (e) => {
		const value = e.target.value;
		setSearchQuery(value);

		if (value.length > 0) { // sum all objects in one array and add type key
			const allItemToSearch = [
				...store.characters.map(item => ({ ...item, type: 'characters' })),
				...store.planets.map(item => ({ ...item, type: 'planets' })),
				...store.starships.map(item => ({ ...item, type: 'starships' })),
			];
			// Filters the array if value includes coincidence on the name key and returns each object.
			const filteredItems = allItemToSearch.filter((item) =>
				item.properties.name.toLowerCase().includes(value.toLowerCase())
			);
			// Limit the susgestions listed to 5
			setSuggestions(filteredItems.slice(0, 5));
		} else {
			setSuggestions([]); // Empty array where no has coincidences
		}
	}

	// Starts with page is loading
	useEffect(() => {
		//Disable show dropdown list where have not favorites
		if (allFavorites.length === 0) {
			setShow(false);
		}
	}, [allFavorites]);


	return (
		<nav className="navbar navbar-light bg-dark">
			<div className="container">
				<span className="navbar-brand mb-0 h1">
					<Link to="/">
						<img style={{ maxHeight: `5vh` }} src={imgLogoStarwars} />
					</Link>
				</span>
				<div className="ms-auto d-flex position-relative me-3" style={{ zIndex: 5 }}>
					<input
						className="form-control me-2"
						type="search"
						placeholder="Search"
						value={searchQuery}
						onChange={handleSearchChange}
					/>
					{suggestions.length > 0 &&
						<ul
							className="list-group position-absolute w-100 rounded-2 bg-white"
							style={{ top: '100%', zIndex: 10 }}
						>
							{suggestions.map((item, index) => (
								<Link
									to={`/more/${item.type}/${item.uid}`}
									className="text-decoration-none"
								>
									<li
										key={index}
										className="list-group-item bg-transparent border-0 text-danger me-2"
										onClick={() => {
											setSearchQuery('');
											setSuggestions([]);
										}}
									>
										{item.properties.name}
										<small className="text-muted">
											{item.type === 'characters' ? ' Character' :
												item.type === 'planets' ? ' Planet' :
													item.type === 'starships' ? ' Starship' : ''}
										</small>
									</li>
								</Link>
							))}
						</ul>
					}
					<div className="dropdown">
						<button
							className={
								`btn ${allFavorites.length > 0 ?
									`btn-warning` : `btn-outline-warning`
								}
								dropdown-toggle`
							}
							type="button"
							onClick={() => { if (allFavorites.length > 0) { setShow(!show) } }}
						>
							<FontAwesomeIcon icon={faStar} className="pe-2" />
							{allFavorites.length > 0 ? allFavorites.length : ""}
						</button>
						<div
							className={`dropdown-menu ${show ? 'show' : ''}`}
							style={{
								right: 0,
								left: 'auto'
							}}
						>
							{store.favorites && ["characters", "planets", "starships"].map((type) =>
								store.favorites[type].map((item) => (
									<div
										key={item.uid}
										className="dropdown-item d-flex justify-content-between align-items-center"
									>
										<Link
											className="text-danger text-decoration-none me-2"
											to={`more/${type}/${item.uid}`}
										>
											{item.properties.name}
										</Link>
										<br />
										<FontAwesomeIcon
											icon={faTrash}
											onClick={() => dispatch(
												{
													type: "REMOVE_FAVORITE",
													payload: { type: type, item }
												})}
											role="button"
										/>
									</div>
								)))}
						</div>
					</div>
				</div>
			</div>
		</nav>
	);
};