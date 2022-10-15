export const setup = () => {
  const request = { body: {} };

  const response = {};

  const next = jest.fn();

  Object.assign(response, {
    status: jest.fn(
      function status() {
        return this;
      }.bind(response)
    ),
    json: jest.fn(
      function json() {
        return this;
      }.bind(response)
    ),
    send: jest.fn(
      function send() {
        return this;
      }.bind(response)
    ),
    end: jest.fn(
      function end() {
        return thisl;
      }.bind(response)
    ),
  });

  return { request, response, next };
};
