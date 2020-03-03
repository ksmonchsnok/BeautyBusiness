import MessageService from "../message_service.js";

function getAuthHeader() {
  let auth = JSON.parse(localStorage.getItem("auth"));
  if (auth) {
    return {
      Authorization: "bearer " + auth.Token,
      "Content-Type": "application/json"
    };
  } else {
    return { "Content-Type": "application/json" };
  }
}

export default class HttpHelper {
  static httpPost(data) {
    return {
      method: "POST",
      headers: getAuthHeader(),
      body: JSON.stringify(data)
    };
  }

  static httpGet() {
    let reqHeader = {
      method: "GET",
      headers: getAuthHeader()
    };
    return reqHeader;
  }

  static httpDelete() {
    let reqHeader = {
      method: "DELETE",
      headers: getAuthHeader()
    };

    return reqHeader;
  }

  static setAuth(auth) {
    if (auth) {
      localStorage.setItem("auth", JSON.stringify(auth));
    } else {
      localStorage.removeItem("auth");
    }
  }
  static getAuth() {
    let auth = JSON.parse(localStorage.getItem("auth"));
    return auth;
  }

  static getAuthUser() {
    let auth = JSON.parse(localStorage.getItem("auth"));
    if (auth) {
      return auth.info;
    }
    return null;
  }

  static handleResponse(response) {
    return response.text().then(text => {
      if (!response.ok) {
        if (response.status === 401) {
          if (window.location.href.indexOf("setup-password") < 0) {
            HttpHelper.setAuth(null);
            window.location.reload();
          } else {
            const data = text && JSON.parse(text);
            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
          }
        } else if (response.status === 500) {
          const error = "Internal server error.";
          MessageService.ErrorEvent.next({ message: error });
          return Promise.reject(error);
        }
        const data = text && JSON.parse(text);
        const error = (data && data.message) || response.statusText;
        MessageService.ErrorEvent.next({ message: error });
        return Promise.reject(error);
      } else {
        try {
          return JSON.parse(text);
        } catch {
          return text;
        }
      }
    });
  }
}
