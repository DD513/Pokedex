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
  private pokemonDictionaryList = `${environment.pokemon}${API_ROUTES.POKEMON_DICTIONARY.POKEMON_DICTIONARY_LIST}`;

  constructor(private http: HttpClient) {}

  // 獲取旅遊美食資料
  getTravelFoodData(): Observable<TravelFood[]> {
    return this.http.get<TravelFood[]>(this.travelFoodUrl); // 呼叫 API
  }

  // Pokemon API
  /** 取得寶可夢字典列表 */
  getPokemonUrlList(
    limit: number = 10
  ): Observable<PokemonDictionaryUrlResponse> {
    return this.http.get<PokemonDictionaryUrlResponse>(
      `${this.pokemonDictionaryList}/?limit=${limit}`
    );
  }

  // 取得寶可夢詳細資訊 (species, sprites)
  getPokemonSpeciesAndSprites(
    pokemonDictionaryResultList: PokemonDictionaryEntry[]
  ): Observable<PokemonDictionaryEntry[]> {
    const requests = pokemonDictionaryResultList.map((pokemon) =>
      this.http.get<any>(pokemon.url).pipe(
        map((data) => ({
          ...pokemon,
          speciesName: data.species.name, // 物種名稱URL
          speciesUrl: data.species.url, // 物種 API URL
          imageUrl: data.sprites.front_default, // 寶可夢圖片
        }))
      )
    );

    return forkJoin(requests); // 同時發送多個請求並合併回應，等待所有請求完成後再回傳
  }

  // 取得寶可夢的多語言分類名稱
  getPokemonNames(
    pokemonDictionaryList: PokemonDictionaryEntry[]
  ): Observable<PokemonDictionaryEntry[]> {
    const namesRequests = pokemonDictionaryList.map((pokemon) =>
      this.http.get<any>(pokemon.speciesUrl).pipe(
        map((response) => {
          const namesList = response.names;
          return {
            ...pokemon,
            names: {
              englishName: this.extractGenus(namesList, "en"),
              japaneseName: this.extractGenus(namesList, "ja"),
              koreanName: this.extractGenus(namesList, "ko"),
              traditionalChineseName: this.extractGenus(namesList, "zh-Hant"),
              simplifiedChineseName: this.extractGenus(namesList, "zh-Hans"),
            },
          };
        })
      )
    );

    return forkJoin(namesRequests);
  }

  // 提取指定語言的分類名稱
  private extractGenus(namesList: any[], languageCode: string): string {
    const namesObj = namesList.find((g) => g.language.name === languageCode);
    return namesObj ? namesObj.name : "undefined"; // 若找不到則返回 "undefined"
  }
}
