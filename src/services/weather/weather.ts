import {WeatherResponse, WeatherState} from '@/types/response';
import {createSlice, PayloadAction, createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';

const initialState: WeatherState = {
  data: null,
  loading: false,
  error: null,
};

export const fetchWeather = createAsyncThunk<
  WeatherResponse,
  {latitude: number; longitude: number},
  {rejectValue: string}
>('weather/fetchWeather', async ({latitude, longitude}, {rejectWithValue}) => {
  try {
    const response = await axios.get<WeatherResponse>(
      `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=b0acf43efa16359bde42da4337a9de4a`,
    );

    return response.data;
  } catch (error: any) {
    const errorMessage =
      error.response?.data?.message || 'Failed to fetch weather data';
    return rejectWithValue(errorMessage);
  }
});

const weatherSlice = createSlice({
  name: 'weather',
  initialState,
  reducers: {
    resetWeather: state => {
      state.data = null;
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchWeather.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchWeather.fulfilled,
        (state, action: PayloadAction<WeatherResponse>) => {
          state.data = action.payload;
          state.loading = false;
        },
      )
      .addCase(fetchWeather.rejected, (state, action: PayloadAction<any>) => {
        state.error = action.payload || 'Failed to fetch weather data';
        state.loading = false;
      });
  },
});

export default weatherSlice.reducer;
