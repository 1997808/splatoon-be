export class CreateUserDto {
  username: string;
  email: string;
  password: string;
  fullName?: string;
  birthdate?: Date;
  avatarUrl?: string;
  timezone: string;
  languagePreference: string;
}
