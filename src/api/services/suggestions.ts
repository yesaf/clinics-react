import { AxiosResponse } from 'axios';
import api from '../default';
import { SuggestionsResponse } from '../types/responses';

class SuggestionsService {
    getSuggestions(suggest: string, selector: string): Promise<AxiosResponse<SuggestionsResponse> | null> {
        if (selector === 'zip') {
            return Promise.resolve(null);
        }

        return api.get('/suggest/' + selector, {
            params: {
                suggest,
            },
        });
    }
}

export default new SuggestionsService();
