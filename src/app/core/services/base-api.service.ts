import { Injectable } from "@angular/core";
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
} from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";

@Injectable({
  providedIn: "root",
})
// abstract 指的是抽象類別，不能直接被new，只能被繼承
export abstract class BaseApiService {
  protected headers = new HttpHeaders({ "Content-Type": "application/json" });

  constructor(protected http: HttpClient) {}

  // GET 請求
  // <T> 代表 回傳類型由呼叫者決定。例如，this.get<Pokemon[]>(url) 就表示回傳 Pokemon[]。
  protected get<T>(url: string): Observable<T> {
    return this.http
      .get<T>(url, { headers: this.headers })
      .pipe(catchError(this.handleError));
  }

  // POST 請求
  protected post<T>(url: string, body: any): Observable<T> {
    return this.http
      .post<T>(url, body, { headers: this.headers })
      .pipe(catchError(this.handleError));
  }

  // PUT 請求
  protected put<T>(url: string, body: any): Observable<T> {
    return this.http
      .put<T>(url, body, { headers: this.headers })
      .pipe(catchError(this.handleError));
  }

  // DELETE 請求
  protected delete<T>(url: string): Observable<T> {
    return this.http
      .delete<T>(url, { headers: this.headers })
      .pipe(catchError(this.handleError));
  }

  // 錯誤處理
  private handleError(error: HttpErrorResponse) {
    console.error("API 錯誤發生: ", error);
    return throwError(
      () => new Error(error.message || "伺服器錯誤，請稍後再試")
    );
  }
}
