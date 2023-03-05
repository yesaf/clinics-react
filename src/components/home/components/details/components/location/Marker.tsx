import {MarkerF} from "@react-google-maps/api";
import sideMarker from '@/assets/side-marker.svg';
import activeMarker from '@/assets/marker-active.svg';

interface IProps {
    position: {
        lat: number;
        lng: number;
    },
    isActive?: boolean;
}

export function SideMarker({ position }: IProps) {
    return (
        <MarkerF
            position={position}
            icon={{
                url: sideMarker,
                scaledSize: new window.google.maps.Size(40, 40),
            }}
        />
    );
}

export function ActiveMarker({ position }: IProps) {
    return (
        <MarkerF
            position={position}
            icon={{
                url: activeMarker,
                scaledSize: new window.google.maps.Size(40, 40),
            }}
        />
    );
}
