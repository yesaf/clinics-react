import {MarkerF} from "@react-google-maps/api";
import sideMarker from '@/assets/side-marker.svg';
import activeMarker from '@/assets/marker-active.svg';
import {ClinicData} from "@/api/types/responses";
import {memo} from "react";

interface IProps {
    clinic: ClinicData;
    onClick: () => void;
}

export const SideMarker = memo(function ({ clinic, onClick }: IProps) {
    const position = {
        lat: clinic.lat,
        lng: clinic.lng,
    }

    return (
        <MarkerF
            onClick={onClick}
            position={position}
            icon={{
                url: sideMarker,
                scaledSize: new window.google.maps.Size(40, 40),
            }}
        />
    );
});

export const ActiveMarker = memo(function ({ clinic, onClick }: IProps) {
    const position = {
        lat: clinic.lat,
        lng: clinic.lng,
    }

    return (
        <MarkerF
            onClick={onClick}
            position={position}
            icon={{
                url: activeMarker,
                scaledSize: new window.google.maps.Size(40, 40),
            }}
        />
    );
});

