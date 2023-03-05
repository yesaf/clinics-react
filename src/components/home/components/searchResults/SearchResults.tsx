import {ClinicData} from '@/api/types/responses';
import './SearchResults.css';
import {useMemo, KeyboardEvent, useRef, useCallback, useEffect} from 'react';
import Loader from "@/components/loader/Loader";

interface IProps {
    results: Array<ClinicData>;
    activeIndex: number;
    onClick: (index: number) => void;
    isLoading: boolean;
}

function SearchResults({results, activeIndex, onClick, isLoading}: IProps) {
    const activeRef = useRef<HTMLDivElement>(null);

    const handleEnter = useCallback((index: number) => {
        return (e: KeyboardEvent<HTMLDivElement>) => {
            if (e.key === 'Enter') {
                onClick(index);
            }
        };
    }, [onClick]);

    useEffect(() => {
        if (activeRef.current) {
            activeRef.current.scrollIntoView({
                behavior: 'smooth',
                block: 'nearest',
            });
        }
    }, [activeIndex]);

    const resultsList = useMemo(() => results.map((result, index) => {
        return (
            <div key={index}
                 ref={index === activeIndex ? activeRef : null}
                 className={`result ${index === activeIndex ? 'chosen-clinic' : ''}`}
                 tabIndex={0}
                 onKeyPress={handleEnter(index)}
                 onClick={() => onClick(index)}>
                <p className="result-name">{result.name}</p>
                <p className="result-address">
                    {result.fullAddress}
                </p>
                <div className="result-contacts">
                    <p className="result-contacts__item">
                        <a href={result.website} target="_blank">{result.website}</a>
                    </p>
                    <p className="result-contacts__item">
                        <a href={'tel:' + result.phone}>p. {result.phone}</a>
                    </p>
                </div>
            </div>
        );
    }), [results, activeIndex]);

    if (isLoading)
        return <div className="results"><Loader/></div>;

    return (
        <div className="results">
            {resultsList}
            {
                results.length === 0 &&
                <p className="no-results">No results</p>
            }
        </div>
    );
}

export default SearchResults;
