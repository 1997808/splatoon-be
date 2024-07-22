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
    const { email, password } = loginDto;
    const user = await this.usersService.findOneByEmail(email);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }
    const isPasswordMatching = await bcrypt.compare(password, user.password);
    if (!isPasswordMatching) {
      throw new UnauthorizedException('Invalid credentials');
    }
    const payload: TokenPayloadDto = {
      email: user.email,
      userId: user.id,
      username: user.username,
    };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
