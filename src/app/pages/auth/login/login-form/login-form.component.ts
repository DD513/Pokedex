import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

@Component({
  selector: "app-login-form",
  templateUrl: "./login-form.component.html",
  styleUrls: ["./login-form.component.css"],
})
export class LoginFormComponent implements OnInit {
  email: string = "";
  password: string = "";
  errorMessage: string = "";

  constructor(private router: Router) {}
  ngOnInit() {}

  onSubmitForm(event: Event) {
    event.preventDefault();

    if (this.email === "peter@example.com" && this.password === "password") {
      console.log("登入成功");
      this.router.navigate(["/pokedex"]);
    } else {
      this.errorMessage = "帳號或密碼錯誤，請重試";
    }
  }
}
