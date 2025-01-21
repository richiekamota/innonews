import { createSlice } from '@reduxjs/toolkit';

interface FiltersState {
  startDate: string;
  endDate: string;
  source: string;
  category: string;
}

const initialState: FiltersState = {
  startDate: '',
  endDate: '',
  source: '',
  category: '',
};

const filtersSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setFilters: (state, action) => {
      state = { ...state, ...action.payload };
    },
  },
});

export const { setFilters } = filtersSlice.actions;
export default filtersSlice.reducer;
