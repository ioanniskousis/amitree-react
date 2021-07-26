/* eslint-disable no-alert */

function parse(json) {
  if (json.error) {
    alert(JSON.stringify(json.error));
    return null;
  }
  return {
    authToken: json.auth_token,
    userId: json.user_id,
    userName: json.user_name,
    userEmail: json.user_email,
  };
}

export async function signUpRequest(form, apiURL, handle) {
  const actionUrl = `${apiURL}/register`;
  const formData = new FormData(form);

  const options = {
    method: 'post',
    body: formData,
  };
  await fetch(actionUrl, options)
    .then((response) => response.json())
    .then((json) => handle(parse(json)))
    .catch((err) => {
      alert(err);
      return null;
    });
}

export default signUpRequest;
