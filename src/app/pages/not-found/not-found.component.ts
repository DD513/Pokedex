import { Component, OnInit } from "@angular/core";
import { IMAGE_PATHS } from "../../core/constants/image-paths";

@Component({
  selector: "app-not-found",
  templateUrl: "./not-found.component.html",
  styleUrls: ["./not-found.component.css"],
})
export class NotFoundComponent implements OnInit {
  notFoundUrl = IMAGE_PATHS.NOT_FOUND_404;
  constructor() {}

  ngOnInit() {}
}
