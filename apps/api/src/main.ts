import { NestFactory } from '@nestjs/core';
import { ApiModule } from './api.module';

async function bootstrap() {
	const app = await NestFactory.create(ApiModule);
	app.enableCors({
	  origin: true,
	  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
	  credentials: true,
	  allowedHeaders: [
	    'Origin',
	    'X-Requested-With',
	    'Content-Type',
	    'Accept',
	    'Authorization',
	    'Access-Control-Allow-Headers',
	    'Access-Control-Request-Method',
	    'Access-Control-Request-Headers',
	  ],
	  preflightContinue: false,
	  optionsSuccessStatus: 204,
	});
	await app.listen(3000, '0.0.0.0');
}
bootstrap();
