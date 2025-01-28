import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Produto } from './entities/produto.entity';
import { ProdutoController } from './controllers/produto.controller';
import { ProdutoService } from './services/produto.service';
import { CategoriaService } from '../categoria/services/categoria.service';
import { Categoria } from '../categoria/entities/categoria.entity';
import { CategoriaModule } from '../categoria/categoria.module';

@Module({
    imports: [TypeOrmModule.forFeature([Produto]), CategoriaModule],
    controllers: [ProdutoController],
    providers: [ProdutoService, CategoriaService],
    exports: [TypeOrmModule],
})
export class ProdutoModule {}