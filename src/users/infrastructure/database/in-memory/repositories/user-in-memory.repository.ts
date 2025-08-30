import { ConflictError } from '@/shared/domain/errors/conflict-error';
import { NotFoundError } from '@/shared/domain/errors/not-found-error';
import { InMemoryRepository } from '@/shared/domain/repositories/in-memory.repository';
import { UserEntity } from '@/users/domain/entities/user.entity';
import { UserRepository } from '@/users/domain/repositories/user.repository';

export class InMemoryUserRepository
   extends InMemoryRepository<UserEntity>
   implements UserRepository
{
   async findByEmail(email: string): Promise<UserEntity> {
      const entity = this.items.find(item => item.email === email);
      if (!entity) throw new NotFoundError(`User not found for email ${email}`);
      return Promise.resolve(entity);
   }

   async emailExists(email: string): Promise<void> {
      const entity = this.items.find(item => item.email === email);
      if (entity) throw new ConflictError(`Email address already in use`);
      return Promise.resolve();
   }
}
