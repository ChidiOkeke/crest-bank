import jwt from "jsonwebtoken";

class JwtService {

  generate(email:string, id:string) {

    const secret = process.env.JWT_SECRET as string;
    const jwtAccssTime = process.env.JWT_ACCESS_TIME as string;
    const jwtRefreshTime = process.env.JWT_REFRESH_TIME as string;
    const access = jwt.sign(
      {
        id,
        type: process.env.JWT_ACCESS,
      },
      secret,
      {
        subject: email,
        expiresIn: jwtAccssTime,
        audience: process.env.JWT_AUDIENCE,
        issuer: process.env.JWT_ISSUER,
      }
    );
    
    const refresh = jwt.sign(
      {
        id,
        type: process.env.JWT_REFRESH,
      },
      secret,
      {
        subject: email,
        expiresIn: jwtRefreshTime,
        audience: process.env.JWT_AUDIENCE,
        issuer: process.env.JWT_ISSUER,
      }
    );
    
    return { access, refresh };
  }
}

export default JwtService;