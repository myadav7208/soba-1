import {
  IsEmail,
  IsNotEmpty,
  IsNumberString,
  IsOptional,
  IsString,
} from 'class-validator';

export class createVendorDto {

  @IsString()
  @IsNotEmpty()
  ownerName: string;

  @IsString()
  @IsNotEmpty()
  companyName: string;

  @IsNumberString()
  @IsNotEmpty()
  contact: string;

  @IsString()
  @IsOptional()
  gst: string;

  @IsString()
  @IsOptional()
  address: string;

  @IsOptional()
  @IsEmail()
  email: string;

  @IsString()
  @IsOptional()
  pinCode: string;

  @IsString()
  @IsOptional()
  state: string;

  @IsString()
  @IsOptional()
  city: string;
}
