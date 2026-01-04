import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';
import { useMemo } from 'react';

import GenericTable, {
    DEFAULT_PAGE_INDEX,
    DEFAULT_PAGE_SIZE,
} from '@/components/genericTable';
import { useFilters } from '@/hooks/useFilters';
import { sortByToState, stateToSortBy } from '@/utils/tableSortMapper';

import type { Filters } from '@/api/types';
import { type Genre } from '@/modules/genres/types/genre.type';
import { GENRE_COLUMNS } from '@/modules/genres/genreColumns';
import { fetchGenres } from '@/modules/genres/services/genre.service';
import { Button } from '@/components/ui/button';

export type GenreFilters = Filters<Genre>;

export const Route = createFileRoute('/genres/')({
    component: GenresPage,
    validateSearch: () => ({}) as GenreFilters,
});

function GenresPage() {
    const { filters, resetFilters, setFilters } = useFilters(Route.id);

    const { data } = useQuery({
        queryKey: ['genres', filters],
        queryFn: () => fetchGenres(filters),
        placeholderData: keepPreviousData,
    });

    const paginationState = {
        pageIndex: filters.pageIndex ?? DEFAULT_PAGE_INDEX,
        pageSize: filters.pageSize ?? DEFAULT_PAGE_SIZE,
    };
    const sortingState = sortByToState(filters.sortBy);
    const columns = useMemo(() => GENRE_COLUMNS, []);

    return (
        <div className="flex flex-col gap-2 p-2">
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-semibold mb-1">Genres</h1>
                {Object.keys(filters).length > 0 && (
                    <Button
                        onClick={resetFilters}
                        disabled={Object.keys(filters).length === 0}
                        variant="outline"
                    >
                        Limpiar filtros
                    </Button>
                )}
            </div>
            <GenericTable
                data={data?.result ?? []}
                columns={columns}
                pagination={paginationState}
                paginationOptions={{
                    onPaginationChange: (pagination) => {
                        setFilters(
                            typeof pagination === 'function'
                                ? pagination(paginationState)
                                : pagination
                        );
                    },
                    rowCount: data?.rowCount,
                }}
                filters={filters}
                onFilterChange={(filters) => setFilters(filters)}
                sorting={sortingState}
                onSortingChange={(updaterOrValue) => {
                    const newSortingState =
                        typeof updaterOrValue === 'function'
                            ? updaterOrValue(sortingState)
                            : updaterOrValue;
                    return setFilters({
                        sortBy: stateToSortBy(newSortingState),
                    });
                }}
            />
            <div className="flex items-center gap-2"></div>
            <pre>{JSON.stringify(filters, null, 2)}</pre>
        </div>
    );
}
