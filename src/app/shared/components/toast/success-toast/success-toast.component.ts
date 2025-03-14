import { Component, OnInit, Input } from "@angular/core";
import { IMAGE_PATHS } from "../../../../core/constants/image-paths";

@Component({
  selector: "app-success-toast",
  templateUrl: "./success-toast.component.html",
  styleUrls: ["./success-toast.component.css"],
})
export class SuccessToastComponent implements OnInit {
  @Input() message: string = "Success!!";
  @Input() duration: number = 3000;

  showToast = false;

  successIcon = IMAGE_PATHS.SUCCESS_TOAST_ICON;

  constructor() {}

  ngOnInit() {}

  showToastMessage(newMessage: string) {
    this.message = newMessage;
    this.showToast = true;

    setTimeout(() => {
      this.showToast = false;
    }, this.duration);
  }
}
