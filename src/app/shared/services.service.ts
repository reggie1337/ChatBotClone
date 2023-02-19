import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ServicesService {
  constructor(private http: HttpClient) {}

  sendMessage(message: string) {
    return this.http.post('http://localhost:8080/message', { prompt: message });
  }
}
