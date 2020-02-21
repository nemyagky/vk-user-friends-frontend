import { Component } from "@angular/core";
import { VkApiService } from "./../../shared/services/vk-api.service";

@Component({
  selector: "app-auth",
  templateUrl: "./auth.component.html",
  styleUrls: ["./auth.component.scss"]
})

export class AuthComponent {

  constructor(private vkApi: VkApiService) { }

  public login() {
    this.vkApi.auth();
  }

}
