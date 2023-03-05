import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {ClinicData} from "@/api/types/responses";

interface IState {
    clinics: ClinicData[];
    activeIndex: number;
}

const initialState: IState = {
    clinics: [],
    activeIndex: 0,
}

export const clinicsSlice = createSlice({
    name: 'clinics',
    initialState,
    reducers: {
        setClinics: (state, action: PayloadAction<ClinicData[]>) => {
            state.clinics = action.payload;
        },
        setActiveIndex: (state, action: PayloadAction<number>) => {
            state.activeIndex = action.payload;
        }
    }
});

export default clinicsSlice.reducer;
