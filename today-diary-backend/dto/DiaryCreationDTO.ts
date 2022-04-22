import {IsBoolean, IsString} from "class-validator";

class DiaryCreationDTO {

  @IsString()
  public author: string;

  @IsString()
  public date: string;

  @IsString()
  public content: string;

  @IsString()
  public mood: string;

  @IsBoolean()
  public isPublic: boolean;
}

export default DiaryCreationDTO
