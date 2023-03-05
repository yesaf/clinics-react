type Response<T> = Array<T>;

export type ClinicData = {
    "longName": string,
    "registerLink": string,
    "pms": string,
    "metaTitle": string,
    "metaDescription": string,
    "slug": string,
    "website": string,
    "name": string,
    "displayWeb": string,
    "suburbLink": string,
    "fullAddress": string,
    "city": string,
    "suburb": string,
    "state": string,
    "postcode": string,
    "phone": string,
    "email": string,
    "about": string,
    "lat": number,
    "lng": number
}

export type ClinicsResponse = Response<ClinicData>;
export type SuggestionsResponse = Response<string>;


