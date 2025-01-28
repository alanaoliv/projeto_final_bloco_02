import { Transform, TransformFnParams } from "class-transformer";
import { IsNotEmpty } from "class-validator";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Categoria } from "../../categoria/entities/categoria.entity";

@Entity({name: "tb_produtos"}) 
export class Produto {

   
    @PrimaryGeneratedColumn() // INT AUTO_INCREMENT PRIMARY KEY
    id: number;

    @Transform(({ value }: TransformFnParams) => value?.trim())
    @IsNotEmpty() // Validação dos dados do objeto
    @Column({length: 255, nullable: false}) 
    nome: string;

    @Transform(({ value }: TransformFnParams) => value?.trim())
    @IsNotEmpty() // Validação dos dados do objeto
    @Column({length: 1000, nullable: true}) 
    descricao: string;
	
    
    @IsNotEmpty()
    @Column({type:"decimal", precision: 8, scale: 2, nullable: false})
    preco: number;

    @Column({ length: 5000})
    foto: string;


    @ManyToOne(() => Categoria, (categoria) => categoria.produto, {
        onDelete: "CASCADE"
    })
    
    categoria: Categoria;

}