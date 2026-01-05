import {
    type ColumnDef,
    flexRender,
    getCoreRowModel,
    type OnChangeFn,
    type PaginationOptions,
    type PaginationState,
    type SortingState,
    useReactTable,
    type VisibilityState,
} from '@tanstack/react-table';
import { type Filters } from '../api/types';
import { DebouncedInput } from './debouncedInput';
import {
    TableHeader,
    TableRow,
    TableHead,
    TableBody,
    TableCell,
    Table,
} from './ui/table';
import { Button } from './ui/button';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from './ui/select';
import { SelectGroup } from '@radix-ui/react-select';
import { Input } from './ui/input';
import {
    ChevronDown,
    ChevronFirst,
    ChevronLast,
    ChevronLeft,
    ChevronRight,
    ChevronsUpDown,
    ChevronUp,
    FunnelIcon,
    Settings2Icon,
} from 'lucide-react';
import { useState } from 'react';
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuTrigger,
} from './ui/dropdown-menu';

import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import { Label } from './ui/label';

export const DEFAULT_PAGE_INDEX = 0;
export const DEFAULT_PAGE_SIZE = 10;

type Props<T extends Record<string, string | number>> = {
    data: T[];
    columns: ColumnDef<T>[];
    pagination: PaginationState;
    paginationOptions: Pick<
        PaginationOptions,
        'onPaginationChange' | 'rowCount'
    >;
    filters: Filters<T>;
    onFilterChange: (dataFilters: Partial<T>) => void;
    sorting: SortingState;
    onSortingChange: OnChangeFn<SortingState>;
};

export default function GenericTable<
    T extends Record<string, string | number>,
>({
    data,
    columns,
    pagination,
    paginationOptions,
    filters,
    onFilterChange,
    sorting,
    onSortingChange,
}: Props<T>) {
    const [columnVisibility, setColumnVisibility] = useState<VisibilityState>(
        {}
    );

    const table = useReactTable({
        data,
        columns,
        onColumnVisibilityChange: setColumnVisibility,
        state: { pagination, sorting, columnVisibility },
        onSortingChange,
        ...paginationOptions,
        manualFiltering: true,
        manualSorting: true,
        manualPagination: true,
        getCoreRowModel: getCoreRowModel(),
    });

    return (
        <div>
            <div className="overflow-hidden rounded-md border">
                <Table>
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => {
                                    const fieldMeta =
                                        header.column.columnDef.meta;
                                    return (
                                        <TableHead key={header.id}>
                                            {header.column.getCanSort() ? (
                                                <div className="select-none flex items-center gap-2">
                                                    {flexRender(
                                                        header.column.columnDef
                                                            .header,
                                                        header.getContext()
                                                    )}
                                                    <div
                                                        {...{
                                                            className:
                                                                header.column.getCanSort()
                                                                    ? 'cursor-pointer'
                                                                    : '',
                                                            onClick:
                                                                header.column.getToggleSortingHandler(),
                                                        }}
                                                    >
                                                        {{
                                                            asc: (
                                                                <ChevronUp
                                                                    size={18}
                                                                />
                                                            ),
                                                            desc: (
                                                                <ChevronDown
                                                                    size={18}
                                                                />
                                                            ),
                                                            false: (
                                                                <ChevronsUpDown
                                                                    size={18}
                                                                />
                                                            ),
                                                        }[
                                                            header.column.getIsSorted() as string
                                                        ] ?? null}
                                                    </div>
                                                    {header.column.getCanFilter() &&
                                                    fieldMeta?.filterKey !==
                                                        undefined ? (
                                                        <Popover>
                                                            <PopoverTrigger
                                                                asChild
                                                            >
                                                                <FunnelIcon
                                                                    size={18}
                                                                    fill={
                                                                        filters[
                                                                            fieldMeta
                                                                                .filterKey
                                                                        ]
                                                                            ? 'currentColor'
                                                                            : 'none'
                                                                    }
                                                                    className="cursor-pointer"
                                                                />
                                                            </PopoverTrigger>
                                                            <PopoverContent className="w-64 flex gap-4">
                                                                <Label htmlFor="width">
                                                                    Filtrar
                                                                </Label>
                                                                <DebouncedInput
                                                                    className="w-36 border shadow rounded"
                                                                    onChange={(
                                                                        value
                                                                    ) => {
                                                                        onFilterChange(
                                                                            {
                                                                                [fieldMeta.filterKey as keyof T]:
                                                                                    value,
                                                                            } as Partial<T>
                                                                        );
                                                                    }}
                                                                    placeholder="Filtrar por..."
                                                                    type={
                                                                        fieldMeta.filterVariant ===
                                                                        'number'
                                                                            ? 'number'
                                                                            : 'text'
                                                                    }
                                                                    value={
                                                                        filters[
                                                                            fieldMeta
                                                                                .filterKey
                                                                        ] ?? ''
                                                                    }
                                                                />
                                                            </PopoverContent>
                                                        </Popover>
                                                    ) : null}
                                                </div>
                                            ) : (
                                                <div className="flex justify-end mr-1.5">
                                                    <DropdownMenu>
                                                        <DropdownMenuTrigger
                                                            asChild
                                                        >
                                                            <Settings2Icon
                                                                size={20}
                                                                className="cursor-pointer"
                                                            />
                                                        </DropdownMenuTrigger>
                                                        <DropdownMenuContent align="end">
                                                            {table
                                                                .getAllColumns()
                                                                .filter(
                                                                    (column) =>
                                                                        column.getCanHide()
                                                                )
                                                                .map(
                                                                    (
                                                                        column
                                                                    ) => {
                                                                        return (
                                                                            <DropdownMenuCheckboxItem
                                                                                key={
                                                                                    column.id
                                                                                }
                                                                                className="capitalize"
                                                                                checked={column.getIsVisible()}
                                                                                onCheckedChange={(
                                                                                    value
                                                                                ) =>
                                                                                    column.toggleVisibility(
                                                                                        !!value
                                                                                    )
                                                                                }
                                                                            >
                                                                                {
                                                                                    column.id
                                                                                }
                                                                            </DropdownMenuCheckboxItem>
                                                                        );
                                                                    }
                                                                )}
                                                        </DropdownMenuContent>
                                                    </DropdownMenu>
                                                </div>
                                            )}
                                        </TableHead>
                                    );
                                })}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow
                                    key={row.id}
                                    data-state={
                                        row.getIsSelected() && 'selected'
                                    }
                                >
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell key={cell.id}>
                                            {flexRender(
                                                cell.column.columnDef.cell,
                                                cell.getContext()
                                            )}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell
                                    colSpan={columns.length}
                                    className="h-24 text-center"
                                >
                                    No results.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>

            <div className="flex items-center justify-between gap-4 my-4">
                <div className="flex items-center gap-16">
                    <div>{table.getRowCount()} registros encontrados</div>

                    {/* Go to Page */}
                    <div className="flex items-center gap-2">
                        <span>
                            Página
                            <strong>
                                {table.getState().pagination.pageIndex + 1} de{' '}
                                {table.getPageCount()}
                            </strong>
                        </span>
                        <span> - Ir a Página:</span>
                        <Input
                            type="number"
                            value={table.getState().pagination.pageIndex + 1}
                            onChange={(e) => {
                                const page = e.target.value
                                    ? Number(e.target.value) - 1
                                    : 0;
                                table.setPageIndex(page);
                            }}
                            min={1}
                            max={table.getPageCount()}
                            className="border p-1 rounded w-16"
                        />
                    </div>
                </div>

                <div className="flex items-center gap-16">
                    {/* Select rows per page */}
                    <div className="flex items-center gap-2">
                        <span>Mostrar</span>
                        <Select
                            defaultValue="10"
                            value={table
                                .getState()
                                .pagination.pageSize.toString()}
                            onValueChange={(value) => {
                                table.setPageSize(Number(value));
                            }}
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="10" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectLabel>Registros</SelectLabel>

                                    {[10, 20, 50].map((pageSize) => (
                                        <SelectItem
                                            key={pageSize}
                                            value={pageSize.toString()}
                                        >
                                            {pageSize}
                                        </SelectItem>
                                    ))}
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </div>

                    {/* Botonera paginacion */}
                    <div className="flex items-center gap-2">
                        <Button
                            onClick={() => table.setPageIndex(0)}
                            disabled={!table.getCanPreviousPage()}
                            variant="outline"
                        >
                            <ChevronFirst />
                        </Button>
                        <Button
                            onClick={() => table.previousPage()}
                            disabled={!table.getCanPreviousPage()}
                            variant="outline"
                        >
                            <ChevronLeft />
                        </Button>
                        <Button
                            onClick={() => table.nextPage()}
                            disabled={!table.getCanNextPage()}
                            variant="outline"
                        >
                            <ChevronRight />
                        </Button>
                        <Button
                            onClick={() =>
                                table.setPageIndex(table.getPageCount() - 1)
                            }
                            disabled={!table.getCanNextPage()}
                            variant="outline"
                        >
                            <ChevronLast />
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );

    return (
        <div>
            <table>
                <thead>
                    {table.getHeaderGroups().map((headerGroup) => (
                        <tr key={headerGroup.id}>
                            {headerGroup.headers.map((header) => {
                                const fieldMeta = header.column.columnDef.meta;
                                return (
                                    <th
                                        key={header.id}
                                        colSpan={header.colSpan}
                                    >
                                        {header.isPlaceholder ? null : (
                                            <>
                                                <div
                                                    {...{
                                                        className:
                                                            header.column.getCanSort()
                                                                ? 'cursor-pointer select-none'
                                                                : '',
                                                        onClick:
                                                            header.column.getToggleSortingHandler(),
                                                    }}
                                                >
                                                    {flexRender(
                                                        header.column.columnDef
                                                            .header,
                                                        header.getContext()
                                                    )}
                                                    {{
                                                        asc: ' 🔼',
                                                        desc: ' 🔽',
                                                        false: ' 🔃',
                                                    }[
                                                        header.column.getIsSorted() as string
                                                    ] ?? null}
                                                </div>
                                                {header.column.getCanFilter() &&
                                                fieldMeta?.filterKey !==
                                                    undefined ? (
                                                    <DebouncedInput
                                                        className="w-36 border shadow rounded"
                                                        onChange={(value) => {
                                                            onFilterChange({
                                                                [fieldMeta.filterKey as keyof T]:
                                                                    value,
                                                            } as Partial<T>);
                                                        }}
                                                        placeholder="Search..."
                                                        type={
                                                            fieldMeta.filterVariant ===
                                                            'number'
                                                                ? 'number'
                                                                : 'text'
                                                        }
                                                        value={
                                                            filters[
                                                                fieldMeta
                                                                    .filterKey
                                                            ] ?? ''
                                                        }
                                                    />
                                                ) : null}
                                            </>
                                        )}
                                    </th>
                                );
                            })}
                        </tr>
                    ))}
                </thead>
                <tbody>
                    {table.getRowModel().rows.map((row) => {
                        return (
                            <tr key={row.id}>
                                {row.getVisibleCells().map((cell) => {
                                    return (
                                        <td key={cell.id}>
                                            {flexRender(
                                                cell.column.columnDef.cell,
                                                cell.getContext()
                                            )}
                                        </td>
                                    );
                                })}
                            </tr>
                        );
                    })}
                </tbody>
            </table>
            <div className="flex items-center gap-2 my-2">
                <button
                    className="border rounded p-1 disabled:text-gray-500 disabled:cursor-not-allowed"
                    onClick={() => table.setPageIndex(0)}
                    disabled={!table.getCanPreviousPage()}
                >
                    {'<<'}
                </button>
                <button
                    className="border rounded p-1 disabled:text-gray-500 disabled:cursor-not-allowed"
                    onClick={() => table.previousPage()}
                    disabled={!table.getCanPreviousPage()}
                >
                    {'<'}
                </button>
                <button
                    className="border rounded p-1 disabled:text-gray-500 disabled:cursor-not-allowed"
                    onClick={() => table.nextPage()}
                    disabled={!table.getCanNextPage()}
                >
                    {'>'}
                </button>
                <button
                    className="border rounded p-1 disabled:text-gray-500 disabled:cursor-not-allowed"
                    onClick={() => table.setPageIndex(table.getPageCount() - 1)}
                    disabled={!table.getCanNextPage()}
                >
                    {'>>'}
                </button>
                <span className="flex items-center gap-1">
                    <div>Page</div>
                    <strong>
                        {table.getState().pagination.pageIndex + 1} of{' '}
                        {table.getPageCount()}
                    </strong>
                </span>
                <span className="flex items-center gap-1">
                    | Go to page:
                    <input
                        type="number"
                        value={table.getState().pagination.pageIndex + 1}
                        onChange={(e) => {
                            const page = e.target.value
                                ? Number(e.target.value) - 1
                                : 0;
                            table.setPageIndex(page);
                        }}
                        className="border p-1 rounded w-16"
                    />
                </span>
                <select
                    value={table.getState().pagination.pageSize}
                    onChange={(e) => {
                        table.setPageSize(Number(e.target.value));
                    }}
                >
                    {[10, 20, 30, 40, 50].map((pageSize) => (
                        <option key={pageSize} value={pageSize}>
                            Show {pageSize}
                        </option>
                    ))}
                </select>
            </div>
        </div>
    );
}
