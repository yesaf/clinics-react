import api from '../default';
import { AxiosResponse } from 'axios';
import { ClinicsResponse } from '../types/responses';

export type Selectors = {
    city?: string;
    suburb?: string;
    state?: string;
    zip?: string;
    clinicName?: string;
}

class ClinicsService {
    searchClinics(selectors: Selectors): Promise<AxiosResponse<ClinicsResponse>> {
        return api.get('/clinics', {
            params: {
                ...selectors,
            }
        });
    }
}

export default new ClinicsService();
