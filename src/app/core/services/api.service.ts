import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "../../../environments/environment";
import { API_ROUTES } from "../constants/api-route";
import { TravelFood } from "../models/travel-food.model";

@Injectable({
  providedIn: "root",
})
export class ApiService {
  private travelFoodUrl = `${environment.travelFoodUrl}${API_ROUTES.TRAVEL_FOOD}`; // 從 environment 取得 API 路徑

  constructor(private http: HttpClient) {}

  getTravelFoodData(): Observable<TravelFood[]> {
    return this.http.get<TravelFood[]>(this.travelFoodUrl); // 呼叫 API
  }
}
