import { ProfileUpdateI } from "../components/profile/ProfileUpdate";

export interface FC {
  children: React.ReactNode;
}

export interface UserAuthInterface {
  userId: string;
  isAdmin: boolean;
  userName: string;
  createdAt: string;
  message?: string;
  fetchUserAuthData?: (user: UserTokenI) => Promise<void>;
  handleLogout: () => Promise<void>;
  updateUserInfoHandler: (user: ProfileUpdateI) => Promise<void>;
}

export interface UserTokenI {
  userId: string;
  name: string;
  email: string;
  isAdmin: boolean;
  createdAt: string;
}

type LoadingStateI = {
  loading: boolean;
  error?: string;
};

type UpdateSuccessI = {
  loading: boolean;
  message: string;
};

export type Action =
  | { type: "FETCH_LOGIN_LOADING"; payload: Partial<LoadingStateI> }
  | { type: "FETCH_LOGIN_SUCCESS"; payload: UserTokenI }
  | { type: "USER_UPDATE_SUCCESS"; payload: UpdateSuccessI }
  | { type: "FETCH_LOGIN_FAILURE"; payload: LoadingStateI };
