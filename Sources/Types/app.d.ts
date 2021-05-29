import {RowDropDown} from '@Components/DropDown/DropDown.props';
import {Platform} from 'react-native';

export interface IConstants {}

export interface IApiError {
  code: number;
  message: string;
  detail: string;
}

export type ILang = 'vi' | 'en' | undefined;

export interface IAppPersistInfo {
  token: string;
  theme: ThemeType;
  isFirstTime: boolean;
}
export interface IUser {
  id: string;
  created_at: number;
  updated_at: number;
  deleted_at: number;
  first_name: string;
  last_name: string;
  name: string;
  birthday: string;
  phone: string;
  email: string;
  avatar: string;
  timezone: string;
  role: IRole;
  is_first_login: boolean;
  is_manager: boolean;
  last_login: number;
  coordinate?: ICoordinate;
  measurement_id: string;
  measurement?: IMeasurement;
  dress_size: string;
  language: ILang;
  distance_setting: number;
  is_delist_dresses: boolean;
  permissions?: IPermission[];
  currency?: string;
  country_code?: string;
  app_version: string;
  expo_version: string;
  referral_link?: string;
  // credits?: IUserCreditInfo;
  remaining_credits: number;
  overdue_balance?: string;
  is_defaulting?: boolean;
  is_inactive?: boolean;
}

export interface ILoginResponse {
  user: IUser;
  token: string;
}
export type IPagination<T> = {
  has_next: boolean;
  has_prev: boolean;
  per_page: number;
  next_page: number;
  current_page: number;
  prev_page: number;
  offset: number;
  records: T[];
  total_record: number;
  total_page: number;
  metadata?: any;
};

export interface ILoginPhoneForm {
  phone: string;
}

export interface IVerifyOTPForm {
  phone: string;
  otp_code: string;
  app_version?: string;
}

export interface IVerifyOTPEmailForm {
  email: string;
  otp_code: string;
  timezone?: string;
  app_version?: string;
}

export interface IPaginationQuery {
  page: number;
  limit: number;
  keyword?: string;
}

export interface IGetLikedQuery extends IPaginationQuery {
  id: string;
}

export interface ITrackUserForm {
  app_version?: string;
  expo_version?: string;
  currency?: string;
  country_code?: string;
  timezone?: string;
}

export interface IAddDeviceForm {
  token: string;
  platform: typeof Platform.OS;
}

export interface IUpdateAvatarForm extends Partial<Blob> {
  type: string;
  uri: string;
}

export interface IUploadChatImageForm extends Blob {
  type: string;
  uri: string;
  chatRoomID: string;
}

export interface IS3Signature {
  key: string;
  url: string;
  policy: string;
  'x-amz-credential': string;
  'x-amz-algorithm': string;
  'x-amz-signature': string;
  'x-amz-date': string;
  acl: string;
  'content-type': string;
}

interface ICoordinate {
  id: string;
  created_at?: number;
  updated_at?: number;
  google_place_id?: string;
  lat?: number;
  lng?: number;
  formatted_address: string;
  city?: string;
  country?: string;
  country_code?: string;
  postal_code?: string;
  county?: string;
  district?: string;
  street?: string;
  number?: string;
  neighborhood?: string;
  state?: string;
  types?: string;
}

interface IResendOTPResponse {
  message: string;
  next_in_seconds: int;
}

interface IChatUser {
  id: string;
  name?: string;
  avatar?: string;
}

type IChatMessageWSType = 'chat_send_message';

interface IChatMessageWS {
  message_id?: string;
  matching_id?: string;

  from_user: IChatUser;

  to_user: IChatUser;

  type: IChatMessageWSType;
  created_at: number;
  content: string;

  attachment?: {
    type: string;
    value: string;
  };

  swop_id?: string;

  other_swop_id?: string;
}

interface IChatMessagePagination {
  id: string;
  last_timestamp: number;
  limit: number;
}

interface IChatUser {
  id: string;
  name: string;
  avatar: string;
}

interface IChatMessage {
  id: string;
  created_at: number;
  updated_at: number;
  deleted_at: IDeletedAt;

  owner_id: string;
  owner: IChatUser;

  other_user_id: string;
  other_user: IChatUser;

  matching_id: string;

  message: string;

  attachment?: {
    type: string;
    value: string;
  };
}

interface IRecords<T> {
  records: Array<T>;
}

interface IAppBadgeCounts {
  chatCounts: IChatCounts;
}

type IChatCounts = {[key: string]: number};

interface IChatNotificationData {
  matching_id: string;
  message_id: string;
  type: string;
}
