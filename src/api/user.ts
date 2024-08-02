export const fetchUsers = async (queryParams: string = '') => {
  /**
   * TODO: use env variable for the server URL
   */
  const response = await fetch('http://localhost:3001/users?' + queryParams, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  return response.json();
};
