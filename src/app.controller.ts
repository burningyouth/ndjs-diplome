import {
  Controller,
  Get,
  Param,
  Post,
  Res,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { AppService } from './app.service';
import { FilesInterceptor } from '@nestjs/platform-express';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('static/:path')
  seeUploadedFile(@Param('path') image, @Res() res) {
    return res.sendFile(image, { root: './upload' });
  }

  @Post('multiple')
  @UseInterceptors(FilesInterceptor('images'))
  async uploadMultipleFiles(@UploadedFiles() files) {
    const response = [];
    files.forEach((file) => {
      const fileReponse = {
        originalname: file.originalname,
        path: file.path,
      };
      response.push(fileReponse);
    });
    return response;
  }
}
