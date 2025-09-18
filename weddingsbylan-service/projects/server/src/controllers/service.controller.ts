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
import { Service } from '../models';
import { ServiceRepository } from '../repositories';
import { authenticate } from '@loopback/authentication';
import { unlinkSync } from 'fs';
import path from 'path';
import { convertToPascalCase, OrderRandom, PathStore } from '../helper';

@authenticate('jwt')
export class ServiceController {
  constructor(
    @repository(ServiceRepository)
    public serviceRepository: ServiceRepository,
  ) { }

  @post('/services')
  @response(200, {
    description: 'Service model instance',
    content: { 'application/json': { schema: getModelSchemaRef(Service) } },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Service, {
            title: 'NewService',
            exclude: ['Id'],
          }),
        },
      },
    })
    service: Omit<Service, 'Id'>,
  ): Promise<Service> {
    return this.serviceRepository.create(service);
  }

  @authenticate({ skip: true, strategy: 'jwt' })
  @get('/services/count')
  @response(200, {
    description: 'Service model count',
    content: { 'application/json': { schema: CountSchema } },
  })
  async count(
    @param.where(Service) where?: Where<Service>,
  ): Promise<Count> {
    return this.serviceRepository.count(where);
  }

  @authenticate({ skip: true, strategy: 'jwt' })
  @get('/services')
  @response(200, {
    description: 'Array of Service model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Service, { includeRelations: true }),
        },
      },
    },
  })
  async find(
    @param.filter(Service) filter?: Filter<Service>,
  ): Promise<Service[]> {
    return this.serviceRepository.find(filter);
  }

  @patch('/services')
  @response(200, {
    description: 'Service PATCH success count',
    content: { 'application/json': { schema: CountSchema } },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Service, { partial: true }),
        },
      },
    })
    service: Service,
    @param.where(Service) where?: Where<Service>,
  ): Promise<Count> {
    return this.serviceRepository.updateAll(service, where);
  }



  @authenticate({ skip: true, strategy: 'jwt' })
  @get('/services/random')
  @response(200, {
    description: 'Array of random News model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Service, { includeRelations: true }),
        },
      },
    },
  })

  async findRandomArray(
    @param.query.number('count') count: number, // Số lượng phần tử cần lấy
    @param.query.string('locale') locale: string, // Số lượng phần tử cần lấy
  ): Promise<Service[]> {
    const totalRecords = await this.serviceRepository.count();

    if (totalRecords.count === 0 || count <= 0) {
      return []; // Không có dữ liệu hoặc count không hợp lệ
    }

    const n = Math.min(count, totalRecords.count); // Đảm bảo không lấy quá số lượng bản ghi thực tế

    // Sử dụng truy vấn thủ công (raw query) với PostgreSQL
    const query = `SELECT \`Id\` as "Id",\`Locale\` as "Locale",\`Name\` as "Name",\`Tags\` as "Tags",\`KeyName\` as "KeyName",\`Key\` as "Key" FROM \`Service\` WHERE \`IsActive\`= 1 and \`Locale\` = '${locale}' ${OrderRandom()} LIMIT ${n}`;

    // Gửi truy vấn đến cơ sở dữ liệu
    const randomNews = await this.serviceRepository.dataSource.execute(query);
    // const randomNews = await this.newsRepository.find({
    //   order: ["RANDOM()"],
    //   limit: n
    // });

    return randomNews;
  }

  @get('/services/{id}')
  @response(200, {
    description: 'Service model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Service, { includeRelations: true }),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Service, { exclude: 'where' }) filter?: FilterExcludingWhere<Service>
  ): Promise<Service> {
    return this.serviceRepository.findById(id, filter);
  }

  @patch('/services/{id}')
  @response(204, {
    description: 'Service PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Service, { partial: true }),
        },
      },
    })
    service: Service,
  ): Promise<void> {
    await this.serviceRepository.updateById(id, service);
  }

  @put('/services/{id}')
  @response(204, {
    description: 'Service PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() service: Service,
  ): Promise<void> {
    await this.serviceRepository.replaceById(id, service);
  }

  @del('/services/{id}')
  @response(204, {
    description: 'Service DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    const data = await this.serviceRepository.findById(id);
    const listTemp = await this.serviceRepository.find({ where: { Key: data.Key } })
    await this.serviceRepository.deleteAll({ Key: data.Key });
    for (let item of listTemp) {
      try {
        unlinkSync(path.join(PathStore.Service, item.ImageUrl))
      } catch (error) {
      }
    }
  }
}
