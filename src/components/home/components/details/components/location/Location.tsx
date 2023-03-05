import Map from './Map';

import './Location.css';


function Location({isLoaded}: {isLoaded: boolean}) {
    return (
        <div className="location">
            {
                isLoaded ?
                    <Map/> :
                    <p className="map-loading">Loading...</p>
            }
        </div>
    );
}

export default Location;
