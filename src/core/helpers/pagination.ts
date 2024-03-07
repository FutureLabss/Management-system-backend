import { HydratedDocument, Model, QueryWithHelpers } from 'mongoose';
import { PaginatedResponse } from '../entities/response.entities';
interface PaginateQueryParams {
  limit?: number;
  page?: number;
}

interface ProjectQueryHelpers<T> {
  paginate({}: PaginateQueryParams): QueryWithHelpers<
    PaginatedResponse<HydratedDocument<T>>,
    HydratedDocument<T>,
    ProjectQueryHelpers<T>
  >;
}
export type PaginateModel<T> = Model<T, ProjectQueryHelpers<T>>;