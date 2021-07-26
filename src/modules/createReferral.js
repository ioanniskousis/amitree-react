/* eslint-disable no-alert */

function parse(json) {
  if (json.referral_code) {
    return { referral: json.referral_code };
  }
  if (json.constrain) {
    alert(JSON.stringify(json.constrain));
  } else if (json.error) {
    alert(json.error);
  } else {
    alert(JSON.stringify(json));
  }
  return null;
}

export async function createReferral(apiURL, authToken, handle) {
  const actionUrl = `${apiURL}/referral`;
  const options = {
    method: 'post',
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
  };
  await fetch(actionUrl, options)
    .then((response) => response.json())
    .then((json) => handle(parse(json)))
    .catch((e) => {
      alert(`API call Error : ${e}`);
      return null;
    });
}

export default createReferral;
