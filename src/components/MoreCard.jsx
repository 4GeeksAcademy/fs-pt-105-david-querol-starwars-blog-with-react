// FontAwesome Dependencies
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from '@fortawesome/free-solid-svg-icons'

// Export Component
export const MoreCard = ({ imageCard, name, description, onFav, isFav }) => {

  return (
    <>
      <h1 className="display-4 fw-bold mt-3 mb-5">{name}</h1>
      <div className="card m-2">
        <div className="row no-gutters">

          <div className="col-lg-5">
            <img src={imageCard} className="card-img-top" />
          </div>
          <div className="col-lg-7 position-relative">
            <div className="card-body">

              <div className="card-text text-start ps-3 pt-md-4 pb-md-3">{description}</div>
            </div>
            <div className="position-absolute bottom-0 end-0 mx-5 mb-4">
              <button
                className={`btn ${isFav ? 'btn-warning' : 'btn-outline-warning'}`}
                onClick={onFav}
              >
                <FontAwesomeIcon icon={faStar} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}