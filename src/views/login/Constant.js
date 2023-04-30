const protocol = window.location.protocol;
const domain = window.location.hostname;
const port = window.location.port;

export const FRONTEND_URL = `${protocol}//${domain}${port === "" ? "" : (":" + port)}`;
