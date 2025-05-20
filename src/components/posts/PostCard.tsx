import { useState } from 'react';
import { formatDistanceToNow, format } from 'date-fns';
import { Calendar, AlarmClock, Trash2, Tag, ExternalLink } from 'lucide-react';
import { Post, Tag as TagType } from '../../types';
import { usePostStore } from '../../stores/postStore';
import { useReminderStore } from '../../stores/reminderStore';
import { useAuthStore } from '../../stores/authStore';
import { TAGS } from '../../data/mockData';

interface PostCardProps {
  post: Post;
}

const PostCard = ({ post }: PostCardProps) => {
  const [expanded, setExpanded] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [showReminderForm, setShowReminderForm] = useState(false);
  const [reminderDate, setReminderDate] = useState<string>('');
  const [reminderNote, setReminderNote] = useState('');
  
  const { deletePost } = usePostStore();
  const { createReminder } = useReminderStore();
  const { user } = useAuthStore();
  
  const isCreator = user?.id === post.createdBy;
  
  // Find tag objects for this post
  const postTags = post.tags.map(tagId => 
    TAGS.find(tag => tag.id === tagId)
  ).filter(tag => tag !== undefined) as TagType[];
  
  const toggleExpand = () => {
    setExpanded(!expanded);
  };
  
  const handleDelete = () => {
    if (confirmDelete) {
      deletePost(post.id);
    } else {
      setConfirmDelete(true);
      // Reset confirmation after 5 seconds
      setTimeout(() => setConfirmDelete(false), 5000);
    }
  };
  
  const toggleReminderForm = () => {
    setShowReminderForm(!showReminderForm);
    
    // If showing the form and we have an event date, set it as default
    if (!showReminderForm && post.eventDate) {
      const date = new Date(post.eventDate);
      // Format for datetime-local input (YYYY-MM-DDThh:mm)
      const year = date.getFullYear();
      const month = (date.getMonth() + 1).toString().padStart(2, '0');
      const day = date.getDate().toString().padStart(2, '0');
      const hours = date.getHours().toString().padStart(2, '0');
      const minutes = date.getMinutes().toString().padStart(2, '0');
      
      setReminderDate(`${year}-${month}-${day}T${hours}:${minutes}`);
    }
  };
  
  const handleReminderSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!reminderDate) return;
    
    createReminder(
      post.id, 
      new Date(reminderDate), 
      post.title, 
      reminderNote || `Reminder for: ${post.title}`
    );
    
    // Reset form
    setShowReminderForm(false);
    setReminderDate('');
    setReminderNote('');
  };
  
  const getTypeClasses = () => {
    switch (post.type) {
      case 'event':
        return 'bg-blue-100 text-blue-800';
      case 'scholarship':
        return 'bg-green-100 text-green-800';
      case 'announcement':
        return 'bg-amber-100 text-amber-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="card fade-in">
      <div className="p-4 md:p-6">
        <div className="flex justify-between items-start mb-3">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className={`tag capitalize ${getTypeClasses()}`}>
                {post.type}
              </span>
              
              {post.eventDate && (
                <span className="tag bg-primary-100 text-primary-800 flex items-center">
                  <Calendar className="h-3 w-3 mr-1" />
                  {format(new Date(post.eventDate), 'MMM d, yyyy')}
                </span>
              )}
              
              {post.deadlineDate && (
                <span className="tag bg-red-100 text-red-800 flex items-center">
                  <ExternalLink className="h-3 w-3 mr-1" />
                  Deadline: {format(new Date(post.deadlineDate), 'MMM d, yyyy')}
                </span>
              )}
            </div>
            
            <h3 className="text-xl font-bold text-gray-900">{post.title}</h3>
          </div>
          
          {isCreator && (
            <button 
              onClick={handleDelete}
              className={`p-1.5 rounded-full ${
                confirmDelete 
                  ? 'bg-red-100 text-red-600' 
                  : 'text-gray-400 hover:bg-gray-100 hover:text-gray-600'
              }`}
              title={confirmDelete ? 'Click again to confirm' : 'Delete post'}
            >
              <Trash2 className="h-4 w-4" />
            </button>
          )}
        </div>
        
        <div className={`prose text-gray-700 ${expanded ? '' : 'line-clamp-3'} mb-3`}>
          {post.content}
        </div>
        
        {post.content.length > 120 && (
          <button 
            onClick={toggleExpand}
            className="text-primary-600 hover:text-primary-800 text-sm font-medium mb-3"
          >
            {expanded ? 'Read less' : 'Read more'}
          </button>
        )}
        
        {postTags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {postTags.map(tag => (
              <span 
                key={tag.id} 
                className="tag flex items-center"
                style={{ 
                  backgroundColor: `${tag.color}20`, 
                  color: tag.color 
                }}
              >
                <Tag className="h-3 w-3 mr-1" />
                {tag.name}
              </span>
            ))}
          </div>
        )}
        
        <div className="flex justify-between items-center mt-4 pt-3 border-t border-gray-100">
          <button
            onClick={toggleReminderForm}
            className="text-sm text-gray-500 hover:text-primary-600 flex items-center"
          >
            <AlarmClock className="h-4 w-4 mr-1" />
            Set reminder
          </button>
          
          <div className="text-xs text-gray-400">
            {formatDistanceToNow(new Date(post.createdAt), { addSuffix: true })}
          </div>
        </div>
        
        {showReminderForm && (
          <div className="mt-4 p-3 bg-gray-50 rounded-md">
            <h4 className="text-sm font-medium mb-2">Set Reminder</h4>
            <form onSubmit={handleReminderSubmit}>
              <div className="mb-3">
                <label className="block text-xs text-gray-600 mb-1">
                  Reminder Date and Time
                </label>
                <input 
                  type="datetime-local"
                  value={reminderDate}
                  onChange={(e) => setReminderDate(e.target.value)}
                  className="input text-sm py-1.5 px-2"
                  required
                />
              </div>
              <div className="mb-3">
                <label className="block text-xs text-gray-600 mb-1">
                  Note (optional)
                </label>
                <input 
                  type="text"
                  value={reminderNote}
                  onChange={(e) => setReminderNote(e.target.value)}
                  placeholder="Add a note to your reminder"
                  className="input text-sm py-1.5 px-2"
                />
              </div>
              <div className="flex space-x-2">
                <button 
                  type="submit"
                  className="btn btn-primary text-sm py-1.5"
                >
                  Save
                </button>
                <button 
                  type="button"
                  onClick={toggleReminderForm}
                  className="btn btn-secondary text-sm py-1.5"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default PostCard;