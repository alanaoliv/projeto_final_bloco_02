import { Transform, TransformFnParams } from "class-transformer";
import { IsNotEmpty } from "class-validator";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";


@Entity({name: "tb_categorias"}) 
export class Categoria {

   
    @PrimaryGeneratedColumn() // INT AUTO_INCREMENT PRIMARY KEY
    id: number;

    @Transform(({ value }: TransformFnParams) => value?.trim())
    @IsNotEmpty() // Validação dos dados do objeto
    @Column({length: 255, nullable: false}) 
    descricao: string;

    //@OneToMany(() => Produto, (produto) => produto.categoria)
    //produto: Produto[];
}