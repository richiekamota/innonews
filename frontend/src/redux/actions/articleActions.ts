import apiClient from '../../services/api';

// Action Types
export const FETCH_ARTICLES_REQUEST = 'FETCH_ARTICLES_REQUEST';
export const FETCH_ARTICLES_SUCCESS = 'FETCH_ARTICLES_SUCCESS';
export const FETCH_ARTICLES_FAILURE = 'FETCH_ARTICLES_FAILURE';

// Action Creator to fetch articles
export const fetchArticles = ({ filters, csrfToken }) => async (dispatch) => {
  dispatch({ type: FETCH_ARTICLES_REQUEST });

  try {
    const response = await apiClient.get('/api/articles', {
      params: filters,
      headers: {
        'X-XSRF-TOKEN': csrfToken,
        'Authorization': `Bearer ${csrfToken}`
      },
    });

    dispatch({
      type: FETCH_ARTICLES_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    dispatch({
      type: FETCH_ARTICLES_FAILURE,
      error: error.message || 'Failed to fetch articles',
    });
  }
};
