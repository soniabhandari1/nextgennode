import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  url = environment.apiUrl;
  constructor(private httpClient: HttpClient) {}

  add(data: any) {
    return this.httpClient.post(this.url + '/category/add', data);
  }

  update(data:any){
    return this.httpClient.patch(this.url+'/category/update',data);
  }

  getCategorys(){
    return this.httpClient.get(this.url+'/category/get/')
  }
}
