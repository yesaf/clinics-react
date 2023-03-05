import { GoogleMap } from '@react-google-maps/api';
import { useMemo } from 'react';
import {ClinicData} from "@/api/types/responses";
import {ActiveMarker, SideMarker} from "./Marker";

interface IProps {
    clinics: Array<ClinicData>;
    activeIndex: number;
}

function Map({ clinics, activeIndex }: IProps) {
    const center = useMemo(() => {
        return {
            lat: clinics[activeIndex].lat,
            lng: clinics[activeIndex].lng,
        }
    }, [clinics, activeIndex]);

    const markers = useMemo(() => {
        return clinics.map((clinic, index) => {
            const position = {
                lat: clinic.lat,
                lng: clinic.lng,
            }

            const Marker = activeIndex === index ? ActiveMarker : SideMarker;

            return (
                <Marker
                    key={index}
                    position={position}
                />
            );
        });
    }, [clinics, activeIndex]);

    return (
        <GoogleMap
            zoom={15}
            mapContainerClassName={'map'}
            center={center}
        >
            {markers}
        </GoogleMap>
    );
}

export default Map;
