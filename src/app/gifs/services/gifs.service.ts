import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SearchResponse } from '../interfaces/gifs.interfaces';


@Injectable({
  providedIn: 'root'
})
export class GifsService {
  private _tagsHistory:string[]=[];
  private GIPHY_API_KEY:string="NstP341VYgh5khxH6amTxUuujAAG3Zbk";
  private serviceURL:string='https://api.giphy.com/v1/gifs';
  constructor(private http:HttpClient) { }
  get tagsHistory(){
    return [...this._tagsHistory];
  }
  private organizeHistory(tag:string){
    tag=tag.toLowerCase();
    if(this._tagsHistory.includes(tag)){
      this._tagsHistory = this._tagsHistory.filter((oldTag)=>oldTag!==tag)
    }
    this._tagsHistory.unshift(tag)
    this._tagsHistory=this._tagsHistory.slice(0,10)
  }
  searchTag(tag:string):void{
    if(tag.length===0) return;
    this.organizeHistory(tag)
    const params=new HttpParams()
    .set('api_key',this.GIPHY_API_KEY)
    .set('limit','10')
    .set('q',tag);
    this.http.get<SearchResponse>(`${this.serviceURL}/search`,{params})
    .subscribe(resp=>{
      console.log(resp.data)
    })
  }

}
