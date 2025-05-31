// Hooks Dependencies
import { useNavigate, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
// FontAwesome Dependencies
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faTrash } from '@fortawesome/free-solid-svg-icons'

// Images Dependencies
import imgLogoStarwars from "../assets/img/logo_star_wars.png";

// Exports Component
export const Navbar = () => {

	const { store, dispatch } = useGlobalReducer();

	const [show, setShow] = useState(false);

	const navigate = useNavigate();

	const allFavorites = [
		...store.favorites.characters,
		...store.favorites.planets,
		...store.favorites.starships];

	useEffect(() => {
		if (allFavorites.length < 1) {
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

				<div className="ms-auto">
					<div className="dropdown">
						<button
							className="btn btn-warning dropdown-toggle"
							type="button"
							onClick={() => { if (allFavorites.length > 0) { setShow(!show) } }}
						>
							<FontAwesomeIcon icon={faStar} className="pe-2" />
							{allFavorites.length}
						</button>
						<div
							className={`dropdown-menu ${show ? 'show' : ''}`}
							style={{
								right: 0,
								left: 'auto'
							}}
						>
							{["characters", "planets", "starships"].map((type) =>
								store.favorites[type].map((item) => (
									<div key={item.uid} className="dropdown-item d-flex justify-content-between align-items-center">
										<Link className="text-danger me-2" to={`more/${type}/${item.uid}`}>{item.properties.name}</Link>
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