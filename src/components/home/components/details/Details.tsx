import { memo, useMemo, useState } from 'react';
import About from './components/about/About';
import Location from './components/location/Location';
import './Details.css';
import {useLoadScript} from "@react-google-maps/api";

const libraries: ["places"] = ["places"];

function Details() {
    const [screen, setScreen] = useState<'location' | 'about'>('location');

    const { isLoaded } = useLoadScript({
        googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY as string,
        libraries: libraries,
    });

    const buttons = useMemo(() => {
        return (
            <>
                <button className={`screen-select__button ${screen === 'location' ? 'active-screen' : ''}`}
                        onClick={() => setScreen('location')}>
                    Location
                </button>
                <button className={`screen-select__button ${screen === 'about' ? 'active-screen' : ''}`}
                        onClick={() => setScreen('about')}>
                    About
                </button>
            </>
        )
    }, [screen]);

    return (
        <div className="details">
            <div className="screen-select">
                {buttons}
            </div>
            <div className="details-content">
                {
                    screen === 'about' &&
                        <About/>
                }
                {
                    screen === 'location' &&
                        <Location isLoaded={isLoaded}/>
                }
            </div>

        </div>
    );
}

export default memo(Details);
