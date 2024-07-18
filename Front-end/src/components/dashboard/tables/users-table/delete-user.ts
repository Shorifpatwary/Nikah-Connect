// Combined type for both error and success responses

const deleteUser = async (id: number) => {
  try {
    // Construct the request URL with query string
    const url = `/api/user/delete/${id}`;
    // Make fetch request to register user
    // const response = await axios.get<UsersWithPagination>(url);
    // return response;
  } catch (error) {
    return {
      error: `SERVER ERROR: ${error instanceof Error ? error.message : String(error)}`,
    };
  }
};
export default deleteUser;
