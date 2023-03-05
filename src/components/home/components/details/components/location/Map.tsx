import { GoogleMap } from '@react-google-maps/api';
import { useMemo } from 'react';
import {ClinicData} from "@/api/types/responses";
import {ActiveMarker, SideMarker} from "./Marker";

interface IProps {
    clinics: Array<ClinicData>;
    activeIndex: number;
    onMarkerClick: (index: number) => void;
}

function Map({ clinics, activeIndex, onMarkerClick }: IProps) {
    const center = useMemo(() => {
        return {
            lat: clinics[activeIndex].lat,
            lng: clinics[activeIndex].lng,
        }
    }, [clinics, activeIndex]);

    const markers = useMemo(() => {
        return clinics.map((clinic, index) => {

            const Marker = activeIndex === index ? ActiveMarker : SideMarker;
            const onClick = () => onMarkerClick(index);

            return (
                <Marker
                    key={index}
                    clinic={clinic}
                    onClick={onClick}
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
