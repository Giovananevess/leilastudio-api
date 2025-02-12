import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) { }

  findAll() {
    return this.userRepository.find();
  }

  async findOneByEmail(email: string): Promise<User | null> {
    return this.userRepository.findOne({ where: { email } });
  }

  async findOneById(id: number): Promise<User | null> {
    return this.userRepository.findOne({ where: { id } });
  }

  async create(user: Partial<User>): Promise<User> {
    if (!user.password) {
      throw new Error("A senha é obrigatória!"); // Evita erro caso a senha não seja enviada
    }

    // Gera um salt e faz o hash da senha antes de salvar
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(user.password, salt);

    // Cria um novo objeto user com a senha já criptografada
    const newUser = this.userRepository.create({
      ...user,
      password: hashedPassword
    });

    return this.userRepository.save(newUser);
  }



  async update(id: number, userData: Partial<User>) {
    await this.userRepository.update(id, userData);
    return this.findOneById(id); // Agora corrigido
  }

  async remove(id: number) {
    await this.userRepository.delete(id);
    return { message: 'Usuário removido com sucesso' };
  }
}
