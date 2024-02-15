export default interface UserSignUpErrorI {
  hasError: boolean;
  firstname?: string;
  lastname?: string;
  email?: string;
  password?: string;
  existingPassword?: string;
  username?: string;
}
