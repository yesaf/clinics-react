import { memo, useMemo, useState } from 'react';
import { ClinicData } from '@/api/types/responses';
import About from './components/about/About';
import Location from './components/location/Location';
import './Details.css';

interface IProps {
    clinics: Array<ClinicData>;
    activeIndex: number;
    handleChoose: (index: number) => void;
}

function Details({ activeIndex, clinics, handleChoose }: IProps) {
    const [screen, setScreen] = useState<'location' | 'about'>('location');
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
                        <About clinic={clinics[activeIndex]}/>
                }
                {
                    screen === 'location' &&
                        <Location clinics={clinics}
                                  activeIndex={activeIndex}
                                  handleChoose={handleChoose}/>
                }
            </div>

        </div>
    );
}

export default memo(Details);
