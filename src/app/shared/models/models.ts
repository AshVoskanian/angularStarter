import { ErrorMessageType, IconType } from "../enums/enums";

export class NotificationMessageModel {
  type: ErrorMessageType;
  message: string;
  icon: IconType;
  translate?: boolean;
  time?: number;
}

export class PasswordValidationModel {
  upperCase: boolean;
  lowerCase: boolean;
  length: boolean;
  number: boolean;
}
