import lambdaIcon from '@/assets/lambda.svg';
import clinicsService from '@/api/services/clinics';
import {useState} from 'react';
import {ClinicData} from '@/api/types/responses';
import {Selectors} from "@/api/services/clinics";

import './Home.css';
import Search, {ISelector} from './components/search/Search';
import SearchResults from './components/searchResults/SearchResults';
import Details from './components/details/Details';


function Home() {
    const [searchResults, setSearchResults] = useState<Array<ClinicData>>([]);
    const [activeIndex, setActiveIndex] = useState<number>(0);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const handleSearch = (searchValue: string, selector: ISelector) => {
        setIsLoading(true);
        const selectors: Selectors = {
            [selector.selector]: searchValue
        }
        clinicsService.searchClinics(selectors)
            .then((res) => {
                const results = res.data;
                setActiveIndex(0);
                setSearchResults(results);
            })
            .finally(() => setIsLoading(false));
    };

    const handleChoose = (index: number) => {
        setActiveIndex(index);
    };

    return (
        <div className="home">
            <div className="search-container">
                <Search onSearchChange={handleSearch}/>
                <SearchResults results={searchResults}
                               activeIndex={activeIndex!}
                               isLoading={isLoading}
                               onClick={handleChoose}/>
            </div>
            <div className="details-container">
                <div className="logo-container">
                    <img src={lambdaIcon} alt="Logo"/>
                </div>
                {
                    searchResults.length > 0 &&
                    <Details activeIndex={activeIndex}
                             clinics={searchResults}
                             handleChoose={handleChoose}/>
                }
            </div>

        </div>
    );
}

export default Home;
