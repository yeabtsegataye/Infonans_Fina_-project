import { Controller,Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { Public } from './public.decorator';

@Controller('auth')
export class AuthController {
  constructor(private readonly AuthService: AuthService) {}
 @Public()
  @Post('login')
  Login(@Body() createUserDto: CreateAuthDto) {
    
    return this.AuthService.Login(createUserDto);
  }
  @Post('signup')
  Signup(@Body() createUserDto: CreateAuthDto) {
    return this.AuthService.Signup(createUserDto);
  }
}
