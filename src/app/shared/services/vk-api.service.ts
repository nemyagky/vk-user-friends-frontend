import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";

@Injectable({
  providedIn: "root"
})
export class VkApiService {

  public clientId: number = 7318153;
  public redirectUrl: string = "http://localhost:4200";

  constructor(private http: HttpClient, private router: Router) {

  }

  public auth() {
    // tslint:disable-next-line: max-line-length
    const vkAuthPage = window.open(`https://oauth.vk.com/authorize?client_id=${this.clientId}&display=popup&redirect_uri=${this.redirectUrl}&scope=friends&response_type=token&v=5.103`, "VkAuth", "height=600,width=800");

    // vkAuthPage не разрешает повешать на себя событие load из соображений безопасности, поэтому костылим
    const checkUrlInterval = setInterval(() => {
      try {
        if (vkAuthPage.location.href === "about:blank") { return; }

        // vkAuthPage.location.href имеет вид типа http://localhost:4200/#access_token=abc
        const url = new URL(vkAuthPage.location.href).hash;
        // Удаляем все лишние символы, парсим в объект
        const urlParams = JSON.parse('{"' + url.replace(/#/g, "").replace(/&/g, '","').replace(/=/g, '":"') + '"}');

        this.setAccessToken(urlParams.access_token);

        vkAuthPage.close();
        clearInterval(checkUrlInterval);
      } catch {
        return;
      }
    }, 100);
  }

  // TODO добавить проверки на корректность
  public getAccessToken() {
    return localStorage.getItem("accessToken");
  }

  public setAccessToken(token: string) {
    localStorage.setItem("accessToken", token);

    if (token) {
      this.router.navigateByUrl("friends");
    }
  }

  public async getUserFriends() {

    try {
      const accessToken = localStorage.getItem("accessToken");

      return await this.http.post("https://api.vk.com/method/friends.get", {
        params: {
          order: "hints",
          count: 10,
          fields: "nickname",
          access_token: accessToken
        },
        headers: {

        }
      }).toPromise();

    } catch (e) {
      console.error(e);
      this.router.navigateByUrl("auth");
    }
  }

}
