import React, { useState, useEffect, useRef } from 'react';
import { UserResp } from '../../../services/friendship/friendshipService';
import profileService from '../../../services/profile/profileService';

interface User {
    id: number;
    name: string;
    email: string;
    thumbnail: string;
}

export default function SearchInput(props: {selectedUsers: {get: UserResp[], set: any}}) {
    const [searchKeyword, setSearchKeyword] = useState<string>('');
    const [showResults, setShowResults] = useState<boolean>(false);
    const [filteredUsers, setFilteredUsers] = useState<UserResp[]>([]);

    const searchInputRef = useRef<HTMLInputElement>(null);
    const resultsContainerRef = useRef<HTMLDivElement>(null);

    const [users, setUsers] = useState<UserResp[]>([]);
    

    // Handle search input change
    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const query = e.target.value.trim();
        setSearchKeyword(query);

        if (query.length > 0) {
            // const filtered = users.filter(user =>
            //     user.name.toLowerCase().includes(query.toLowerCase()) ||
            //     user.email.toLowerCase().includes(query.toLowerCase())
            // );
            
            // setFilteredUsers(filtered);
            profileService.searchUserCanInteract(query.toLowerCase(), setFilteredUsers)
            setShowResults(true);
        } else {
            setShowResults(false);
        }
    };

    // Toggle user selection
    const toggleUser = (userId: any) => {
        const user = filteredUsers.find(u => u.id == userId);
        if (!user) return;

        const existingIndex = props.selectedUsers.get.findIndex(selected => selected.id === userId);

        if (existingIndex > -1) {
            // Remove user if already selected
            props.selectedUsers.set((prev: any) => prev.filter((u: any) => u.id !== userId));
        } else {
            // Add user if not selected
            props.selectedUsers.set((prev: any) => [...prev, user]);
        }
    };

    // Remove user from selection
    const removeUser = (userId: number) => {
        props.selectedUsers.set((prev: any) => prev.filter((user: any) => user.id !== userId));
    };

    // Close results
    const closeResults = () => {
        setShowResults(false);
    };

    // Handle click outside to close results
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                searchInputRef.current &&
                resultsContainerRef.current &&
                !searchInputRef.current.contains(event.target as Node) &&
                !resultsContainerRef.current.contains(event.target as Node)
            ) {
                setShowResults(false);
            }
        };

        document.addEventListener('click', handleClickOutside);
        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, []);

    // Check if user is selected
    const isUserSelected = (userId: number): boolean => {
        return props.selectedUsers.get.some(selected => selected.id === userId);
    };

    const customStyles = {
        searchResults: {
            maxHeight: '400px',
            overflowY: 'auto' as const,
            border: '1px solid #dee2e6',
            borderRadius: '0.375rem',
            background: 'white',
            boxShadow: '0 0.125rem 0.25rem rgba(0, 0, 0, 0.075)',
            position: 'relative' as const,
            paddingTop: '45px'
        },
        userItem: {
            padding: '12px 16px',
            borderBottom: '1px solid #dee2e6',
            cursor: 'pointer',
            transition: 'background-color 0.15s ease-in-out'
        },
        userThumbnail: {
            width: '40px',
            height: '40px',
            borderRadius: '50%',
            objectFit: 'cover' as const
        },
        closeBtn: {
            position: 'absolute' as const,
            top: '8px',
            right: '10px',
            background: '#fff',
            border: '1px solid #dee2e6',
            borderRadius: '50%',
            width: '30px',
            height: '30px',
            fontSize: '14px',
            color: '#6c757d',
            cursor: 'pointer',
            zIndex: 10,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
        },
        userTag: {
            display: 'inline-block',
            background: '#007bff',
            color: 'white',
            padding: '4px 8px',
            margin: '2px',
            borderRadius: '12px',
            fontSize: '0.875rem',
            cursor: 'pointer'
        },
        selectedUserName: {
            color: '#007bff',
            fontWeight: '600'
        }
    };

    return (
        <>
            <div >

                <div className="mb-3">
                    <label htmlFor="searchInput" className="form-label">Search Users:</label>

                    {/* Selected Users Tags */}
                    {props.selectedUsers.get.length > 0 && (
                        <div className="mb-2" style={{ minHeight: '20px' }}>
                            {props.selectedUsers.get.map(user => (
                                <span
                                    key={user.id}
                                    style={customStyles.userTag}
                                    className="user-tag"
                                    onMouseOver={(e) => {
                                        (e.target as HTMLElement).style.background = '#0056b3';
                                    }}
                                    onMouseOut={(e) => {
                                        (e.target as HTMLElement).style.background = '#007bff';
                                    }}
                                >
                                    {user.firstName + " " + user.lastName}
                                    <span
                                        onClick={() => removeUser(user.id)}
                                        style={{ marginLeft: '5px', cursor: 'pointer' }}
                                    >
                                        ×
                                    </span>
                                </span>
                            ))}
                        </div>
                    )}

                    <input
                        ref={searchInputRef}
                        type="text"
                        className="form-control"
                        id="searchInput"
                        placeholder="Type to search users..."
                        value={searchKeyword}
                        onChange={handleSearchChange}
                        autoComplete="off"
                    />
                </div>

                {/* Search Results */}
                {showResults && (
                    <div
                        ref={resultsContainerRef}
                        className="results-container"
                        style={{ position: 'relative', marginTop: '5px' }}
                    >
                        <div style={customStyles.searchResults}>
                            {/* Close Button */}
                            <button
                                onClick={closeResults}
                                style={customStyles.closeBtn}
                                onMouseOver={(e) => {
                                    (e.target as HTMLElement).style.color = '#495057';
                                    (e.target as HTMLElement).style.background = '#f8f9fa';
                                }}
                                onMouseOut={(e) => {
                                    (e.target as HTMLElement).style.color = '#6c757d';
                                    (e.target as HTMLElement).style.background = '#fff';
                                }}
                            >
                                ×
                            </button>

                            {/* Results List */}
                            {filteredUsers.length === 0 ? (
                                <div className="p-3 text-center text-muted">
                                    No users found
                                </div>
                            ) : (
                                filteredUsers.map((user, index) => (
                                    <div
                                        key={user.id}
                                        className="d-flex align-items-center user-item"
                                        style={{
                                            ...customStyles.userItem,
                                            borderBottom: index === filteredUsers.length - 1 ? 'none' : '1px solid #dee2e6'
                                        }}
                                        onClick={() => toggleUser(user.id)}
                                        onMouseOver={(e) => {
                                            (e.target as HTMLElement).style.backgroundColor = '#f8f9fa';
                                        }}
                                        onMouseOut={(e) => {
                                            (e.target as HTMLElement).style.backgroundColor = isUserSelected(user.id) ? '#e3f2fd' : 'transparent';
                                        }}
                                    >
                                        <img
                                            src={user.avatar}
                                            alt={user.firstName + " " + user.lastName}
                                            className="me-3"
                                            style={customStyles.userThumbnail}
                                        />
                                        <div className="flex-grow-1">
                                            <p
                                                className="mb-0 user-name"
                                                style={isUserSelected(user.id) ? customStyles.selectedUserName : { fontWeight: '500', margin: 0 }}
                                            >
                                                {user.firstName + " " + user.lastName}
                                            </p>
                                            {/* <p className="mb-0" style={{ fontSize: '0.875rem', color: '#6c757d', margin: 0 }}>
                                                {user.email}
                                            </p> */}
                                        </div>
                                        <div className="form-check">
                                            <input
                                                className="form-check-input"
                                                type="checkbox"
                                                id={`user_${user.id}`}
                                                checked={isUserSelected(user.id)}
                                                onChange={() => toggleUser(user.id)}
                                                onClick={(e) => e.stopPropagation()}
                                            />
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                )}
            </div>

        </>
    );
};
