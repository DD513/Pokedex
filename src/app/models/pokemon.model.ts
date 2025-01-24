export interface PokemonType {
  Name: string; // 類型名稱，如 "草"、"火"
}

export interface Pokemon {
  Code: string; // 編號
  Category: string; // 類別
  ChineseName: string; // 中文名稱
  EnglishName: string; // 英文名稱
  Description: string; // 說明
  Img: string; // 圖片路徑
  Types: PokemonType[]; // 類型陣列
  Height: string; // 高度
  Weight: string; // 重量
}
