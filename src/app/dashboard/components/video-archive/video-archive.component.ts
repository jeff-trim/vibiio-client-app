import { Component, Input, Output, EventEmitter } from '@angular/core';

// Models
import { VideoArchive } from '../../models/video-archive.interface';
import { VideoSnapshot } from '../../models/video-snapshot.interface';

// Services
import { VideoArchiveService } from '../../services/video-archive.service';

@Component({
    selector: 'video-archive',
    templateUrl: 'video-archive.component.html',
    styleUrls: ['video-archive.component.scss']
})

export class VideoArchiveComponent {
    image_url: string;
    archive_number: number;
    session_id: string;
    video_url: string;
    showVideo = false;
    showArchive = true;

    snapshot?: VideoSnapshot;

    @Input()
    snapshots: VideoSnapshot[];

    @Input()
    archive: VideoArchive;

    constructor(private archiveService: VideoArchiveService) {}

    playArchive(session: string) {
        this.toggleVideo();
        // this.archiveService.getArchive(session).subscribe( (data) => {
            this.video_url = 'https://media.w3.org/2010/05/sintel/trailer.mp4';
        // });
    }

    toggleVideo() {
        this.showVideo = !this.showVideo;
        this.showArchive = !this.showArchive;
    }
}

