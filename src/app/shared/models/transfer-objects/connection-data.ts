import { VideoChatToken } from '../../../dashboard/models/video-chat-token.interface';

export interface ConnectionData {
    session_id: string;
    token_data: VideoChatToken;
    consumer: string;
    vibiiographer: string;
}
