import { useLoadScript } from '@react-google-maps/api';
import Map from './Map';

import './Location.css';
import {ClinicData} from "@/api/types/responses";

const libraries: ["places"] = ["places"];

interface IProps {
    clinics: Array<ClinicData>;
    activeIndex: number;
}

function Location({ clinics, activeIndex }: IProps) {
    const { isLoaded } = useLoadScript({
        googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY as string,
        libraries: libraries,
    });

    return (
        <div className="location">
            {
                isLoaded ?
                    <Map clinics={clinics} activeIndex={activeIndex}/> :
                    <p className="map-loading">Loading...</p>
            }
        </div>
    );
}

export default Location;
