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
import { Recruitment } from '../models';
import { RecruitmentRepository } from '../repositories';
import { authenticate } from '@loopback/authentication';
import { OrderRandom, PathStore } from '../helper';
import { unlinkSync } from 'fs';
import path from 'path';

@authenticate('jwt')
export class RecruitmentController {
  constructor(
    @repository(RecruitmentRepository)
    public recruitmentRepository: RecruitmentRepository,
  ) { }

  @post('/recruitments')
  @response(200, {
    description: 'Recruitment model instance',
    content: { 'application/json': { schema: getModelSchemaRef(Recruitment) } },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Recruitment, {
            title: 'NewRecruitment',
            exclude: ['Id'],
          }),
        },
      },
    })
    recruitment: Omit<Recruitment, 'Id'>,
  ): Promise<Recruitment> {
    return this.recruitmentRepository.create(recruitment);
  }

  @authenticate({ skip: true, strategy: 'jwt' })
  @get('/recruitments/count')
  @response(200, {
    description: 'Recruitment model count',
    content: { 'application/json': { schema: CountSchema } },
  })
  async count(
    @param.where(Recruitment) where?: Where<Recruitment>,
  ): Promise<Count> {
    return this.recruitmentRepository.count(where);
  }

  @authenticate({ skip: true, strategy: 'jwt' })
  @get('/recruitments')
  @response(200, {
    description: 'Array of Recruitment model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Recruitment, { includeRelations: true }),
        },
      },
    },
  })
  async find(
    @param.filter(Recruitment) filter?: Filter<Recruitment>,
  ): Promise<Recruitment[]> {
    return this.recruitmentRepository.find(filter);
  }

  @patch('/recruitments')
  @response(200, {
    description: 'Recruitment PATCH success count',
    content: { 'application/json': { schema: CountSchema } },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Recruitment, { partial: true }),
        },
      },
    })
    recruitment: Recruitment,
    @param.where(Recruitment) where?: Where<Recruitment>,
  ): Promise<Count> {
    return this.recruitmentRepository.updateAll(recruitment, where);
  }

  @authenticate({ skip: true, strategy: 'jwt' })
  @get('/recruitments/random')
  @response(200, {
    description: 'Array of random News model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Recruitment, { includeRelations: true }),
        },
      },
    },
  })

  async findRandomArray(
    @param.query.number('count') count: number, // Số lượng phần tử cần lấy
    @param.query.string('locale') locale: string, // Số lượng phần tử cần lấy
  ): Promise<Recruitment[]> {
    const totalRecords = await this.recruitmentRepository.count();

    if (totalRecords.count === 0 || count <= 0) {
      return []; // Không có dữ liệu hoặc count không hợp lệ
    }

    const n = Math.min(count, totalRecords.count); // Đảm bảo không lấy quá số lượng bản ghi thực tế

    // Sử dụng truy vấn thủ công (raw query) với PostgreSQL
    const query = `SELECT \`Id\` as "Id",\`Name\` as "Name",\`Tags\` as "Tags",\`KeyName\` as "KeyName",\`Key\` as "Key" FROM \`Recruitment\` WHERE \`IsActive\`= 1 and \`Locale\` = '${locale}' ${OrderRandom()} LIMIT ${n}`;

    // Gửi truy vấn đến cơ sở dữ liệu
    const randomNews = await this.recruitmentRepository.dataSource.execute(query);
    // const randomNews = await this.newsRepository.find({
    //   order: ["RANDOM()"],
    //   limit: n
    // });

    return randomNews;
  }

  @get('/recruitments/{id}')
  @response(200, {
    description: 'Recruitment model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Recruitment, { includeRelations: true }),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Recruitment, { exclude: 'where' }) filter?: FilterExcludingWhere<Recruitment>
  ): Promise<Recruitment> {
    return this.recruitmentRepository.findById(id, filter);
  }

  @patch('/recruitments/{id}')
  @response(204, {
    description: 'Recruitment PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Recruitment, { partial: true }),
        },
      },
    })
    recruitment: Recruitment,
  ): Promise<void> {
    await this.recruitmentRepository.updateById(id, recruitment);
  }

  @put('/recruitments/{id}')
  @response(204, {
    description: 'Recruitment PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() recruitment: Recruitment,
  ): Promise<void> {
    await this.recruitmentRepository.replaceById(id, recruitment);
  }

  @del('/recruitments/{id}')
  @response(204, {
    description: 'Recruitment DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    const data = await this.recruitmentRepository.findById(id);
    const listTemp = await this.recruitmentRepository.find({ where: { Key: data.Key } })
    await this.recruitmentRepository.deleteAll({ Key: data.Key });
    for (let item of listTemp) {
      try {
        unlinkSync(path.join(PathStore.Recruitment, item.ImageUrl))
      } catch (error) {
      }
    }
  }
}
