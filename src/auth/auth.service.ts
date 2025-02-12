import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
    constructor(private userService: UserService, private jwtService: JwtService) { }

    async validateUser(email: string, password: string): Promise<any> {
        const user = await this.userService.findOneByEmail(email);
        if (!user) {
            throw new UnauthorizedException('Usuário não encontrado');
        }

        console.log("Senha fornecida:", password);
        console.log("Senha salva no banco:", user.password);

        const isMatch = await bcrypt.compare(password, user.password);
        console.log("As senhas correspondem?", isMatch);

        if (!isMatch) {
            throw new UnauthorizedException('Credenciais inválidas');
        }

        // Retorna os dados do usuário sem a senha
        const { password: _, ...result } = user;
        return result;
    }

    async login(user: any) {
        const payload = { username: user.email, sub: user.id };
        return {
            access_token: this.jwtService.sign(payload),
        };
    }
}
