/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import {
  createParamDecorator,
  ExecutionContext,
  InternalServerErrorException,
} from '@nestjs/common';

export const GetUser = createParamDecorator((data, ctx: ExecutionContext) => {
  const req = ctx.switchToHttp().getRequest();
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  const { user } = req.user;
  if (!user)
    throw new InternalServerErrorException('User not found in request');
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  return user;
});
