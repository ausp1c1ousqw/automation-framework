export const endpoints = {
  users: "/users",
  login: "/login",
  register: "/register",
  specificUser: (id) => `/users/${id}`,
  specificPage: (pageNumber) => `/users?page=${pageNumber}`,
};
