export interface VideoSnapshot {
    snapshots: [{
        image_url: string;
        consumer_id: number;
        session_id: string;
    }];
}
