import axios from 'axios';

export const getProducts = async (company, category, top, minPrice, maxPrice, accessToken) => {
  try {
    const response = await axios.get(`http://20.244.56.144/test/companies/${company}/categories/${category}/products`, {
      params: { top, minPrice, maxPrice },
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
};
