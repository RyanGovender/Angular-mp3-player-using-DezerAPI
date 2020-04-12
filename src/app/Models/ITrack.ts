import { IArtist } from './IArtist';

export interface ITrack{
    id: number;
    title: string;
    link: string;
    duration: number;
    track_position: string;
    preview: string;
    artist:IArtist;
}