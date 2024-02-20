import { IsNotEmpty, IsString } from "class-validator";
//validation will not work because it will just be converted to normal object,
export class CreateTodoDto {
    @IsString()
    @IsNotEmpty()
    description:string
}
