import { Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, Input, Pagination, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from '@heroui/react';
import styles from './TableComponent.module.css';
import { useEffect, useMemo, useState } from 'react';
import { IoIosAddCircleOutline, IoIosArrowDown } from 'react-icons/io';
import { IoSearch } from 'react-icons/io5';

interface TableComponentProps {
    columns: [];
    renderCell: any;
    idKey: string;
    searchColumnTerm: string
    isPossibleCreate: boolean;
    onOpen?: () => void;
    isOpen?: boolean;
    onClose?: () => void;
    onCreate?: () => void;
    data: [];
}


export default function TableComponent({
    columns,
    renderCell,
    idKey,
    searchColumnTerm,
    isPossibleCreate,
    onOpen,
    isOpen,
    onClose,
    onCreate,
    data,
}: TableComponentProps) {
    const [selectedKeys, setSelectedKeys] = useState(new Set([]));
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    useEffect(() => {
        if (columns.length > 0) {
            const selectedLabels = [
                ...columns.slice(0, 3).map((column) => column.label),
                columns[columns.length - 1]?.label,
            ].filter(Boolean);
            setSelectedKeys(new Set(selectedLabels));
        }
    }, [columns])

    const visibleColumns = useMemo(() => {
        return columns.filter((column) => selectedKeys.has(column.label));
    }, [columns, selectedKeys]);

    const filteredData = useMemo(() => {
        if (!searchTerm) return data;
        return data.filter((item) => {
            const email = String(item[searchColumnTerm]).toLowerCase();
            return email.includes(searchTerm.toLowerCase());
        }
        );
    }, [data, searchTerm]);

    const paginatedData = useMemo(() => {
        const start = (currentPage - 1) * rowsPerPage;
        const end = start + rowsPerPage;
        return filteredData.slice(start, end);
    }, [filteredData, currentPage, rowsPerPage]);

    const totalRecords = useMemo(() => filteredData.length, [filteredData]);
    const totalPages = useMemo(() => Math.ceil(totalRecords / rowsPerPage), [totalRecords, rowsPerPage]);

    const topContent = useMemo(() => {
        return (
            <div className={styles.tableTopContent}>
                <div className={styles.topContentRow}>
                    <Input
                        placeholder='Buscar...'
                        startContent={
                            <IoSearch className={styles.searchIcon} />
                        }
                        type='text'
                        fullWidth={true}
                        isClearable={true}
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        onClear={() => setSearchTerm('')}
                        classNames={{
                            base: styles.searchBase,
                            label: styles.searchLabel,
                            inputWrapper: styles.searchInputWrapper,
                            innerWrapper: styles.searchInnerWrapper,
                            mainWrapper: styles.searchMainWrapper,
                            input: styles.searchInput,
                            clearButton: [searchTerm !== '' ? styles.searchClearButton : styles.hideButton],
                        }}
                    />
                    <div className={styles.rowRight}>
                        <Dropdown>
                            <DropdownTrigger>
                                <div className={styles.dropDownTrigger}>
                                    <button>Columnas</button>
                                    <IoIosArrowDown />
                                </div>
                            </DropdownTrigger>
                            <DropdownMenu
                                disallowEmptySelection
                                aria-label="Single selection example"
                                closeOnSelect={false}
                                selectedKeys={selectedKeys}
                                selectionMode="multiple"
                                variant="flat"
                                onSelectionChange={(keys) => {// Obtenemos el label seleccionado
                                    setSelectedKeys(keys);
                                }}
                                classNames={{
                                    base: styles.dropDownMenuBase,
                                    list: styles.dropDownMenuList,
                                    emptyContent: styles.dropDownMenuEmptyContent,
                                }}
                            >
                                {columns.map((column) => (
                                    <DropdownItem
                                        key={column.label}
                                        value={column.label}
                                        textValue={column.label}
                                        classNames={{
                                            base: styles.dropDownItemBase,
                                            wrapper: styles.dropDownItemWrapper,
                                            title: styles.dropDownItemTitle,
                                            selectedIcon: styles.dropDownItemSelectedIcon,
                                        }}
                                    >
                                        {column.label}
                                    </DropdownItem>
                                ))}
                            </DropdownMenu>
                        </Dropdown >
                        {isPossibleCreate &&
                            <div className={styles.createButton} onClick={onOpen}>
                                <button>Crear Nuevo</button>
                                <IoIosAddCircleOutline />
                            </div>
                        }
                    </div>
                </div>
                <div className={styles.topContentRow}>
                    <div className={styles.totalRecords}>
                        Número total de registros: {totalRecords}
                    </div>
                    <Dropdown>
                        <DropdownTrigger>
                            <div className={styles.dropDownTriggerPages}>
                                <button>{rowsPerPage}</button>
                                <IoIosArrowDown />
                            </div>
                        </DropdownTrigger>
                        <DropdownMenu
                            aria-label="Rows per page selection"
                            selectedKeys={new Set([String(rowsPerPage)])}
                            selectionMode="single"
                            onSelectionChange={(keys) => {
                                const [selected] = Array.from(keys);
                                setRowsPerPage(Number(selected));
                                setCurrentPage(1);
                            }}
                            classNames={{
                                base: styles.dropDownMenuBase,
                                list: styles.dropDownMenuList,
                                emptyContent: styles.dropDownMenuEmptyContent,
                            }}
                        >
                            {[5, 10].map((option) => (
                                <DropdownItem
                                    key={String(option)}
                                    textValue={option} registros
                                    value={String(option)}
                                    classNames={{
                                        base: styles.dropDownItemBase,
                                        wrapper: styles.dropDownItemWrapper,
                                        title: styles.dropDownItemTitle,

                                        selectedIcon: styles.dropDownItemSelectedIcon,
                                    }}
                                >
                                    {option} registros
                                </DropdownItem>
                            ))}
                        </DropdownMenu>
                    </Dropdown>
                </div>
            </div>
        );
    }, [selectedKeys, columns, searchTerm, rowsPerPage, totalRecords]);

    const bottomContent = useMemo(() => {
        return (
            <Pagination
                showControls
                loop
                initialPage={1}
                page={currentPage}
                total={totalPages}
                onChange={(page) => setCurrentPage(page)}
                classNames={{
                    base: styles.paginationBase,
                    wrapper: styles.paginationWrapper,
                    prev: styles.paginationPrev,
                    next: styles.paginationNext,
                    item: styles.paginationItem,
                    cursor: styles.paginationCursor,
                    forwardIcon: styles.paginationForwardIcon,
                    ellipsis: styles.paginationEllipsis,
                    chevronNext: styles.paginationChevronNext
                }}
            />
        );
    }, [currentPage, totalPages]);

    return (
        <div className={styles.summary}>
            <div className={styles.tableContainer}>
                <Table
                    aria-label="Users table"
                    topContent={topContent}
                    topContentPlacement="outside"
                    bottomContent={bottomContent}
                    bottomContentPlacement='outside'
                    isStriped
                    isHeaderSticky
                    classNames={{
                        base: styles.tableBase,
                        table: styles.table,
                        thead: styles.tableThead,
                        tbody: styles.tableBody,
                        emptyWrapper: styles.emptyWrapper,
                        loadingWrapper: styles.loadingWrapper,
                        wrapper: styles.wrapper,
                        tr: styles.tableTr,
                        th: styles.tableTh,
                        td: styles.tableTd,
                    }}
                >
                    <TableHeader columns={visibleColumns}>
                        {(column) =>
                            <TableColumn
                                key={column.key}
                                align={column.key === "actions" ? "center" : "start"}
                            >
                                {column.label}
                            </TableColumn>
                        }
                    </TableHeader>
                    <TableBody items={paginatedData}>
                        {(item) => (
                            <TableRow key={`row-${item[idKey]}`}>
                                {(columnKey) => {
                                    if (visibleColumns.some((col) => col.key === columnKey)) {
                                        return <TableCell>{renderCell(item, columnKey)}</TableCell>;
                                    }
                                    return null;
                                }}
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
};
