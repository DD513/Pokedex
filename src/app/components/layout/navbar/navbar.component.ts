import { Component, OnInit } from "@angular/core";
import { IMAGE_PATHS } from "../../../core/constants/image-paths";

@Component({
  selector: "app-navbar",
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.css"],
})
export class NavbarComponent implements OnInit {
  // 🔹 圖片路徑
  homePageLoge = IMAGE_PATHS.HOME_PAGE_LOGO;
  constructor() {}

  ngOnInit() {}
}
