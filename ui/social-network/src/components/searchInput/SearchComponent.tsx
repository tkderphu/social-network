import React, { useState, useEffect, useRef, useCallback, use } from 'react';
import { useNavigate } from 'react-router';
import { PageResult } from '../../common';
// import "./SearchInput.css"
// TypeScript interfaces
interface SearchItem {
  id: number;
  title: string;
  category?: string;
  thumbnail: string
  tags?: string[];
}

interface SearchProps {
  data: SearchItem[];
  placeholder?: string;
  onSelect?: (item: SearchItem) => void;
  maxResults?: number;
  debounceMs?: number;
  popularTags?: string[];
  path: string
  handleSearch?: (query: string, page: number, limit: number, setPageResult: (pageResult: PageResult<SearchItem>) => void, setStateSearch: () => void) => void

}

interface SearchResultsProps {
  results: PageResult<SearchItem>;
  query: string;
  selectedIndex: number;
  onSelect: (item: SearchItem) => void;
  isLoading: boolean;
  path: string
  onChangePage: () => void
}

interface SearchStatsProps {
  count: number;
  query: string;
}


// Utility function to highlight search terms
const highlightText = (text: string, query: string): string => {
  if (!query.trim()) return text;

  const regex = new RegExp(`(${query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
  return text.replace(regex, '<mark class="bg-yellow-200 px-1 rounded">$1</mark>');
};

// Search Stats Component
const SearchStats: React.FC<SearchStatsProps> = ({ count, query }) => (
  <div className="px-4 py-2 bg-gray-50 border-b text-sm text-gray-600 rounded-t-lg">
    Found {count} result{count !== 1 ? 's' : ''} for "{query}"
  </div>
);

// Loading Spinner Component
const LoadingSpinner: React.FC = () => (
  <div className="d-flex justify-content-center align-items-center py-4">
    <div
      className="spinner-border text-primary"
      role="status"
      style={{ width: '1.5rem', height: '1.5rem', borderWidth: '0.25rem' }}
    >
      <span className="visually-hidden">Loading...</span>
    </div>
  </div>
);

// No Results Component
const NoResults: React.FC<{ query: string }> = ({ query }) => (
  <div className="text-center py-4 px-3">
    <div className="fs-1 mb-3 text-muted">🔍</div>
    <h3 className="h5 fw-semibold text-secondary mb-2">No results found</h3>
    <p className="text-muted">No results found for "{query}". Try different keywords.</p>
  </div>
);

// Search Results Component
const SearchResults: React.FC<SearchResultsProps> = ({
  results,
  query,
  selectedIndex,
  onSelect,
  isLoading,
  onChangePage,
  path
}) => {

  const navigate = useNavigate()
  if (isLoading) {
    return (
      <div className="position-absolute top-100 start-0 end-0 bg-white rounded border shadow mt-2 z-3">
        <LoadingSpinner />
      </div>
    );
  }

  if (results.data.length === 0 && query.trim()) {
    return (
      <div className="position-absolute top-100 start-0 end-0 bg-white rounded border shadow mt-2 z-3">
        <NoResults query={query} />
      </div>
    );
  }

  if (results.data.length === 0) return null;

  return (
    <div className="list-group position-absolute w-100 mt-1 shadow-sm z-3 bg-white">
      {results.data.length === 0 ? (
        <div className="list-group-item text-center py-3 text-muted">
          No results found for "{query}"
        </div>
      ) : (
        <>
          {results.data.map((item, index) => (
            <button
              key={item.id}
              className={`list-group-item list-group-item-action ${index === selectedIndex ? 'active' : ''}`}
              onClick={(e) => {
                e.preventDefault()
                navigate(`${path}/${item.id}`)
              }}
            >
              <div className="d-flex align-items-center gap-3">
                <span
                  className="badge rounded-pill text-white"

                >
                  <img height={50} src={item.thumbnail} />
                </span>
                <div className="text-start">
                  <div dangerouslySetInnerHTML={{ __html: highlightText(item.title, query) }} />
                  {/* <small className="text-muted" dangerouslySetInnerHTML={{ __html: highlightText(item.title, query) }} /> */}
                  <div>
                    <span className="badge bg-light text-dark mt-1">{item.category}</span>
                  </div>
                </div>
              </div>
            </button>
          ))}

          {results.totalPage > results.page && (
            <button className='text-center btn btn-secondary' onClick={() => {
              onChangePage()
            }}>Next</button>
          )}
        </>
      )}
    </div>
  );
};

// Popular Tags Component
const PopularTags: React.FC<{ tags: string[]; onTagClick: (tag: string) => void }> = ({
  tags,
  onTagClick
}) => (
  <div className="mt-4 p-4 bg-white rounded-lg shadow-sm border">
    <h4 className="text-sm font-semibold text-gray-700 mb-3">Popular searches:</h4>
    <div className="flex flex-wrap gap-2">
      {tags.map((tag) => (
        <button
          key={tag}
          onClick={() => onTagClick(tag)}
          className="px-3 py-1 bg-gray-100 hover:bg-blue-500 hover:text-white rounded-full text-sm transition-all duration-200 transform hover:-translate-y-0.5"
        >
          {tag}
        </button>
      ))}
    </div>
  </div>
);

// Main Search Component
const SearchComponent: React.FC<SearchProps> = ({
  data,
  placeholder = "Search for anything...",
  onSelect,
  handleSearch,
  maxResults = 10,
  debounceMs = 500,
  path,
  popularTags = ["JavaScript", "React", "TypeScript", "Node.js", "Python", "CSS", "API", "Database"]
}) => {
  const [query, setQuery] = useState<string>('');
  const [pageResult, setPageResult] = useState<PageResult<SearchItem>>({
    data: [],
    limit: 1,
    page: 1,
    totalPage: 0
  })
  const [selectedIndex, setSelectedIndex] = useState<number>(-1);
  const [showResults, setShowResults] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const searchInputRef = useRef<HTMLInputElement>(null);
  const debounceRef = useRef<ReturnType<typeof setTimeout>>(null);

  // Debounced search function
  const performSearch = useCallback((searchQuery: string) => {
    if (!searchQuery.trim()) {
      setPageResult({
        data: [],
        limit: 1,
        page: 1,
        totalPage: 0
      });
      setShowResults(false);
      setIsLoading(false);
      return;
    }

    setIsLoading(true);

    // Simulate API delay
    setTimeout(() => {
      // const filteredResults = data.filter(item => {
      //   const searchText = `${item.title} ${item.description} ${item.category} ${item.tags?.join(' ') || ''}`.toLowerCase();
      //   return searchText.includes(searchQuery.toLowerCase());
      // }).slice(0, maxResults);

      // setResults(filteredResults);
      handleSearch(searchQuery.toLocaleLowerCase(), pageResult.page, pageResult.limit, (pageResultResp: PageResult<SearchItem>) => {
        setPageResult((prev) => ({
          ...pageResultResp,
          data: [...prev.data, ...pageResultResp.data]
        }))
      }, () => {
        setShowResults(true);
        setIsLoading(false);
      })
      setSelectedIndex(-1);
    }, 500);
  }, [data, maxResults]);



  // useEffect(() => {
  //   //@ts-ignore
  //   if (pageResult.totalPage > pageResult.page) {
  //     handleSearch(searchQ.toLocaleLowerCase(), pageResult.page, pageResult.limit, (pageResultResp: PageResult<SearchItem>) => {
  //       setPageResult((prev) => ({
  //         ...pageResultResp,
  //         data: [...prev.data, ...pageResultResp.data]
  //       }))
  //     }, () => {
  //       setShowResults(true);
  //       setIsLoading(false);
  //     })
  //   }
  // }, [pageResult.page])

  // Handle input change with debouncing
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    setPageResult((prev) => ({
      ...prev,
      page: 1
    }))
    // Clear previous timeout
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }

    // Set new timeout
    debounceRef.current = setTimeout(() => {
      performSearch(value);
    }, debounceMs);
  };


  useEffect(() => {
    if (pageResult.page != 1) {
      handleSearch(query.toLocaleLowerCase(), pageResult.page, pageResult.limit, (pageResultResp: PageResult<SearchItem>) => {
        setPageResult((prev) => ({
          ...pageResultResp,
          data: [...prev.data, ...pageResultResp.data]
        }))
      }, () => {
        setShowResults(true);
        setIsLoading(false);
      })
    }
  }, [pageResult.page])

  // Handle keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!showResults || pageResult.data.length === 0) return;

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setSelectedIndex(prev => Math.min(prev + 1, pageResult.data.length - 1));
        break;
      case 'ArrowUp':
        e.preventDefault();
        setSelectedIndex(prev => Math.max(prev - 1, -1));
        break;
      case 'Enter':
        e.preventDefault();
        if (selectedIndex >= 0 && pageResult.data[selectedIndex]) {
          handleSelect(pageResult.data[selectedIndex]);
        }
        break;
      case 'Escape':
        handleClear();
        break;
    }
  };

  // Handle item selection
  const handleSelect = (item: SearchItem) => {
    setQuery(item.title);
    setShowResults(false);
    if (onSelect) {
      onSelect(item);
    } else {
      alert(`Selected: ${item.id}\n\n${item.title}`);
    }
  };

  // Handle clear
  const handleClear = () => {
    setQuery('');
    setPageResult({
      data: [],
      limit: 30,
      page: 1,
      totalPage: 0
    });
    setShowResults(false);
    setSelectedIndex(-1);
    searchInputRef.current?.focus();
  };

  // Handle tag click
  const handleTagClick = (tag: string) => {
    setQuery(tag);
    performSearch(tag);
    searchInputRef.current?.focus();
  };

  // Handle focus
  const handleFocus = () => {
    if (query.trim() && pageResult.data.length > 0) {
      setShowResults(true);
    }
  };

  // Handle click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchInputRef.current && !searchInputRef.current.closest('.search-container')?.contains(event.target as Node)) {
        setShowResults(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  console.log("result: ", pageResult)
  return (
    <div className='search-container'>
      <div className="position-relative">
        <div className="input-group">
          <span className="input-group-text bg-white border-end-0">
            <i className="bi bi-search"></i>  {/* Bootstrap Icons CDN optional */}
          </span>
          <input
            type="text"
            className="form-control border-start-0"
            placeholder={placeholder}
            value={query}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            onFocus={handleFocus}
            ref={searchInputRef}
          />
          {query && (
            <button className="btn btn-outline-secondary" onClick={handleClear}>
              &times;
            </button>
          )}
        </div>

        {(showResults || isLoading) && (
          <>
            <SearchResults
              results={pageResult}
              query={query}
              selectedIndex={selectedIndex}
              onSelect={handleSelect}
              isLoading={isLoading}
              path={path}
              onChangePage={() => {
                console.log("vai lol")
                setPageResult((prev) => ({
                  ...prev,
                  page: prev.page + 1
                }))
              }}
            />

          </>
        )}
      </div>
    </div>
  );
};

export default SearchComponent;