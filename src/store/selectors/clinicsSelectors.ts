import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '@/store';

const clinicsFilter = (state: RootState) => state.clinics;

export const clinicsSelector = createSelector(clinicsFilter, (clinics) => clinics.clinics);
export const activeIndexSelector = createSelector(clinicsFilter, (clinics) => clinics.activeIndex);
export const activeClinicSelector = createSelector(
    clinicsSelector,
    activeIndexSelector,
    (clinics, activeIndex) => clinics[activeIndex]
);
