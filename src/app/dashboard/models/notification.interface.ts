export interface Notification {
    notification_type: string;
    content: {
        message_body: string;
        consumer_id?: number;
        vibiio_id?: number;
        appointment_id?: number;
        language?: string;
    };
}
