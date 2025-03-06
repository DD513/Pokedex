import { Injectable, Inject } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { BaseApiService } from "./base-api.service";

import { environment } from "../../../environments/environment";
import { API_ROUTES } from "../constants/api-route";
import { TravelFood } from "../models/travel-food.model";
import {
  PokemonDictionaryUrlResponse,
  PokemonDictionaryEntry,
} from "../models/pokemon-dictionary.model";

@Injectable({
  providedIn: "root",
})
export class ApiService extends BaseApiService {
  private travelFoodUrl = `${environment.travelFoodUrl}${API_ROUTES.TRAVEL_FOOD}`; // 從 environment 取得 API 路徑
  private pokemonDictionary = `${environment.pokemon}${API_ROUTES.POKEMON_DICTIONARY.POKEMON_DICTIONARY_LIST}`;

  constructor(protected http: HttpClient) {
    super(http); //  傳遞 HttpClient 給 BaseApiService
  }

  // 獲取旅遊美食資料
  getTravelFoodData(): Observable<TravelFood[]> {
    return this.http.get<TravelFood[]>(this.travelFoodUrl); // 呼叫 API
  }

  // Pokemon Dictionary API
  // 取得寶可夢 URL 列表
  getPokemonUrlList(
    offset: number,
    limit: number
  ): Observable<PokemonDictionaryUrlResponse> {
    return this.get<PokemonDictionaryUrlResponse>(
      `${this.pokemonDictionary}/?offset=${offset}&limit=${limit}`
    );
  }

  // 取得寶可夢詳細資訊 (species, sprites)
  getPokemonDetails(pokemonUrl: string): Observable<any> {
    return this.get<any>(pokemonUrl);
  }

  // 取得寶可夢的物種資訊（包含多語言名稱）
  getPokemonSpeciesDetails(speciesUrl: string): Observable<any> {
    return this.get<any>(speciesUrl);
  }
}
