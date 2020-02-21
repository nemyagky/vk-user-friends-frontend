import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthComponent } from "./pages/auth/auth.component";
import { FriendsComponent } from "./pages/friends/friends.component";

const routes: Routes = [
  { path: "auth", component: AuthComponent },
  { path: "friends", component: FriendsComponent },
  { path: "**", redirectTo: "/auth" }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
