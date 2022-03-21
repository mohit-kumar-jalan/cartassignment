import { IsNotEmpty } from 'class-validator';

export class logoutDTO {
  @IsNotEmpty()

  accessToken: string;
}
