import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import tmdbClient from '../lib/tmdbClient';


export const fetchMovies = createAsyncThunk('movies/fetchMovies', async (apiUrl) => {
  const response = await tmdbClient.get(apiUrl);
  return response.data.results;
});

const moviesSlice = createSlice({
  name: 'movies',
  initialState: {
    list: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMovies.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchMovies.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.list = action.payload;
      })
      .addCase(fetchMovies.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default moviesSlice.reducer;
