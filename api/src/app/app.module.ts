import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { APP } from 'src/config';
import { ThrottlerModule } from '@nestjs/throttler'
import { HttpLoggerMiddleware } from '@nest-toolbox/http-logger-middleware'
@Module({
  imports: [
    ThrottlerModule.forRoot({
      ttl: 60,
      limit: 10
    }),
  ],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    if (APP.NODE_ENV !== 'production') {
      consumer.apply(HttpLoggerMiddleware).forRoutes({
        path: '*',
        method: RequestMethod.ALL
      })
    }
  }
}
