import { IsNotEmpty, IsNumber, Min } from 'class-validator';

export class CreateServiceDto {
    @IsNotEmpty({ message: 'O nome do serviço é obrigatório' })
    name: string;

    @IsNumber()
    @Min(1, { message: 'A duração deve ser pelo menos 1 minuto' })
    duration: number;

    @IsNumber()
    @Min(0, { message: 'O preço deve ser pelo menos 0' })
    price: number;
}
