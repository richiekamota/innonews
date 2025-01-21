import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import apiClient from '../../services/api';

export interface Article {
  id: string;
  title: string;
  description: string;
  urlToImage: string;
  author: string;
  source: string;
  category: string;
  published_at: string;
  created_at: string;
  updated_at: string;
}

interface ArticlesState {
  articles: Article[];
  loading: boolean;
  error: string | null;
}

const initialState: ArticlesState = {
  articles: [],
  loading: false,
  error: null,
};

// Create Async Thunk for fetching articles
export const fetchArticles = createAsyncThunk(
  'articles/fetchArticles',
  async ({ filters, csrfToken }: { filters: any, csrfToken: string }, { rejectWithValue }) => {
    try {
      const response = await apiClient.get('/api/articles', {
        params: filters,
        headers: {
          "X-XSRF-TOKEN": csrfToken,  // Pass CSRF token in headers
        },
      });
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Create Slice
const articlesSlice = createSlice({
  name: 'articles',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchArticles.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchArticles.fulfilled, (state, action) => {
        state.loading = false;
        state.articles = action.payload;
      })
      .addCase(fetchArticles.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default articlesSlice.reducer;
