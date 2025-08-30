import { Entity } from '../entities/entity';

export interface RepositoryInterface<E extends Entity> {
   insert(entity: E): Promise<void>;
   findAll(): Promise<E[]>;
   findById(id: string): Promise<E>;
   update(entity: E): Promise<void>;
   delete(id: string): Promise<void>;
}
