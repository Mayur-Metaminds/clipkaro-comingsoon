import { z, ZodSchema } from "zod";
import { apiService } from "./service";

/**
 * Query parameters for API requests
 */
export interface QueryParams {
  page?: number;
  pageSize?: number;
  sort?: string;
  order?: "asc" | "desc";
  search?: string;
  [key: string]: string | number | boolean | undefined;
}

/**
 * Base Service Class
 * Provides common CRUD operations and utilities for all services
 * Extend this class to create domain-specific services
 */
export abstract class BaseService<T> {
  protected abstract baseUrl: string;
  protected abstract schema: ZodSchema<T>;

  /**
   * Build query string from params
   */
  protected buildQueryString(params?: QueryParams): string {
    if (!params) return "";

    const searchParams = new URLSearchParams();
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        searchParams.append(key, String(value));
      }
    });

    const queryString = searchParams.toString();
    return queryString ? `?${queryString}` : "";
  }

  /**
   * Get list response schema
   */
  protected getListSchema() {
    return z.object({
      data: z.array(this.schema),
      meta: z.object({
        page: z.number(),
        pageSize: z.number(),
        total: z.number(),
        totalPages: z.number(),
      }),
    });
  }

  /**
   * Get single item response schema
   */
  protected getSingleSchema() {
    return z.object({
      success: z.boolean().optional(),
      data: this.schema,
    });
  }

  /**
   * Get message response schema
   */
  protected getMessageSchema() {
    return z.object({
      success: z.boolean(),
      message: z.string(),
    });
  }

  /**
   * Get all items with optional filtering and pagination
   */
  async getAll(params?: QueryParams) {
    const queryString = this.buildQueryString(params);
    return apiService.get(
      `${this.baseUrl}${queryString}`,
      this.getListSchema()
    );
  }

  /**
   * Get single item by ID
   */
  async getById(id: string | number) {
    return apiService.get(`${this.baseUrl}/${id}`, this.getSingleSchema());
  }

  /**
   * Create new item
   */
  async create(data: Partial<T>) {
    return apiService.post(`${this.baseUrl}`, this.getSingleSchema(), data);
  }

  /**
   * Update existing item
   */
  async update(id: string | number, data: Partial<T>) {
    return apiService.patch(
      `${this.baseUrl}/${id}`,
      this.getSingleSchema(),
      data
    );
  }

  /**
   * Replace existing item (PUT)
   */
  async replace(id: string | number, data: T) {
    return apiService.put(
      `${this.baseUrl}/${id}`,
      this.getSingleSchema(),
      data
    );
  }

  /**
   * Delete item
   */
  async delete(id: string | number) {
    return apiService.delete(`${this.baseUrl}/${id}`, this.getMessageSchema());
  }

  /**
   * Batch operations
   */
  async batchCreate(items: Partial<T>[]) {
    return apiService.post(
      `${this.baseUrl}/batch`,
      z.object({
        success: z.boolean(),
        data: z.array(this.schema),
      }),
      { items }
    );
  }

  async batchUpdate(updates: Array<{ id: string | number; data: Partial<T> }>) {
    return apiService.patch(
      `${this.baseUrl}/batch`,
      z.object({
        success: z.boolean(),
        data: z.array(this.schema),
      }),
      { updates }
    );
  }

  async batchDelete(ids: Array<string | number>) {
    return apiService.delete(`${this.baseUrl}/batch`, this.getMessageSchema(), {
      data: { ids },
    });
  }

  /**
   * Search with custom endpoint
   */
  async search(query: string, params?: QueryParams) {
    const queryString = this.buildQueryString({ ...params, search: query });
    return apiService.get(
      `${this.baseUrl}/search${queryString}`,
      this.getListSchema()
    );
  }

  /**
   * Count items with optional filters
   */
  async count(params?: QueryParams) {
    const queryString = this.buildQueryString(params);
    return apiService.get(
      `${this.baseUrl}/count${queryString}`,
      z.object({ count: z.number() })
    );
  }
}
