import { IAlbum } from './IAlbum';
import { IArtist } from './IArtist';
import { ITrack } from './ITrack';

export interface IResult{
  album: IAlbum;
  artist: IArtist;
  tracks: ITrack;
  duration: number;
  id: number;
  title: string;
}