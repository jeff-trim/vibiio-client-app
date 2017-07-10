import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';

// Models
import { VideoArchive } from '../../models/video-archive.interface';
import { VideoSnapshot } from '../../models/video-snapshot.interface';

@Component({
    selector: 'video-archive',
    templateUrl: 'video-archive.component.html',
    styleUrls: ['video-archive.component.scss']
})

export class VideoArchiveComponent implements OnInit {
    image_url: string;
    image_label: string;
    session_id: string;

    @Input()
    snapshot: VideoSnapshot;

    @Input()
    archive: VideoArchive;

    ngOnInit() {
        this.image_url = this.snapshot[0].image_url;
        this.image_label = this.snapshot[0].consumer_id;
        console.log(this.snapshot);
        this.session_id = this.snapshot[0].session_id;
    }
}
