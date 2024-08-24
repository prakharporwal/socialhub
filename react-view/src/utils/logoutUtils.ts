export function logOut() {
  window.localStorage.removeItem("authenticated");
  window.localStorage.removeItem("access_token");
  window.localStorage.removeItem("username");
  window.localStorage.removeItem("organisation_group_id");

  document.cookie = `access_token=; Path=/;`;
}
