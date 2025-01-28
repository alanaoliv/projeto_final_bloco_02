import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { DeleteResult, ILike, Repository } from "typeorm";
import { Produto } from "../entities/produto.entity";
import { Categoria } from "../../categoria/entities/categoria.entity";
import { CategoriaService } from "../../categoria/services/categoria.service";


@Injectable()
export class ProdutoService{

    constructor(
        @InjectRepository(Produto)
        private produtoRepository: Repository<Produto>,
        private categoriaService: CategoriaService
    ){}

    async findAll(): Promise<Produto[]>{
        return this.produtoRepository.find({
            relations: {
                categoria: true
            }
        });
    }

    async findById(id: number): Promise<Produto>{
        
        const produto = await this.produtoRepository.findOne({
            where: {
                id
            },
            relations: {
                categoria: true
            }
        })

        if(!produto)
            throw new HttpException('Produto não encontrado!', HttpStatus.NOT_FOUND)
        
        return produto;
    }

    async findByNome(nome: string): Promise<Produto[]>{
        return this.produtoRepository.find({
            where: {
                nome: ILike(`%${nome}%`)
            },
            relations: {
                categoria: true
            }
        }); 
    }

    async create(produto: Produto): Promise<Produto>{

        if (!produto.categoria || !produto.categoria.id) {
            throw new HttpException('Categoria inválida ou ausente!', HttpStatus.BAD_REQUEST);
        }

        await this.categoriaService.findById(produto.categoria.id)

        return await this.produtoRepository.save(produto);
    }

    async update(produto: Produto): Promise<Produto>{
        
        if (!produto.id) {
            throw new HttpException('ID do produto inválido ou ausente!', HttpStatus.BAD_REQUEST);
        }
        await this.findById(produto.id)

        if (!produto.categoria || !produto.categoria.id) {
            throw new HttpException('Categoria inválida ou ausente!', HttpStatus.BAD_REQUEST);
        }    

        await this.categoriaService.findById(produto.categoria.id)

        return await this.produtoRepository.save(produto);
    }

    async delete(id: number): Promise<DeleteResult>{
        await this.findById(id)

        return await this.produtoRepository.delete(id)
    }

}