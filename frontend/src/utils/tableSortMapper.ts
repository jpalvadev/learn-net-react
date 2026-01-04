import { type SortingState } from '@tanstack/react-table';
import { type SortParams } from '../api/types';

/*
Utility para traducir el sort entre el formato esperado por Tanstack Table y el formato de la URL
Solo sorting por 1 columna - Ejemplos formatos:
  TanStack Table usa un formato de array para el ordenamiento:
  [{ id: "firstName", desc: false }] -> ordenar por firstName ascendente
  [{ id: "age", desc: true }] -> ordenar por age descendente
 
  La URL usa un formato de string más simple:
  "firstName.asc" -> ordenar por firstName ascendente
  "age.desc" -> ordenar por age descendente
*/

/**
 * @param sorting - Estado de ordenamiento de TanStack Table (array de objetos)
 * @returns String en formato "campo.dirección" o undefined si no hay ordenamiento
 */
export const stateToSortBy = (sorting: SortingState | undefined) => {
    if (!sorting || sorting.length == 0) return undefined;

    const sort = sorting[0];

    return `${sort.id}.${sort.desc ? 'desc' : 'asc'}` as const;
};

/**
 * @param sortBy - String en formato "campo.dirección" o undefined
 * @returns Array con el estado de ordenamiento para TanStack Table, o array vacío si no hay ordenamiento
 */
export const sortByToState = (sortBy: SortParams['sortBy'] | undefined) => {
    if (!sortBy) return [];

    const [id, desc] = sortBy.split('.');

    return [{ id, desc: desc === 'desc' }];
};
