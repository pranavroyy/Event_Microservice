import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { AuthServiceModule } from './auth-service.module';

console.log('DEBUG DATABASE_URL:', process.env.DATABASE_URL);

async function bootstrap() {
  const app = await NestFactory.create(AuthServiceModule);
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();