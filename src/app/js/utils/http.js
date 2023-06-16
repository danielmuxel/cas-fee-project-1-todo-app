const apiUrl = 'http://localhost:3000/api/';

const http = {
  async get(type, params = {}) {
    const query = new URLSearchParams(params).toString();
    try {
      const response = await fetch(`${apiUrl}${type}?${query}`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return await response.json();
    } catch (error) {
      console.error('Fetch error: ', error);
      throw error;
    }
  },

  async post(type, body = {}) {
    try {
      const response = await fetch(type, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return await response.json();
    } catch (error) {
      console.error('Fetch error: ', error);
      throw error;
    }
  },

  async put(type, body = {}) {
    try {
      const response = await fetch(type, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return await response.json();
    } catch (error) {
      console.error('Fetch error: ', error);
      throw error;
    }
  },

  async delete(type, params = {}) {
    const query = new URLSearchParams(params).toString();
    try {
      const response = await fetch(`${type}?${query}`, {
        method: 'DELETE'
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return await response.json();
    } catch (error) {
      console.error('Fetch error: ', error);
      throw error;
    }
  },
};

export default http;