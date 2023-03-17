import React from 'react';
import styled from 'styled-components';

function UserTable({ users, onSort, sortDirection }) {
    return (

        <Table>
            <TableHead>
                <TableRow>
                    <TableHeader onClick={onSort}>
                        Name
                        {sortDirection === 'asc' ? <SortArrow>&uarr;</SortArrow> : <SortArrow>&darr;</SortArrow>}
                    </TableHeader>
                    <TableHeader>Email</TableHeader>
                    <TableHeader>Phone</TableHeader>
                </TableRow>
            </TableHead>
            <tbody>
                {users.map((user) => (
                    <TableRow key={user.id}>
                        <TableData>{user.name}</TableData>
                        <TableData>{user.email}</TableData>
                        <TableData>{user.phone}</TableData>
                    </TableRow>
                ))}
            </tbody>
        </Table>

    );
}

const Table = styled.table`
  border-collapse: collapse;
  width: 100%;
  text-align: left;
  margin-bottom: 30px;
`;

const TableHead = styled.thead`
  background-color: #f2f2f2;
`;

const TableRow = styled.tr`
  border-bottom: 1px solid #ddd;
  &:hover {
    background-color: #f2f2f2;
  }
`;

const TableHeader = styled.th`
  padding: 12px;
  text-align: left;
  cursor: pointer;
  border: 1px solid #ddd;
`;

const TableData = styled.td`
  padding: 12px;
  border: 1px solid #ddd;
`;

const SortArrow = styled.span`
  margin-left: 8px;
  font-size: 12px;
`;

export default UserTable;