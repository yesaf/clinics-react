import { GoogleMap } from '@react-google-maps/api';
import {useCallback, useMemo} from 'react';
import {ActiveMarker, SideMarker} from "./Marker";
import {useDispatch, useSelector} from "react-redux";
import {activeIndexSelector, clinicsSelector} from "@/store/selectors/clinicsSelectors";
import {setActiveIndex} from "@/store/actions/clinicsActions";

function Map() {
    const clinics = useSelector(clinicsSelector);
    const activeIndex = useSelector(activeIndexSelector);
    const dispatch = useDispatch();

    const onMarkerClick = useCallback((index: number) => {
        dispatch(setActiveIndex(index));
    }, [dispatch]);

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
