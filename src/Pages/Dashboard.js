import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import UserTable from '../components/UserTable';
import Pagination from '../components/Pagination';
import searchIcon from '../assets/search.svg'
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { userState } from '../state/userState';
import { ToastContainer } from 'react-toastify';
import Logout from '../components/Logout';

function Dashboard() {
    const navigate = useNavigate()
    const [user] = useRecoilState(userState)
    const [users] = useState([
        { id: 1, name: 'John Doe', email: 'john@example.com', phone: '555-555-5555' },
        { id: 2, name: 'Jane Doe', email: 'jane@example.com', phone: '555-555-5556' },
        { id: 3, name: 'Bob Smith', email: 'bob@example.com', phone: '555-555-5557' },
        { id: 4, name: 'Alice Johnson', email: 'alice@example.com', phone: '555-555-5558' },
        { id: 5, name: 'Charlie Brown', email: 'charlie@example.com', phone: '555-555-5559' },
        { id: 6, name: 'David Davis', email: 'david@example.com', phone: '555-555-5560' },
        { id: 7, name: 'Emily White', email: 'emily@example.com', phone: '555-555-5561' },
        { id: 8, name: 'Frank Black', email: 'frank@example.com', phone: '555-555-5562' },
        { id: 9, name: 'Grace Kelly', email: 'grace@example.com', phone: '555-555-5563' },
        { id: 10, name: 'Henry Ford', email: 'henry@example.com', phone: '555-555-5564' },
    ]);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState('');
    const [sortDirection, setSortDirection] = useState('asc');

    useEffect(() => {
        if (!Cookies.get("adriux_test")) navigate("/login");
    }, [])

    const pageSize = 5;

    const filteredUsers = users.filter((user) =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const sortedUsers = filteredUsers.sort((a, b) => {
        const nameA = a.name.toLowerCase();
        const nameB = b.name.toLowerCase();
        if (nameA < nameB) {
            return sortDirection === 'asc' ? -1 : 1;
        }
        if (nameA > nameB) {
            return sortDirection === 'asc' ? 1 : -1;
        }
        return 0;
    });

    const totalPages = Math.ceil(sortedUsers.length / pageSize);

    const paginatedUsers = sortedUsers.slice((currentPage - 1) * pageSize, currentPage * pageSize);

    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
        setCurrentPage(1);
    };

    const handleSort = () => {
        setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
        setCurrentPage(1);
    };

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    return (
        <Parent>
            <Header>
                <div>
                    <Brand>Users</Brand>
                </div>
                <HeaderRight className='header-right'>
                    <div className='admin-text'>{`${user.firstName} ${user.lastName}`}</div>
                    <Logout />
                </HeaderRight>
            </Header>
            <div style={{ position: 'relative' }}>
                <img style={{
                    position: 'absolute',
                    top: '8px',
                    left: '10px'
                }} src={searchIcon} />
                <SearchInput type="text" placeholder="Search users" value={searchTerm} onChange={handleSearch} />
            </div>
            <UserTable users={paginatedUsers} onSort={handleSort} sortDirection={sortDirection} />
            <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
            <ToastContainer />
        </Parent>
    );
}

const Parent = styled.div`
    max-width: 1140px; 
    margin: auto; 
    width: 100%;
    padding: 0 15px;
`

const Brand = styled.div`
    font-size: 20px;
    font-weight: bold;
    text-transform: capitalize;
`
const Header = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 20px;
    margin-top: 20px;
    font-size: 16px;
`
const HeaderRight = styled.div`
    display: flex;
    align-items: center;
    gap: 10px;
`


const SearchInput = styled.input`
    padding: 8px;
    margin-bottom: 16px;
    width: 100%;
    box-sizing: border-box;
    border: 1px solid rgb(221, 221, 221) !important;
    background: #f2f2f2;
    height: 40px;
    border-radius: 4px;
    outline: none;
    padding-left: 40px;
`;

export default Dashboard;