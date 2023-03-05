import { useLoadScript } from '@react-google-maps/api';
import Map from './Map';

import './Location.css';

const libraries: ["places"] = ["places"];

function Location() {
    const { isLoaded } = useLoadScript({
        googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY as string,
        libraries: libraries,
    });

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
