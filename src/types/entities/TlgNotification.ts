export interface TlgNotification {
  id: number;
  executeTimestamp: Date;
  todo: number;
  message?: string;
  recipient_id: number; //user_identifier from telegramm
}
