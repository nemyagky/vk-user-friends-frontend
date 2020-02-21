import { Component, OnInit } from "@angular/core";
import { VkApiService } from "./../../shared/services/vk-api.service";

@Component({
  selector: "app-friends",
  templateUrl: "./friends.component.html",
  styleUrls: ["./friends.component.scss"]
})
export class FriendsComponent implements OnInit {

  constructor(private vkApi: VkApiService) { }

  public async ngOnInit() {
    const userList = await this.vkApi.getUserFriends();

    console.log(userList);
  }

}
