export const fetchUsers = async (queryParams: string = '') => {
  /**
   * TODO: use env variable for the server URL
   */
  const response = await fetch(`${process.env.NEXT_PUBLIC_POSTGREST_URL}/users?${queryParams}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'ngrok-skip-browser-warning': '1'
    },
  });

  return response.json();
};
