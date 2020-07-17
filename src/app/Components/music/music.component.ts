import { Component, OnInit, Input } from '@angular/core';
import { MusicService } from 'src/app/Services/music.service';
import { IResult } from 'src/app/Models/IResult';
import { AudioplayerService } from 'src/app/Services/audioplayer.service';
import { StreamState } from 'src/app/Models/StreamState';
import {CloudServiceService} from 'src/app/cloud-service.service'
import { IAlbum } from 'src/app/Models/IAlbum';
import { ITrack } from 'src/app/Models/ITrack';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
@Component({
  selector: 'app-music',
  templateUrl: './music.component.html',
  styleUrls: ['./music.component.css']
})
export class MusicComponent implements OnInit {

  @Input() searchBox = undefined;
  music:IResult[];
  files:IResult[];
  currentFile: any ={};
  count =0;
   SelectedAlbum:IAlbum;
   searchValue = false;
  private _flag=false;
  tracks:ITrack[];
  private _defaultSearch = 'NF'
  filesCount=0;
  state: StreamState;
  private _loadFirstItem= false;
  

  constructor(private musicService:MusicService,private audioService:AudioplayerService,cloudService: CloudServiceService) {
   }

   ngAfterContentChecked()
   {
    if(this._flag)
    {
      this.searchMusic(this.searchBox);
      this._flag = false;
    }

   }

  ngOnInit(): void {
    this.searchMusic(undefined);
    this.audioService.getState()
    .subscribe(state => {
      this.state = state;
    });
  
  }

  getAlbumId(albumId)
  {
     return this.musicService.getAlbumDetails(albumId).subscribe(
        (res:any)=>{
          this.SelectedAlbum = res;
          this.SelectedAlbum.tracks = res.tracks;
        }
     )
  }

  private setcurrent()
  {
    this.currentFile = {
      index:0,
      file:this.files[0]
    };
    this._loadFirstItem = true;
  }

  searchMusic(value)
  {
    this.searchBox = value;
    this._flag = true;
    this.searchBox==null || this.searchBox == undefined || this.searchBox ==''?
    this.searchArtistOrSong(this._defaultSearch):
    this.searchArtistOrSong(this.searchBox);
  }

  private searchArtistOrSong(value)
  {
    this.musicService.searchMusic(value).pipe(debounceTime(300),distinctUntilChanged()).subscribe((data:any)=>
    {
      this.files = data.data;
      this.filesCount = this.files.length; 
      if(!this._loadFirstItem)this.setcurrent();
    });
  }

  playStream(url) {
    this.audioService.playStream(url)
    .subscribe(events => {
    });
  }

  openFile(file, index) {
    this.count =0;
    this.currentFile = { index, file };
    this.audioService.stop();
    this.playStream(file.preview);
  }

  pause() {
    this.audioService.pause();
  }

  play() {
    this.audioService.play();
  }

  stop() {
    this.audioService.stop();
    this.count =0;
  }

  next() {
    const index = this.currentFile.index + 1;
    const file = this.files[index];
    this.openFile(file, index);
  }

  calculateProgressPercentage(duration,max):number
  {
    this.count=0;
    duration =+duration;
    max = +max;
    this.count = (duration /max)*100 ;
    return  this.count; 

  }

  previous() {
    const index = this.currentFile.index - 1;
    const file = this.files[index];
    this.openFile(file, index);
  }

  isFirstPlaying() {
    return this.currentFile.index === 0;
  }

  isLastPlaying() {
    if(this.currentFile!=undefined )
    return this.currentFile.index === this.files.length - 1;
  }

  onSliderChangeEnd(change) {
    this.audioService.seekTo(change.value);
  }
}
