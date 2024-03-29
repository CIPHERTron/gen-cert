export type SignupProps = {
  signup: (email: string, password: string) => void;
};

export type LoginProps = {
  login: (username: string, email: string, password: string) => void;
};

export interface ValueInterface {
  user: boolean;
  signup: SignupProps;
  login: LoginProps;
  logout: () => void;
  uid: string;
}
