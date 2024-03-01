import { IsNumber } from 'class-validator';

export class RechargeCreditDto {
  @IsNumber()
  idRgecharger: number;
  
  @IsNumber()
  idUser: number;

  @IsNumber()
  idCompany: number;

  @IsNumber()
  mount: number;
}
