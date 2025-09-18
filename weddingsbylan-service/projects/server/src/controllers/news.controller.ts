import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
  response,
} from '@loopback/rest';
import { News } from '../models';
import { NewsRepository } from '../repositories';
import { authenticate } from '@loopback/authentication';
import { convertToPascalCase, OrderRandom, PathStore } from '../helper';
import { unlinkSync } from 'fs';
import path from 'path';

@authenticate('jwt')
export class NewsController {
  constructor(
    @repository(NewsRepository)
    public newsRepository: NewsRepository,
  ) { }

  @post('/news')
  @response(200, {
    description: 'News model instance',
    content: { 'application/json': { schema: getModelSchemaRef(News) } },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(News, {
            title: 'NewNews',
            exclude: ['Id'],
          }),
        },
      },
    })
    news: Omit<News, 'Id'>,
  ): Promise<News> {
    return this.newsRepository.create(news);
  }

  @authenticate({ skip: true, strategy: 'jwt' })
  @get('/news/count')
  @response(200, {
    description: 'News model count',
    content: { 'application/json': { schema: CountSchema } },
  })
  async count(
    @param.where(News) where?: Where<News>,
  ): Promise<Count> {
    return this.newsRepository.count(where);
  }

  @authenticate({ skip: true, strategy: 'jwt' })
  @get('/news/random')
  @response(200, {
    description: 'Array of random News model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(News, { includeRelations: true }),
        },
      },
    },
  })
  async findRandomArray(
    @param.query.number('count') count: number, // Số lượng phần tử cần lấy
    @param.query.string('locale') locale: string, // Số lượng phần tử cần lấy
  ): Promise<News[]> {
    const totalRecords = await this.newsRepository.count();

    if (totalRecords.count === 0 || count <= 0) {
      return []; // Không có dữ liệu hoặc count không hợp lệ
    }

    const n = Math.min(count, totalRecords.count); // Đảm bảo không lấy quá số lượng bản ghi thực tế

    // Sử dụng truy vấn thủ công (raw query) với PostgreSQL
    const query = `SELECT \`Id\` as "Id",\`Locale\` as "Locale",\`Name\` as "Name",\`Tags\` as "Tags",\`KeyName\` as "KeyName",\`Key\` as "Key" FROM \`News\` WHERE \`IsActive\`= 1 and \`Locale\` = '${locale}' ${OrderRandom()}  LIMIT ${n}`;

    // Gửi truy vấn đến cơ sở dữ liệu
    const randomNews = await this.newsRepository.dataSource.execute(query);
    // const randomNews = await this.newsRepository.find({
    //   order: ["RANDOM()"],
    //   limit: n
    // });

    return randomNews;
  }

  @authenticate({ skip: true, strategy: 'jwt' })
  @get('/news')
  @response(200, {
    description: 'Array of News model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(News, { includeRelations: true }),
        },
      },
    },
  })
  async find(
    @param.filter(News) filter?: Filter<News>,
  ): Promise<News[]> {
    return this.newsRepository.find(filter);
  }

  @patch('/news')
  @response(200, {
    description: 'News PATCH success count',
    content: { 'application/json': { schema: CountSchema } },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(News, { partial: true }),
        },
      },
    })
    news: News,
    @param.where(News) where?: Where<News>,
  ): Promise<Count> {
    return this.newsRepository.updateAll(news, where);
  }

  @get('/news/{id}')
  @response(200, {
    description: 'News model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(News, { includeRelations: true }),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(News, { exclude: 'where' }) filter?: FilterExcludingWhere<News>
  ): Promise<News> {
    return this.newsRepository.findById(id, filter);
  }

  @patch('/news/{id}')
  @response(204, {
    description: 'News PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(News, { partial: true }),
        },
      },
    })
    news: News,
  ): Promise<void> {
    await this.newsRepository.updateById(id, news);
  }

  @put('/news/{id}')
  @response(204, {
    description: 'News PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() news: News,
  ): Promise<void> {

    await this.newsRepository.replaceById(id, news);
  }

  @del('/news/{id}')
  @response(204, {
    description: 'News DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    const data = await this.newsRepository.findById(id);
    const listTemp = await this.newsRepository.find({ where: { Key: data.Key } })
    await this.newsRepository.deleteAll({ Key: data.Key });
    for (let item of listTemp) {
      try {
        unlinkSync(path.join(PathStore.News, item.ImageUrl))
      } catch (error) {
      }
    }
  }
}
