/* eslint-disable @typescript-eslint/require-await */
import { ConflictError } from '@/shared/domain/errors/conflict-error';
import { NotFoundError } from '@/shared/domain/errors/not-found-error';
import { InMemorySearchableRepository } from '@/shared/domain/repositories/in-memory-searchable.repository ';
import { SortDirection } from '@/shared/domain/repositories/searchable-repository-contract';
import { UserEntity } from '@/users/domain/entities/user.entity';
import { UserRepository } from '@/users/domain/repositories/user.repository';

export class InMemoryUserRepository
   extends InMemorySearchableRepository<UserEntity>
   implements UserRepository.Repository
{
   sortableFields: string[] = ['name', 'createdAt'];

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

   protected async applyFilter(
      items: UserEntity[],
      filter: UserRepository.Filter,
   ): Promise<UserEntity[]> {
      if (!filter) return items;

      return items.filter(item => item.props.name.toLowerCase().includes(filter.toLowerCase()));
   }

   protected async applySort(
      items: UserEntity[],
      sort: string | null,
      sortDir: SortDirection | null,
   ): Promise<UserEntity[]> {
      return !sort
         ? await super.applySort(items, 'createdAt', 'desc')
         : await super.applySort(items, sort, sortDir);
   }
}
