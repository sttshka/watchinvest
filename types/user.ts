export type TUser = {
  id: number;
  en: boolean;
  login: string;
  email: string;
  user_type: string;
  first_name: string;
  last_name: string;
  balance: number;
  contact: [];
  avatar?: {
    filepath: string;
    id: number;
    url: string;
    en: boolean;
    ctime: string;
    dtime: string;
  };
};
