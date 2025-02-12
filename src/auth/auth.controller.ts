import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { UserService } from 'src/user/user.service';


@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService, private userService: UserService
    ) { }

    @Post('login')
    async login(@Body() user: { email: string; password: string }) {
        return this.authService.validateUser(user.email, user.password).then((userData) => {
            return this.authService.login(userData);
        });
    }

    @Post('register')
    async register(@Body() createUserDto: CreateUserDto) {
        return this.userService.create(createUserDto);
    }

}
