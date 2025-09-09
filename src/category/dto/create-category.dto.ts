import { IsEnum, IsNotEmpty, IsOptional } from "class-validator";
import { CategoryStatus } from "./category-status.enum";

export class CreateCategoryDto {

  @IsNotEmpty()
  name: string

  @IsEnum(CategoryStatus)
  @IsOptional()
  status?: CategoryStatus = CategoryStatus.ACTIVE;
}
