/* eslint-disable no-alert */
function parse(json) {
  const { error } = json;
  if (error) {
    if (error.user_authentication) {
      alert(`authentication: ${error.user_authentication}`);
    } else {
      alert(JSON.stringify(`error: ${json.error}`));
    }
    return null;
  }
  return {
    authToken: json.auth_token,
    userId: json.user_id,
    userName: json.user_name,
    userEmail: json.user_email,
  };
}

export async function loginRequest(form, apiURL, handle) {
  const actionUrl = `${apiURL}/authenticate`;
  const formData = new FormData(form);

  const options = {
    method: 'post',
    body: formData,
  };
  await fetch(actionUrl, options)
    .then((response) => response.json())
    .then((json) => handle(parse(json)))
    .catch((e) => {
      alert(JSON.stringify(e));
      return null;
    });
}

export default loginRequest;
