import React from 'react';

interface TableColumn<T> {
  header: string;
  accessor: keyof T | ((row: T, index: number) => React.ReactNode);
  width?: string;
}

interface TableProps<T> {
  columns: TableColumn<T>[];
  data: T[];
  keyExtractor: (item: T) => string;
  itemsPerPage?: number;
  currentPage?: number;
  totalItems?: number;
  onChangePage?: (page: number) => void;
}

export function Table<T>({
  columns,
  data,
  keyExtractor,
  itemsPerPage = 10,
  currentPage = 1,
  totalItems,
  onChangePage,
}: TableProps<T>) {
  const totalPages = totalItems 
    ? Math.ceil(totalItems / itemsPerPage) 
    : Math.ceil(data.length / itemsPerPage);

  const renderCell = (item: T, column: TableColumn<T>, index: number) => {
    if (typeof column.accessor === 'function') {
      return column.accessor(item, index);
    }
    
    return String(item[column.accessor] || '');
  };

  return (
    <div className="w-full overflow-x-auto">
      <div className="py-2 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
        <span className="text-sm text-gray-500">
          Mostrando {itemsPerPage} por página
        </span>
      </div>
      
      <div className="min-w-full inline-block align-middle">
        <div className="overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr className="bg-gray-50">
                {columns.map((column, index) => (
                  <th 
                    key={index}
                    className={`px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider ${column.width || ''}`}
                  >
                    {column.header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white">
              {data.map((item, index) => (
                <tr 
                  key={keyExtractor(item)}
                  className="hover:bg-gray-50"
                >
                  {columns.map((column, colIndex) => (
                    <td 
                      key={colIndex} 
                      className="px-3 py-3 text-sm text-gray-800 whitespace-nowrap"
                    >
                      {renderCell(item, column, index)}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      
      {totalPages > 1 && (
        <div className="mt-4 flex justify-center">
          <nav className="flex flex-wrap gap-2 justify-center">
            {Array.from({ length: Math.min(totalPages, 5) }).map((_, index) => (
              <button
                key={index}
                onClick={() => onChangePage?.(index + 1)}
                className={`w-8 h-8 flex items-center justify-center rounded-md text-sm ${
                  currentPage === index + 1
                    ? 'bg-primary-500 text-white'
                    : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
                }`}
              >
                {index + 1}
              </button>
            ))}
            {totalPages > 5 && (
              <button
                className="w-8 h-8 flex items-center justify-center rounded-md bg-white text-gray-700 border border-gray-300 hover:bg-gray-50 text-sm"
              >
                &raquo;
              </button>
            )}
          </nav>
        </div>
      )}
    </div>
  );
}