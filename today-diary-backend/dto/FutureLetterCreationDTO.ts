import {IsString} from "class-validator";

class FutureLetterCreationDTO {

  @IsString()
  public author: string;

  @IsString()
  public fromDate: string;

  @IsString()
  public toDate: string;

  @IsString()
  public title: string;

  @IsString()
  public content: string;
}

export default FutureLetterCreationDTO
