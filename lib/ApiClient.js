import superagent from 'superagent';
import * as storage from './persistence/storage';

/*
 * This silly underscore is here to avoid a mysterious "ReferenceError: ApiClient is not defined" error.
 * See Issue #14. https://github.com/erikras/react-redux-universal-hot-example/issues/14
 *
 * Remove it at your own risk.
 */
class ApiClient_ {
  constructor() {
    ['get', 'post', 'put', 'patch', 'del'].
      forEach((method) => {
        this[method] = (path, options) => {
          return new Promise((resolve, reject) => {
            const request = superagent[method](this.formatUrl(path));
            if (options && options.params) {
              request.query(options.params);
            }
            if (storage.get('ffc-token')) {
              let {accessToken, uid, client, tokenType, expiry} = JSON.parse(storage.get('ffc-token'));
              Object.assign(request.header, {
                'access-token': accessToken,
                'token-type': tokenType,
                uid,
                client,
                expiry
              });
            }
            if (options && options.data) {
              request.send(options.data);
            }
            request.end((err, res) => {
              if (err) {
                reject(err);
              } else {
                if (res.headers['access-token']) { // sign-in
                  let accessToken = res.headers['access-token'];
                  let tokenType = res.headers['token-type'];
                  let {uid, client, expiry} = res.headers;
                  storage.put('ffc-token', JSON.stringify({
                    accessToken,
                    tokenType,
                    uid,
                    client,
                    expiry
                  }));
                }

                resolve(res.body);
              }
            });
          });
        };
      });
  }

  /* This was originally a standalone function outside of this class, but babel kept breaking, and this fixes it  */
  formatUrl(path) {
    const adjustedPath = path[0] !== '/' ? '/' + path : path;

    const apiVersion = 'v1';
    const versionedApiPath = `/api/${apiVersion}${adjustedPath}`;

    let url;

    // This assumes they are served from the same place
    if (process.env.NODE_ENV === 'production') {
      url = versionedApiPath;
    }
    else if (process.env.USE_LOCAL_SERVER) {
      // NOTE: This requires CORS on server
      const serverPort = 3000;
      url = `http://localhost:${serverPort}${versionedApiPath}`;
    }
    // If not explicitly defined use the apiary mock api for local development
    else {
      url = `http://private-fea41c-freshfoodconnect.apiary-mock.com${adjustedPath}`;
    }

    return url;
  }
}
const ApiClient = ApiClient_;

export default ApiClient;
