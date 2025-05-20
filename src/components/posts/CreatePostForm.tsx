import { useState, FormEvent } from 'react';
import { Plus, X } from 'lucide-react';
import { PostType } from '../../types';
import { usePostStore } from '../../stores/postStore';
import { TAGS } from '../../data/mockData';

interface CreatePostFormProps {
  organizationId: string;
  onClose: () => void;
}

const CreatePostForm = ({ organizationId, onClose }: CreatePostFormProps) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [type, setType] = useState<PostType>('general');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [eventDate, setEventDate] = useState('');
  const [deadlineDate, setDeadlineDate] = useState('');
  
  const { createPost } = usePostStore();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    
    createPost(
      title,
      content,
      organizationId,
      type,
      selectedTags,
      eventDate ? new Date(eventDate) : undefined,
      deadlineDate ? new Date(deadlineDate) : undefined
    );
    
    onClose();
  };

  const toggleTag = (tagId: string) => {
    if (selectedTags.includes(tagId)) {
      setSelectedTags(selectedTags.filter(id => id !== tagId));
    } else {
      setSelectedTags([...selectedTags, tagId]);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center border-b p-4">
          <h2 className="text-xl font-bold">Create New Post</h2>
          <button
            onClick={onClose}
            className="p-1 rounded-full hover:bg-gray-100"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="p-4">
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Post Type
            </label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
              <button
                type="button"
                onClick={() => setType('general')}
                className={`px-3 py-2 rounded-md text-sm font-medium transition ${
                  type === 'general'
                    ? 'bg-gray-200 text-gray-800'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                General
              </button>
              <button
                type="button"
                onClick={() => setType('event')}
                className={`px-3 py-2 rounded-md text-sm font-medium transition ${
                  type === 'event'
                    ? 'bg-blue-200 text-blue-800'
                    : 'bg-blue-50 text-blue-600 hover:bg-blue-100'
                }`}
              >
                Event
              </button>
              <button
                type="button"
                onClick={() => setType('scholarship')}
                className={`px-3 py-2 rounded-md text-sm font-medium transition ${
                  type === 'scholarship'
                    ? 'bg-green-200 text-green-800'
                    : 'bg-green-50 text-green-600 hover:bg-green-100'
                }`}
              >
                Scholarship
              </button>
              <button
                type="button"
                onClick={() => setType('announcement')}
                className={`px-3 py-2 rounded-md text-sm font-medium transition ${
                  type === 'announcement'
                    ? 'bg-amber-200 text-amber-800'
                    : 'bg-amber-50 text-amber-600 hover:bg-amber-100'
                }`}
              >
                Announcement
              </button>
            </div>
          </div>
          
          <div className="mb-4">
            <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
              Title *
            </label>
            <input
              id="title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="input"
              placeholder="Enter post title"
              required
            />
          </div>
          
          <div className="mb-4">
            <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-1">
              Content *
            </label>
            <textarea
              id="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="input min-h-[120px]"
              placeholder="Enter post content"
              required
            />
          </div>
          
          {type === 'event' && (
            <div className="mb-4">
              <label htmlFor="eventDate" className="block text-sm font-medium text-gray-700 mb-1">
                Event Date and Time
              </label>
              <input
                id="eventDate"
                type="datetime-local"
                value={eventDate}
                onChange={(e) => setEventDate(e.target.value)}
                className="input"
              />
            </div>
          )}
          
          {(type === 'scholarship' || type === 'event') && (
            <div className="mb-4">
              <label htmlFor="deadlineDate" className="block text-sm font-medium text-gray-700 mb-1">
                {type === 'scholarship' ? 'Application Deadline' : 'Registration Deadline'}
              </label>
              <input
                id="deadlineDate"
                type="datetime-local"
                value={deadlineDate}
                onChange={(e) => setDeadlineDate(e.target.value)}
                className="input"
              />
            </div>
          )}
          
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Tags
            </label>
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
          
          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="btn btn-secondary"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn btn-primary flex items-center"
            >
              <Plus className="h-4 w-4 mr-1" />
              Create Post
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreatePostForm;