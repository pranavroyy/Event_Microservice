import { KAFKA_SERVICE, KAFKA_TOPICS } from '@app/kafka';
import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';

@Injectable()
export class AuthServiceService implements OnModuleInit{
  constructor(
    @Inject(KAFKA_SERVICE) private readonly kafkClient: ClientKafka,
  ) {}

  async onModuleInit() {
    //connect to Kafka when the module initializes
    await this.kafkClient.connect();
  }

  getHello(): string{
    return 'Hello World!';
  }
  async simulateUserRegistration(email: string){
    await this.kafkClient.emit(KAFKA_TOPICS.USER_REGISTERED, {
      email,
      timestamp: new Date().toISOString(),

    });

    return{message: `User Registered : ${email}`};
  }
}
