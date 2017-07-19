import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';

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

export class VideoArchiveComponent implements OnInit {
    image_url: string;
    archive_number: number;
    session_id: string;
    video_url: string;
    showVideo = false;
    showArchive = true;

    @Input()
    snapshot: VideoSnapshot;

    @Input()
    archive: VideoArchive;

    constructor(private archiveService: VideoArchiveService) {}

    ngOnInit() {
        this.image_url = this.snapshot[0].image_url;
        this.archive_number = this.snapshot[0].consumer_id;
        this.session_id = this.snapshot[0].session_id;
    }

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

