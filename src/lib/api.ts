// import axios from 'axios';

// const api = axios.create({
//   baseURL: process.env.NEXT_PUBLIC_API_URL,
//   headers: {
//     'Content-Type': 'application/json',
//   },
// });

// api.interceptors.request.use((config) => {
//   const token = localStorage.getItem('token');
//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`;
//   }
//   return config;
// });

// export const fetchArticles = async (params?: any) => {
//   const { data } = await api.get('/articles', { params });
//   return data;
// };

// export const fetchArticle = async (slug: string) => {
//   const { data } = await api.get(`/articles/${slug}`);
//   return data;
// };

// export const fetchCategories = async () => {
//   const { data } = await api.get('/categories');
//   return data;
// };

// export default api;