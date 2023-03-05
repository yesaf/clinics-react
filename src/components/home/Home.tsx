import lambdaIcon from '@/assets/lambda.svg';
import clinicsService from '@/api/services/clinics';
import {useState} from 'react';
import {Selectors} from "@/api/services/clinics";

import './Home.css';
import Search, {ISelector} from './components/search/Search';
import SearchResults from './components/searchResults/SearchResults';
import Details from './components/details/Details';
import {useDispatch, useSelector} from "react-redux";
import {clinicsSelector} from "@/store/selectors/clinicsSelectors";
import {setActiveIndex, setClinics} from "@/store/actions/clinicsActions";

function Home() {
    const clinics = useSelector(clinicsSelector);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const dispatch = useDispatch();

    const handleSearch = (searchValue: string, selector: ISelector) => {
        setIsLoading(true);
        const selectors: Selectors = {
            [selector.selector]: searchValue
        }
        clinicsService.searchClinics(selectors)
            .then((res) => {
                const results = res.data;

                dispatch(setClinics(results));
                dispatch(setActiveIndex(0));
            })
            .finally(() => setIsLoading(false));
    };


    return (
        <div className="home">
            <div className="search-container">
                <Search onSearchChange={handleSearch}/>
                <SearchResults isLoading={isLoading}/>
            </div>
            <div className="details-container">
                <div className="logo-container">
                    <img src={lambdaIcon} alt="Logo"/>
                </div>
                {
                    clinics.length > 0 &&
                    <Details/>
                }
            </div>

        </div>
    );
}

export default Home;
