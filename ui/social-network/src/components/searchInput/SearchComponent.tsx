import React, { useState, useEffect, useRef, useCallback } from 'react';
// import "./SearchInput.css"
// TypeScript interfaces
interface SearchItem {
  id: number;
  title: string;
  description: string;
  category: string;
  icon: string;
  color: string;
  tags?: string[];
}

interface SearchProps {
  data: SearchItem[];
  placeholder?: string;
  onSelect?: (item: SearchItem) => void;
  maxResults?: number;
  debounceMs?: number;
  popularTags?: string[];
  handleSearch?: (query: string) => void
}

interface SearchResultsProps {
  results: SearchItem[];
  query: string;
  selectedIndex: number;
  onSelect: (item: SearchItem) => void;
  isLoading: boolean;
}

interface SearchStatsProps {
  count: number;
  query: string;
}

// Sample data
const sampleData: SearchItem[] = [
  {
    id: 1,
    title: "JavaScript Fundamentals",
    description: "Learn the basics of JavaScript programming language including variables, functions, and DOM manipulation.",
    category: "Programming",
    icon: "💻",
    color: "#f39c12",
    tags: ["javascript", "programming", "web"]
  },
  {
    id: 2,
    title: "React Components Guide",
    description: "Complete guide to building reusable React components with hooks and state management.",
    category: "Framework",
    icon: "⚛️",
    color: "#61dafb",
    tags: ["react", "components", "hooks"]
  },
  {
    id: 3,
    title: "TypeScript Advanced Types",
    description: "Deep dive into TypeScript's advanced type system and generic programming concepts.",
    category: "Programming",
    icon: "🔷",
    color: "#3178c6",
    tags: ["typescript", "types", "generics"]
  },
  {
    id: 4,
    title: "Node.js Backend Development",
    description: "Build scalable backend applications with Node.js, Express, and MongoDB.",
    category: "Backend",
    icon: "🟢",
    color: "#339933",
    tags: ["nodejs", "backend", "express"]
  },
  {
    id: 5,
    title: "Bootstrap Responsive Design",
    description: "Master responsive web design using Bootstrap grid system and utility classes.",
    category: "CSS Framework",
    icon: "🎨",
    color: "#7952b3",
    tags: ["bootstrap", "css", "responsive"]
  },
  {
    id: 6,
    title: "Python Data Science",
    description: "Data analysis and visualization using Python, Pandas, and Matplotlib libraries.",
    category: "Data Science",
    icon: "🐍",
    color: "#3776ab",
    tags: ["python", "data", "pandas"]
  },
  {
    id: 7,
    title: "REST API Design",
    description: "Best practices for designing and building RESTful APIs with proper HTTP methods.",
    category: "API",
    icon: "🔗",
    color: "#28a745",
    tags: ["api", "rest", "http"]
  },
  {
    id: 8,
    title: "Database Optimization",
    description: "Techniques for optimizing database queries and improving application performance.",
    category: "Database",
    icon: "🗄️",
    color: "#dc3545",
    tags: ["database", "sql", "optimization"]
  },
  {
    id: 9,
    title: "Vue.js Framework",
    description: "Progressive JavaScript framework for building user interfaces and single-page applications.",
    category: "Framework",
    icon: "💚",
    color: "#4fc08d",
    tags: ["vue", "framework", "spa"]
  },
  {
    id: 10,
    title: "Git Version Control",
    description: "Master Git workflows, branching strategies, and collaborative development practices.",
    category: "Tools",
    icon: "📂",
    color: "#f05032",
    tags: ["git", "version", "control"]
  }
];

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
  isLoading
}) => {
  if (isLoading) {
    return (
      <div className="position-absolute top-100 start-0 end-0 bg-white rounded border shadow mt-2 z-3">
        <LoadingSpinner />
      </div>
    );
  }

  if (results.length === 0 && query.trim()) {
    return (
      <div className="position-absolute top-100 start-0 end-0 bg-white rounded border shadow mt-2 z-3">
        <NoResults query={query} />
      </div>
    );
  }

  if (results.length === 0) return null;

  return (
    <div className="list-group position-absolute w-100 mt-1 shadow-sm z-3 bg-white">
      {results.length === 0 ? (
        <div className="list-group-item text-center py-3 text-muted">
          No results found for "{query}"
        </div>
      ) : (
        results.map((item, index) => (
          <button
            key={item.id}
            className={`list-group-item list-group-item-action ${index === selectedIndex ? 'active' : ''}`}
            onClick={(e) => {
              e.preventDefault()
              alert("fuck")
            }}
          >
            <div className="d-flex align-items-center gap-3">
              <span
                className="badge rounded-pill text-white"
                style={{ backgroundColor: item.color }}
              >
                {item.icon}
              </span>
              <div className="text-start">
                <div dangerouslySetInnerHTML={{ __html: highlightText(item.title, query) }} />
                <small className="text-muted" dangerouslySetInnerHTML={{ __html: highlightText(item.description, query) }} />
                <div>
                  <span className="badge bg-light text-dark mt-1">{item.category}</span>
                </div>
              </div>
            </div>
          </button>
        ))
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
  data = sampleData,
  placeholder = "Search for anything...",
  onSelect,
  handleSearch,
  maxResults = 10,
  debounceMs = 500,
  popularTags = ["JavaScript", "React", "TypeScript", "Node.js", "Python", "CSS", "API", "Database"]
}) => {
  const [query, setQuery] = useState<string>('');
  const [results, setResults] = useState<SearchItem[]>([]);
  const [selectedIndex, setSelectedIndex] = useState<number>(-1);
  const [showResults, setShowResults] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const searchInputRef = useRef<HTMLInputElement>(null);
  const debounceRef = useRef<ReturnType<typeof setTimeout>>(null);

  // Debounced search function
  const performSearch = useCallback((searchQuery: string) => {
    if (!searchQuery.trim()) {
      setResults([]);
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
      handleSearch(searchQuery.toLocaleLowerCase())
      console.log("query: ", query)
      setSelectedIndex(-1);
      setShowResults(true);
      setIsLoading(false);
    }, 500);
  }, [data, maxResults]);

  // Handle input change with debouncing
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);

    // Clear previous timeout
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }

    // Set new timeout
    debounceRef.current = setTimeout(() => {
      performSearch(value);
    }, debounceMs);
  };

  // Handle keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!showResults || results.length === 0) return;

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setSelectedIndex(prev => Math.min(prev + 1, results.length - 1));
        break;
      case 'ArrowUp':
        e.preventDefault();
        setSelectedIndex(prev => Math.max(prev - 1, -1));
        break;
      case 'Enter':
        e.preventDefault();
        if (selectedIndex >= 0 && results[selectedIndex]) {
          handleSelect(results[selectedIndex]);
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
      alert(`Selected: ${item.title}\n\n${item.description}`);
    }
  };

  // Handle clear
  const handleClear = () => {
    setQuery('');
    setResults([]);
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
    if (query.trim() && results.length > 0) {
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
          <SearchResults
            results={results}
            query={query}
            selectedIndex={selectedIndex}
            onSelect={handleSelect}
            isLoading={isLoading}
          />
        )}
      </div>
    </div>
  );
};

export default SearchComponent;