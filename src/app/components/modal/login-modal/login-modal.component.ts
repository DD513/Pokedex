import { Component, EventEmitter, OnInit, Output } from "@angular/core";
import { Router } from "@angular/router";
import { AuthService } from "../../../core/services/auth.service";

@Component({
  selector: "app-login-modal",
  templateUrl: "./login-modal.component.html",
  styleUrls: ["./login-modal.component.css"],
})
export class LoginModalComponent implements OnInit {
  @Output() close = new EventEmitter<void>();

  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit() {}

  closeModal() {
    this.close.emit();
  }

  onLoginSuccess() {
    this.closeModal();
  }
}
