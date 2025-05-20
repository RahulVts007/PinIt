import { useEffect, useState } from 'react';
import { format } from 'date-fns';
import { AlarmClock, Check, X } from 'lucide-react';
import { useReminderStore } from '../../stores/reminderStore';
import { usePostStore } from '../../stores/postStore';

const RemindersList = () => {
  const { getUserReminders, toggleReminderCompletion, deleteReminder } = useReminderStore();
  const { getPost } = usePostStore();
  const [reminders, setReminders] = useState(getUserReminders());
  
  useEffect(() => {
    setReminders(getUserReminders());
  }, [getUserReminders]);
  
  if (reminders.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-sm border p-6 text-center">
        <AlarmClock className="h-10 w-10 mx-auto text-gray-300 mb-2" />
        <h3 className="text-lg font-medium text-gray-700">No reminders</h3>
        <p className="text-gray-500 text-sm mt-1">
          You don't have any reminders set. Add reminders to posts to stay on track!
        </p>
      </div>
    );
  }
  
  return (
    <div className="bg-white rounded-lg shadow-sm border divide-y">
      <div className="p-4">
        <h3 className="font-medium text-lg">Your Reminders</h3>
      </div>
      
      <div className="max-h-[400px] overflow-y-auto">
        {reminders.map(reminder => {
          const post = getPost(reminder.postId);
          const isPast = new Date(reminder.date) < new Date();
          
          return (
            <div 
              key={reminder.id} 
              className={`p-4 ${
                reminder.isCompleted 
                  ? 'bg-gray-50 opacity-70' 
                  : isPast 
                    ? 'bg-amber-50' 
                    : 'bg-white'
              }`}
            >
              <div className="flex justify-between">
                <div>
                  <h4 className={`font-medium ${reminder.isCompleted ? 'line-through text-gray-500' : ''}`}>
                    {reminder.title}
                  </h4>
                  
                  {reminder.description && (
                    <p className="text-sm text-gray-600 mt-1">
                      {reminder.description}
                    </p>
                  )}
                  
                  {post && (
                    <p className="text-xs text-gray-500 mt-1">
                      From post: {post.title}
                    </p>
                  )}
                  
                  <p className={`text-sm mt-2 flex items-center ${
                    isPast && !reminder.isCompleted 
                      ? 'text-red-600 font-medium' 
                      : 'text-gray-600'
                  }`}>
                    <AlarmClock className="h-3 w-3 mr-1" />
                    {format(new Date(reminder.date), 'MMM d, yyyy - h:mm a')}
                    {isPast && !reminder.isCompleted && ' (Overdue)'}
                  </p>
                </div>
                
                <div className="flex space-x-1">
                  <button
                    onClick={() => toggleReminderCompletion(reminder.id)}
                    className={`p-1.5 rounded-full ${
                      reminder.isCompleted
                        ? 'bg-green-100 text-green-600'
                        : 'bg-gray-100 text-gray-600 hover:bg-green-100 hover:text-green-600'
                    }`}
                    title={reminder.isCompleted ? 'Mark as incomplete' : 'Mark as complete'}
                  >
                    <Check className="h-4 w-4" />
                  </button>
                  
                  <button
                    onClick={() => deleteReminder(reminder.id)}
                    className="p-1.5 rounded-full bg-gray-100 text-gray-600 hover:bg-red-100 hover:text-red-600"
                    title="Delete reminder"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default RemindersList;