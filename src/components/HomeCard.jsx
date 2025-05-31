
// FontAwesome Dependencies
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from '@fortawesome/free-solid-svg-icons'

// Export Component
export const HomeCard = ({ imageCard, name, description, onMore, onFav, isFav }) => {

  return (

    <div className="card m-2 m-lg-3">
      <img src={imageCard} className="card-img-top" alt="..." />
      <div className="card-body">
        <h5 className="card-title">{name}</h5>
        <div className="card-text">{description}</div>
      </div>
      <div className="card-footer d-flex justify-content-between align-items-center">
        <button className="btn btn-outline-danger" onClick={onMore}>Learn More!</button>
        <button
          className={`btn ${isFav ? 'btn-warning' : 'btn-outline-warning'}`}
          onClick={onFav}
        >
          <FontAwesomeIcon icon={faStar} />
        </button>
      </div>
    </div>
  );
}