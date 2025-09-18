// Uncomment these imports to begin using these cool features!
import multer from 'multer';
import { inject } from "@loopback/core";
import { HttpErrors, post, Request, requestBody, Response, RestBindings } from "@loopback/rest";
import { promisify } from 'util';
import { authenticate } from '@loopback/authentication';
import { PathStore, ImagePath, ConvertTitleToAscii } from '../helper';

// import {inject} from '@loopback/core';
function getFileNameWithoutExt(filename: string) {
  return filename.split('.').slice(0, -1).join('.');
}
function getFileExtension(filename: string) {
  const temp = filename.split('.').pop();
  return temp ? "." + temp : ""
}

class StoreLocal {
  /**
   *
   */
  constructor(path: string, field?: string) {
    this.storage = multer.diskStorage({
      destination: (req, file, cb) => {
        cb(null, path); // Directory where files will be stored
      },
      filename: (req, file, cb) => {
        const filename = Buffer.from(file.originalname, 'latin1').toString(
          'utf8',
        );
        cb(null, `${Date.now()}-${ConvertTitleToAscii(getFileNameWithoutExt(filename))}${getFileExtension(filename)}`); // Set file name
      },
    });
    this.upload = multer({ storage: this.storage });
    this.uploadFileHandler = promisify(
      this.upload.single(field ?? 'file') // 'file' is the key used in the form-data
    );
  }
  public readonly storage: multer.StorageEngine

  // Create a multer instance with the storage configuration
  public readonly upload: multer.Multer

  // Promisify the file upload handler to use it with async/await
  public readonly uploadFileHandler: ReturnType<typeof promisify>

}
@authenticate('jwt')
export class UploadController {
  StoreSetting: StoreLocal = new StoreLocal(PathStore.Setting);
  StoreNews: StoreLocal = new StoreLocal(PathStore.News);
  StoreCkeditor: StoreLocal = new StoreLocal(PathStore.Ckeditor, "upload");
  StoreServices: StoreLocal = new StoreLocal(PathStore.Service);
  StoreRecruitments: StoreLocal = new StoreLocal(PathStore.Recruitment);
  // File upload route definition
  @post('upload/setting-image', {
    responses: {
      200: {
        description: 'File uploaded successfully',
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                message: { type: 'string' },
                filename: { type: 'string' },
              },
            },
          },
        },
      },
    },
  })
  async uploadImage(
    @requestBody({
      description: 'Upload an image file.',
      required: true,
      content: {
        'multipart/form-data': {
          'x-parser': 'stream',
          schema: {
            type: 'object',
            properties: {
              file: {
                type: 'string',
                format: 'binary',
                description: 'The image file to upload',
              },
            },
          },
        },
      },
    })
    @inject(RestBindings.Http.REQUEST) request: Request,
    @inject(RestBindings.Http.RESPONSE) response: Response,
  ): Promise<object> {
    try {
      await this.StoreSetting.uploadFileHandler(request, response);

      const file = request.file;
      if (!file) throw new Error('No file uploaded.');

      return {
        message: 'File uploaded successfully',
        filename: file.filename,
      };
    } catch (err) {
      throw new HttpErrors.BadRequest(`File upload failed: ${err.message}`);
    }
  }

  // File upload news
  @post('upload/news-image', {
    responses: {
      200: {
        description: 'File uploaded successfully',
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                message: { type: 'string' },
                filename: { type: 'string' },
              },
            },
          },
        },
      },
    },
  })
  async uploadNewsImage(
    @requestBody({
      description: 'Upload an image file.',
      required: true,
      content: {
        'multipart/form-data': {
          'x-parser': 'stream',
          schema: {
            type: 'object',
            properties: {
              file: {
                type: 'string',
                format: 'binary',
                description: 'The image file to upload',
              },
            },
          },
        },
      },
    })
    @inject(RestBindings.Http.REQUEST) request: Request,
    @inject(RestBindings.Http.RESPONSE) response: Response,
  ): Promise<object> {
    try {
      await this.StoreNews.uploadFileHandler(request, response);

      const file = request.file;
      if (!file) throw new Error('No file uploaded.');

      return {
        message: 'File uploaded successfully',
        filename: file.filename,
      };
    } catch (err) {
      throw new HttpErrors.BadRequest(`File upload failed: ${err.message}`);
    }
  }

  // File upload Services
  @post('upload/service-image', {
    responses: {
      200: {
        description: 'File uploaded successfully',
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                message: { type: 'string' },
                filename: { type: 'string' },
              },
            },
          },
        },
      },
    },
  })
  async uploadServiceImage(
    @requestBody({
      description: 'Upload an image file.',
      required: true,
      content: {
        'multipart/form-data': {
          'x-parser': 'stream',
          schema: {
            type: 'object',
            properties: {
              file: {
                type: 'string',
                format: 'binary',
                description: 'The image file to upload',
              },
            },
          },
        },
      },
    })
    @inject(RestBindings.Http.REQUEST) request: Request,
    @inject(RestBindings.Http.RESPONSE) response: Response,
  ): Promise<object> {
    try {
      await this.StoreServices.uploadFileHandler(request, response);

      const file = request.file;
      if (!file) throw new Error('No file uploaded.');

      return {
        message: 'File uploaded successfully',
        filename: file.filename,
      };
    } catch (err) {
      throw new HttpErrors.BadRequest(`File upload failed: ${err.message}`);
    }
  }


  // File upload recruitment
  @post('upload/recruitment-image', {
    responses: {
      200: {
        description: 'File uploaded successfully',
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                message: { type: 'string' },
                filename: { type: 'string' },
              },
            },
          },
        },
      },
    },
  })
  async uploadRecruitmentImage(
    @requestBody({
      description: 'Upload an image file.',
      required: true,
      content: {
        'multipart/form-data': {
          'x-parser': 'stream',
          schema: {
            type: 'object',
            properties: {
              file: {
                type: 'string',
                format: 'binary',
                description: 'The image file to upload',
              },
            },
          },
        },
      },
    })
    @inject(RestBindings.Http.REQUEST) request: Request,
    @inject(RestBindings.Http.RESPONSE) response: Response,
  ): Promise<object> {
    try {
      await this.StoreRecruitments.uploadFileHandler(request, response);

      const file = request.file;
      if (!file) throw new Error('No file uploaded.');

      return {
        message: 'File uploaded successfully',
        filename: file.filename,
      };
    } catch (err) {
      throw new HttpErrors.BadRequest(`File upload failed: ${err.message}`);
    }
  }

  // File ckeditor upload 
  @authenticate({ skip: true, strategy: 'jwt' })
  @post('upload/ckeditor', {
    responses: {
      200: {
        description: 'File uploaded successfully',
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                message: { type: 'string' },
                filename: { type: 'string' },
              },
            },
          },
        },
      },
    },
  })
  async uploadCkeditor(
    @requestBody({
      description: 'Upload an image file.',
      required: true,
      content: {
        'multipart/form-data': {
          'x-parser': 'stream',
          schema: {
            type: 'object',
            properties: {
              file: {
                type: 'string',
                format: 'binary',
                description: 'The image file to upload',
              },
            },
          },
        },
      },
    })
    @inject(RestBindings.Http.REQUEST) request: Request,
    @inject(RestBindings.Http.RESPONSE) response: Response,
  ): Promise<object> {
    try {
      await this.StoreCkeditor.uploadFileHandler(request, response);

      const file = request.file;
      if (!file) throw new Error('No file uploaded.');

      return {
        url: `${ImagePath}ckeditor/${file.filename}`,
      };
    } catch (err) {
      throw new HttpErrors.BadRequest(`File upload failed: ${err.message}`);
    }
  }

}
