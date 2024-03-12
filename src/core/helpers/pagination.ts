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


export const regexSearchQuery = (fields: string[], searchParam: string, query?: Record<string, any>) => {
  
  const mappedFields = fields.map((field: string) => {
      return { [field]: { $regex: new RegExp(searchParam), $options: 'i' } };
    });
  
    delete query.search;
  
    return {
      $or: mappedFields,
      ...query,
    };
  }