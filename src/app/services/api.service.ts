import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "../../environments/environment";

@Injectable({
  providedIn: "root",
})
export class ApiService {
  private travelFood = environment.travelFoodUrl; // 從 environment 取得 API 路徑

  constructor(private http: HttpClient) {}

  getTravelFoodData(): Observable<any> {
    return this.http.get<any>(this.travelFood); // 呼叫 API
  }
}
