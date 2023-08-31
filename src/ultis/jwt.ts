import { JwtService } from '@nestjs/jwt';
export const genAccessToken = async (payload: any, jwtService: JwtService) => {
  const accessToken = await jwtService.signAsync(
    {
      userId: payload.id,
      username: payload.username,
    },
    {
      secret: '123456',
      expiresIn: '5m',
    },
  );

  return accessToken;
};

export const genRefreshToken = async (payload: any, jwtService: JwtService) => {
  const refreshToken = await jwtService.signAsync(
    {
      userId: payload.id,
      username: payload.username,
    },
    {
      secret: '123456',
      expiresIn: '10m',
    },
  );
  return refreshToken;
};
