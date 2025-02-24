// 只定義 API 資料格式，選 interface
// 需要操作、處理資料、設定預設值，選 class

export class TravelFood {
  ID: string;
  Name: string;
  Address: string;
  Tel: string;
  HostWords?: string;
  Price?: string;
  OpenHours?: string;
  CreditCard?: boolean;
  TravelCard?: boolean;
  TrafficGuidelines?: string;
  ParkingLot?: string;
  Url?: string;
  Email?: string;
  PetNotice?: string;
  Reminder?: string;
  FoodMonths?: string;
  FoodCapacity?: string;
  FoodFeature?: string;
  City: string;
  Town: string;
  PicURL?: string;
  Latitude: number;
  Longitude: number;
  BlogUrl?: string;

  // Partial代表可以非必填
  constructor(data: Partial<TravelFood>) {
    this.ID = data.ID || "";
    this.Name = data.Name || "未提供";
    this.Address = data.Address || "未提供";
    this.Tel = data.Tel || "未提供";
    this.HostWords = data.HostWords || "未提供";
    this.Price = data.Price || "未提供";
    this.OpenHours = data.OpenHours || "未提供開放時間";
    this.CreditCard = String(data.CreditCard).toLowerCase() === "true"; // 轉換成 boolean
    this.TravelCard = String(data.TravelCard).toLowerCase() === "true"; // 轉換成 boolean
    this.TrafficGuidelines = data.TrafficGuidelines || "";
    this.ParkingLot = data.ParkingLot || "未提供";
    this.Url = data.Url || "";
    this.Email = data.Email || "未提供";
    this.PetNotice = data.PetNotice || "未提供";
    this.Reminder = data.Reminder || "未提供";
    this.FoodMonths = data.FoodMonths || "";
    this.FoodCapacity = data.FoodCapacity || "";
    this.FoodFeature = data.FoodFeature || "";
    this.City = data.City || "";
    this.Town = data.Town || "";
    this.PicURL = data.PicURL || "";
    this.Latitude = parseFloat(String(data.Latitude)) || 0; // 轉換成 number
    this.Longitude = parseFloat(String(data.Longitude)) || 0;
    this.BlogUrl = data.BlogUrl || "";
  }
}
