/* eslint-disable no-alert */
function parseIndex(json) {
  const { error } = json;
  if (error) {
    alert(JSON.stringify(`error: ${error}`));
    return null;
  }
  return json;
}

export async function usersIndexRequest(authToken, apiURL, handle) {
  const actionUrl = `${apiURL}/users`;

  const options = {
    method: 'get',
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
  };
  await fetch(actionUrl, options)
    .then((response) => response.json())
    .then((json) => handle(parseIndex(json)))
    .catch((e) => {
      alert(JSON.stringify(e));
      return null;
    });
}

function parseInfo(json) {
  const { error } = json;
  if (error) {
    alert(JSON.stringify(`error: ${error}`));
    return null;
  }
  // alert('json :' + JSON.stringify(json));
  return {
    id: json.id,
    name: json.name,
    email: json.email,
    inviter: json.inviter,
    credit: json.credit,
    referralCode: json.referral_code,
    invitedUsers: json.invited_users,
  };
}

export async function userInfoRequest(authToken, apiURL, userId, handle) {
  const actionUrl = `${apiURL}/user/${userId}`;

  const options = {
    method: 'get',
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
  };
  await fetch(actionUrl, options)
    .then((response) => response.json())
    .then((json) => handle(parseInfo(json)))
    .catch((e) => {
      alert(JSON.stringify(e));
      return null;
    });
}
