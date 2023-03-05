import './SearchResults.css';
import {useMemo, KeyboardEvent, useRef, useCallback, useEffect} from 'react';
import Loader from "@/components/loader/Loader";
import {useDispatch, useSelector} from "react-redux";
import {activeIndexSelector, clinicsSelector} from "@/store/selectors/clinicsSelectors";
import {setActiveIndex} from "@/store/actions/clinicsActions";

interface IProps {
    isLoading: boolean;
}

function SearchResults({isLoading}: IProps) {
    const activeRef = useRef<HTMLDivElement>(null);
    const clinics = useSelector(clinicsSelector);
    const activeIndex = useSelector(activeIndexSelector);
    const dispatch = useDispatch();

    const handleEnter = useCallback((index: number) => {
        return (e: KeyboardEvent<HTMLDivElement>) => {
            if (e.key === 'Enter') {
                dispatch(setActiveIndex(index));
            }
        };
    }, [dispatch]);

    useEffect(() => {
        if (activeRef.current) {
            activeRef.current.scrollIntoView({
                behavior: 'smooth',
                block: 'nearest',
            });
        }
    }, [activeIndex]);

    const resultsList = useMemo(() => clinics.map((clinic, index) => {
        return (
            <div key={index}
                 ref={index === activeIndex ? activeRef : null}
                 className={`result ${index === activeIndex ? 'chosen-clinic' : ''}`}
                 tabIndex={0}
                 onKeyPress={handleEnter(index)}
                 onClick={() => dispatch(setActiveIndex(index))}>
                <p className="result-name">{clinic.name}</p>
                <p className="result-address">
                    {clinic.fullAddress}
                </p>
                <div className="result-contacts">
                    <p className="result-contacts__item">
                        <a href={clinic.website} target="_blank">{clinic.website}</a>
                    </p>
                    <p className="result-contacts__item">
                        <a href={'tel:' + clinic.phone}>p. {clinic.phone}</a>
                    </p>
                </div>
            </div>
        );
    }), [clinics, activeIndex]);

    if (isLoading)
        return <div className="results"><Loader/></div>;

    return (
        <div className="results">
            {resultsList}
            {
                clinics.length === 0 &&
                <p className="no-results">No results</p>
            }
        </div>
    );
}

export default SearchResults;
