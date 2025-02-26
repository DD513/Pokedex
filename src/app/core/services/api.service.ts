import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, forkJoin } from "rxjs";
import { map } from "rxjs/operators";

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
export class ApiService {
  private travelFoodUrl = `${environment.travelFoodUrl}${API_ROUTES.TRAVEL_FOOD}`; // 從 environment 取得 API 路徑
  private pokemonDictionary = `${environment.pokemon}${API_ROUTES.POKEMON_DICTIONARY.POKEMON_DICTIONARY_LIST}`;

  constructor(private http: HttpClient) {}

  // 獲取旅遊美食資料
  getTravelFoodData(): Observable<TravelFood[]> {
    return this.http.get<TravelFood[]>(this.travelFoodUrl); // 呼叫 API
  }

  // Pokemon Dictionary API
  /** 取得寶可夢 URL 列表 */
  getPokemonUrlList(
    limit: number = 10
  ): Observable<PokemonDictionaryUrlResponse> {
    return this.http.get<PokemonDictionaryUrlResponse>(
      `${this.pokemonDictionary}/?limit=${limit}`
    );
  }

  /** 取得寶可夢詳細資訊 (species, sprites) */
  getPokemonDetails(pokemonUrl: string): Observable<any> {
    return this.http.get<any>(pokemonUrl);
  }

  /** 取得寶可夢的物種資訊（包含多語言名稱） */
  getPokemonSpeciesDetails(speciesUrl: string): Observable<any> {
    return this.http.get<any>(speciesUrl);
  }
}
