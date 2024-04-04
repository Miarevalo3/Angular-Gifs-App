import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Gif, SearchResponse } from '../interfaces/gifs.interfaces';

@Injectable({providedIn: 'root'})
export class GifsService {

  public gifList: Gif[]=[]

  private _tagsHistory: string[]=[];
  private apiKey: string = 'gf3Byw2B4OQuSE4nAa0WxE1nPu7dN6tZ'
  private serviceUrl: string ='https://api.giphy.com/v1/gifs/search'

  constructor( private http: HttpClient) {
    this.LoadLocalStorage()
  }

  get tagsHistory(){
    return [...this._tagsHistory]

  }

  private organizeHistory(tag:string){

    tag=tag.toLowerCase()

    if(this._tagsHistory.includes(tag)){
      this._tagsHistory = this._tagsHistory.filter((oldTag)=>oldTag !== tag)
    }

    this._tagsHistory.unshift(tag)
    this._tagsHistory = this._tagsHistory.splice(0,10)
    this.SaveLocalStorage()
  }

  private SaveLocalStorage():void{
    localStorage.setItem('History',JSON.stringify(this._tagsHistory))
  }

  private LoadLocalStorage():void{
    if(!localStorage.getItem('History'))return

    this._tagsHistory = JSON.parse(localStorage.getItem('History')!)
    if (this._tagsHistory.length === 0) return
    this.searchTag(this._tagsHistory[0])
  }

  searchTag(tag:string):void{

    const params = new HttpParams()
      .set('api_key',this.apiKey)
      .set('limit', 10)
      .set('q',tag)


    if(tag.length===0) return
    if(tag.length===1&&(tag===' '))return
    this.organizeHistory(tag)

    this.http.get<SearchResponse>(`${this.serviceUrl}`,{params})
    .subscribe(resp =>{

      this.gifList = resp.data

      console.log({gifs:this.gifList})
    })
  }
}
