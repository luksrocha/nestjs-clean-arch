/* eslint-disable @typescript-eslint/no-namespace */
import {
   SearchParams as DefaultSearchParams,
   SearchResults as DefaultSearchResults,
   SearchableRepositoryInterface,
} from '@/shared/domain/repositories/searchable-repository-contract';
import { UserEntity } from '../entities/user.entity';

export namespace UserRepository {
   export type Filter = string;

   export class SearchParams extends DefaultSearchParams<Filter> {}

   export class SearchResults extends DefaultSearchResults<UserEntity, Filter> {}

   export interface Repository
      extends SearchableRepositoryInterface<UserEntity, Filter, SearchParams, SearchResults> {
      findByEmail(email: string): Promise<UserEntity>;
      emailExists(email: string): Promise<void>;
   }
}
