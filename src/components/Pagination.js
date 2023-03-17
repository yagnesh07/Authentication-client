import React from 'react';
import styled from 'styled-components';

function Pagination({ currentPage, totalPages, onPageChange }) {
    const pages = [];
    for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
    }

    return (
        <PaginationContainer>
            <PageButton onClick={() => onPageChange(currentPage - 1)} disabled={currentPage === 1}>
                Previous
            </PageButton>
            {pages.map((page) => (
                <PageButton key={page} onClick={() => onPageChange(page)} active={page === currentPage}>
                    {page}
                </PageButton>
            ))}
            <PageButton onClick={() => onPageChange(currentPage + 1)} disabled={currentPage === totalPages}>
                Next
            </PageButton>
        </PaginationContainer>
    );
}

const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
`;

const PageButton = styled.button`
  background-color: ${({ active }) => (active ? '#4CAF50' : '#ddd')};
  color: ${({ active }) => (active ? 'white' : 'black')};
  border: none;
  margin: 4px;
  padding: 8px 16px;
  cursor: pointer;
  border-radius: 4px;
`;

export default Pagination;