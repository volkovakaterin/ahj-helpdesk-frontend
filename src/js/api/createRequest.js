const createRequest = async (options) => {
  const baseURL = 'http://art-helpdesk.herokuapp.com/';
  const requestURL = `${baseURL}?method=${options.type}${options.id ? options.id : ''}`;
  const request = await fetch(requestURL, {
    method: options.method,
    body: options.data ? JSON.stringify(options.data) : null,
  });
  const response = await request.json();
  if (options.callback) {
    options.callback(response);
  }
  return response;
};

export default createRequest;
