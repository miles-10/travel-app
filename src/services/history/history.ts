import {createSlice, PayloadAction} from '@reduxjs/toolkit';

interface HistoryItem {
  id: string;
  location: string;
  date: string;
  notes: string;
}

interface HistoryState {
  history: HistoryItem[];
}

const initialState: HistoryState = {
  history: [],
};

const historySlice = createSlice({
  name: 'history',
  initialState,
  reducers: {
    addHistoryItem: (state, action: PayloadAction<HistoryItem>) => {
      state.history.push(action.payload);
    },

    loadHistory: (state, action: PayloadAction<HistoryItem[]>) => {
      state.history = action.payload;
    },
    deleteHistoryItem: (state, action: PayloadAction<string>) => {
      state.history = state.history.filter(item => item.id !== action.payload);
    },
    updateHistoryItem: (state, action: PayloadAction<HistoryItem>) => {
      const index = state.history.findIndex(
        item => item.id === action.payload.id,
      );
      if (index !== -1) {
        state.history[index] = action.payload;
      }
    },
  },
});

export const {
  addHistoryItem,
  loadHistory,
  deleteHistoryItem,
  updateHistoryItem,
} = historySlice.actions;
export default historySlice.reducer;
