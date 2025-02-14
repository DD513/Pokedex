import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "../../../environments/environment";
import { API_ROUTES } from "../constants/api-route";

@Injectable({
  providedIn: "root",
})
export class ApiService {
  private travelFood = `${environment.travelFoodUrl}${API_ROUTES.TRAVEL_FOOD}`; // 從 environment 取得 API 路徑

  constructor(private http: HttpClient) {}

  getTravelFoodData(): Observable<any> {
    console.log(this.travelFood);
    return this.http.get<any>(this.travelFood); // 呼叫 API
  }
}
