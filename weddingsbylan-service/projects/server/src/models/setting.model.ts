import { Entity, model, property } from '@loopback/repository';

@model()
export class Setting extends Entity {
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
  Type: string;
  @property({
    type: 'string',
    required: true,
  })
  Area: string;
  @property({
    type: 'string',
  })
  Title: string;
  @property({
    type: 'string',
    postgresql: {
      dataType: 'text',
    },
    mysql: {
      dataType: 'text',
    },
  })
  Content: string;
  @property({
    type: 'string',
  })
  Description: string;
  @property({
    type: 'string',
  })
  ImageUrl: string;
  @property({
    type: 'string',
  })
  Href: string;
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
  constructor(data?: Partial<Setting>) {
    super(data);
  }
}

export interface SettingRelations {
  // describe navigational properties here
}

export type SettingWithRelations = Setting & SettingRelations;
