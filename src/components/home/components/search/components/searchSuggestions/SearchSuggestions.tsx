import { memo, useEffect, useMemo, useState, KeyboardEvent } from 'react';
import suggestionsService from '@/api/services/suggestions';

import './SearchSuggestions.css';

interface IProps {
    suggest: string;
    selector: string;
    onClicked: (suggestion: string) => void;
}

function SearchSuggestions({ suggest, selector, onClicked }: IProps) {
    const [ready, setReady] = useState<boolean>(false);
    const [suggestions, setSuggestions] = useState<Array<string>>([]);

    useEffect(() => {
        setReady(false)
        suggestionsService.getSuggestions(suggest, selector).then((res) => {
            if (res) {
                setSuggestions(res.data);
                setReady(true);
            }
        })
    }, [suggest, selector]);


    const handleEnter = (suggestion: string) => {
        return (e: KeyboardEvent<HTMLSpanElement>) => {
            if (e.key === 'Enter') {
                onClicked(suggestion);
            }
        }
    }

    const suggestionsList = useMemo(() => {
        return suggestions.map((suggestion, index) => {
            return (
                <span className="suggestion" key={index}
                      tabIndex={0}
                      onMouseDown={() => onClicked(suggestion)}
                      onKeyPress={handleEnter(suggestion)}>
                    {suggestion}
                </span>
            )
        })
    }, [suggestions]);

    return (
        <div className={`search-suggestions ${ready ? 'ready' : ''}`}>
            {suggestionsList}
        </div>
    );
}

export default memo(SearchSuggestions);
