import { apiClient } from '@/api/apiClient';
import { type Genre } from '../types/genre.type';
import type { Filters, PaginatedData } from '@/api/types';

export type GenreFilters = Filters<Genre>;

export async function fetchGenres(
    filtersAndPagination: GenreFilters
): Promise<PaginatedData<Genre>> {
    const response = await apiClient.get<Genre[]>('/genres', {
        params: filtersAndPagination,
        headers: {
            'total-records-count': 'true',
        },
    });

    return {
        result: response.data,
        rowCount: parseInt(response.headers['total-records-count'] || '0'),
    };
}
