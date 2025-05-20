import { useState } from 'react';
import { Search, Filter, X } from 'lucide-react';
import { PostType } from '../../types';
import { TAGS } from '../../data/mockData';

interface PostFilterProps {
  onFilter: (type: PostType | null, tags: string[], search: string) => void;
  activeFilters: {
    type: PostType | null;
    tags: string[];
    search: string;
  };
}

const PostFilter = ({ onFilter, activeFilters }: PostFilterProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [searchTerm, setSearchTerm] = useState(activeFilters.search);
  const [selectedType, setSelectedType] = useState<PostType | null>(activeFilters.type);
  const [selectedTags, setSelectedTags] = useState<string[]>(activeFilters.tags);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    applyFilters();
  };

  const toggleTag = (tagId: string) => {
    if (selectedTags.includes(tagId)) {
      setSelectedTags(selectedTags.filter(id => id !== tagId));
    } else {
      setSelectedTags([...selectedTags, tagId]);
    }
  };

  const selectType = (type: PostType | null) => {
    setSelectedType(type);
  };

  const applyFilters = () => {
    onFilter(selectedType, selectedTags, searchTerm);
  };

  const resetFilters = () => {
    setSelectedType(null);
    setSelectedTags([]);
    setSearchTerm('');
    onFilter(null, [], '');
  };

  const hasActiveFilters = selectedType !== null || selectedTags.length > 0 || searchTerm !== '';

  return (
    <div className="mb-6 bg-white rounded-lg shadow-sm border p-4">
      <form onSubmit={handleSearch} className="relative">
        <input
          type="text"
          placeholder="Search posts..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="input pr-24"
        />
        <div className="absolute right-2 top-2 flex items-center space-x-2">
          <button
            type="button"
            onClick={() => setIsExpanded(!isExpanded)}
            className={`p-1.5 rounded-md ${
              hasActiveFilters
                ? 'bg-primary-100 text-primary-700'
                : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
            }`}
            title="Toggle filters"
          >
            <Filter className="h-4 w-4" />
          </button>
          <button
            type="submit"
            className="p-1.5 rounded-md bg-primary-600 text-white hover:bg-primary-700"
            title="Search"
          >
            <Search className="h-4 w-4" />
          </button>
        </div>
      </form>

      {isExpanded && (
        <div className="mt-4 pt-4 border-t">
          <div className="flex justify-between items-center mb-3">
            <h3 className="font-medium">Filters</h3>
            {hasActiveFilters && (
              <button
                onClick={resetFilters}
                className="text-sm text-red-600 hover:text-red-800 flex items-center"
              >
                <X className="h-3 w-3 mr-1" />
                Reset filters
              </button>
            )}
          </div>
          
          <div className="space-y-4">
            <div>
              <h4 className="text-sm text-gray-700 mb-2">Post Type</h4>
              <div className="flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={() => selectType(null)}
                  className={`tag ${
                    selectedType === null
                      ? 'bg-gray-200 text-gray-800'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  All
                </button>
                <button
                  type="button"
                  onClick={() => selectType('general')}
                  className={`tag ${
                    selectedType === 'general'
                      ? 'bg-gray-700 text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  General
                </button>
                <button
                  type="button"
                  onClick={() => selectType('event')}
                  className={`tag ${
                    selectedType === 'event'
                      ? 'bg-blue-600 text-white'
                      : 'bg-blue-100 text-blue-700 hover:bg-blue-200'
                  }`}
                >
                  Event
                </button>
                <button
                  type="button"
                  onClick={() => selectType('scholarship')}
                  className={`tag ${
                    selectedType === 'scholarship'
                      ? 'bg-green-600 text-white'
                      : 'bg-green-100 text-green-700 hover:bg-green-200'
                  }`}
                >
                  Scholarship
                </button>
                <button
                  type="button"
                  onClick={() => selectType('announcement')}
                  className={`tag ${
                    selectedType === 'announcement'
                      ? 'bg-amber-600 text-white'
                      : 'bg-amber-100 text-amber-700 hover:bg-amber-200'
                  }`}
                >
                  Announcement
                </button>
              </div>
            </div>
            
            <div>
              <h4 className="text-sm text-gray-700 mb-2">Tags</h4>
              <div className="flex flex-wrap gap-2">
                {TAGS.map(tag => (
                  <button
                    key={tag.id}
                    type="button"
                    onClick={() => toggleTag(tag.id)}
                    className={`tag transition-all ${
                      selectedTags.includes(tag.id)
                        ? 'ring-2 ring-offset-1'
                        : ''
                    }`}
                    style={{ 
                      backgroundColor: selectedTags.includes(tag.id) 
                        ? tag.color 
                        : `${tag.color}20`,
                      color: selectedTags.includes(tag.id) ? 'white' : tag.color
                    }}
                  >
                    {tag.name}
                  </button>
                ))}
              </div>
            </div>
            
            <div className="flex justify-end">
              <button
                type="button"
                onClick={applyFilters}
                className="btn btn-primary"
              >
                Apply Filters
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PostFilter;