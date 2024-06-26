import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { TokenPayloadDto } from './dto/token-payload.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}
  async register(registerDto: RegisterDto): Promise<any> {
    const { password } = registerDto;
    const hashPassword = await bcrypt.hash(password, 10);
    const createdUser = await this.usersService.create({
      ...registerDto,
      password: hashPassword,
    });
    return createdUser;
  }

  async login(loginDto: LoginDto): Promise<any> {
    const { email, password: pass } = loginDto;
    const user = await this.usersService.findOneByEmail(email);
    const isPasswordMatching = await bcrypt.compare(pass, user.password);
    if (!isPasswordMatching) {
      throw new UnauthorizedException('Invalid credentials');
    }
    const payload: TokenPayloadDto = {
      email: user.email,
      userId: user.userId,
      username: user.username,
    };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
