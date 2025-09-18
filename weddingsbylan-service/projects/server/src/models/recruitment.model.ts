import { Entity, model, property } from '@loopback/repository';

@model()
export class Recruitment extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  Id?: number;

  @property({
    type: 'string',
    required: true,
  })
  Name: string;

  @property({
    type: 'string',
    required: true,
    mysql: {
      dataType: 'text',
    },
  })
  Tags: string;

  @property({
    type: 'string',
    required: true,
    mysql: {
      dataType: 'text',
    },
  })
  Description: string;
  @property({
    type: 'string',
    required: true,
  })
  ImageUrl: string;
  @property({
    type: 'string',
    required: true,
    length: 0, // Setting length to 0 allows unlimited length
    jsonSchema: {
      minLength: 1,
    },
    postgresql: {
      dataType: 'text',
    },
    mysql: {
      dataType: 'text',
    },
  })
  Content: string;
  @property({
    type: 'boolean',
    required: true,
    mysql: {
      default: true
    }
  })
  IsActive: boolean;
  @property({
    type: 'string',
    // required: true,
    length: 0, // Setting length to 0 allows unlimited length
    jsonSchema: {
      minLength: 1,
    },
  })
  Key: string;
  @property({
    type: 'string',
    // required: true,
    length: 0, // Setting length to 0 allows unlimited length
    jsonSchema: {
      minLength: 1,
    },
  })
  KeyName: string;
  @property({
    type: 'string',
    // required: true,
    length: 0, // Setting length to 0 allows unlimited length
    jsonSchema: {
      minLength: 1,
    },
    default: 'vn'
  })
  Locale: string;
  @property({
    type: 'date',
    defaultFn: 'now',
  })
  dateCreated: Date;
  constructor(data?: Partial<Recruitment>) {
    super(data);
  }
}

export interface RecruitmentRelations {
  // describe navigational properties here
}

export type RecruitmentWithRelations = Recruitment & RecruitmentRelations;
