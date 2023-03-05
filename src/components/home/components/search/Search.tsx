import {memo, useCallback, useEffect, useMemo, useState} from 'react';
import searchIcon from '../../../../assets/search.svg';
import SearchOption from './components/searchOption/SearchOption';
import './Search.css';
import SearchSuggestions from './components/searchSuggestions/SearchSuggestions';

export interface ISelector {
    name: string;
    selector: 'city' | 'state' | 'zip' | 'clinicName' | 'suburb';
}

interface IProps {
    onSearchChange: (searchValue: string, selector: ISelector) => void;
}

const selectors: ISelector[] = [
    {
        name: 'City',
        selector: 'city',
    },
    {
        name: 'State',
        selector: 'state',
    },
    {
        name: 'ZIP',
        selector: 'zip',
    },
    {
        name: 'Clinic name',
        selector: 'clinicName',
    },
    {
        name: 'Suburb',
        selector: 'suburb',
    },
];

function Search({onSearchChange}: IProps) {
    const [searchValue, setSearchValue] = useState<string>('');
    const [currSelector, setCurrSelector] = useState<ISelector>(selectors[0]);

    const search = useCallback((value: string) => {
        onSearchChange(value, selectors.find((selector) => selector === currSelector)!);
    }, [currSelector]);

    const handleClickedOption = useCallback((option: string) => {
        setSearchValue('');
        const selector = selectors.find((selector) => selector.name === option);
        setCurrSelector(selector!);
    }, [setSearchValue, setCurrSelector]);

    useEffect(() => {
        search(searchValue);
    }, []);

    const optionsList = useMemo(() => {
        return selectors.map((selector, index) => {
            return <SearchOption key={index}
                                 option={selector.name}
                                 isChosen={selector === currSelector}
                                 onClick={handleClickedOption}/>;
        });
    }, [currSelector]);

    const handleSuggestionClick = (suggestion: string) => {
        setSearchValue(suggestion);
        search(suggestion);
    }

    return (
        <div className="search">
            <div className="search-input">
                <img src={searchIcon} alt="" className="search-icon"/>
                <input type="text" placeholder="Search for smth..."
                       value={searchValue}
                       onKeyPress={(e) => {
                           if (e.key === 'Enter') {
                               search(searchValue);
                           }
                       }}
                       onChange={(e) => setSearchValue(e.target.value)}/>
                <SearchSuggestions suggest={searchValue}
                                   selector={currSelector.selector}
                                   onClicked={handleSuggestionClick}/>
            </div>
            <div className="search-options">
                {optionsList}
            </div>
        </div>
    );
}

export default memo(Search);
