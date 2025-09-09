import { IsNotEmpty, IsUUID } from "class-validator";

export class CreateCommentDto {
  @IsNotEmpty()
  @IsUUID()
  articleId: string

  @IsNotEmpty()
  @IsUUID()
  userId: string

  @IsNotEmpty()
  content: string
}
