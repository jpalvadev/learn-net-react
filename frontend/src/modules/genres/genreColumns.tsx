import { type ColumnDef, type RowData } from '@tanstack/react-table';
import { type Genre } from './types/genre.type';

declare module '@tanstack/react-table' {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    interface ColumnMeta<TData extends RowData, TValue> {
        filterKey?: keyof TData;
        filterVariant?: 'text' | 'number';
    }
}

export const GENRE_COLUMNS: ColumnDef<Genre>[] = [
    {
        accessorKey: 'id',
        header: () => <span>ID</span>,
        meta: { filterKey: 'id', filterVariant: 'number' },
    },
    {
        accessorKey: 'name',
        header: () => <span>Genre</span>,
        meta: { filterKey: 'name' },
    },
];
