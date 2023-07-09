import React, { useEffect, useState, useCallback } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';

const localizer = momentLocalizer(moment);

const Schedule = () => {
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [userId, setUserId] = useState(null); // Add user ID state
  const [users, setUsers] = useState([]); // Add users state
  const [sharedUserId, setSharedUserId] = useState(null);

  const fetchEvents = useCallback(() => {
    fetch(`/events?user_id=${userId}`)
      .then(response => response.json())
      .then(data => {
        const editableEvents = data.map(event => ({
          ...event,
          isEditable: true // Since the events belong to the current user, they are always editable
        }));
        setEvents(editableEvents);
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }, [userId]);

  useEffect(() => {
    // Set the user ID from your authentication system
    const user = getUser(); // Replace this with your authentication code
    if (user) {
      setUserId(user.id);
    }

    fetchEvents();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fetchEvents]);

  const getUser = () => {
    // Replace this with your actual user authentication logic
    return {
      id: 1, // User ID
      // Other user properties
    };
  };

  const handleInviteUsers = invitedUsers => {
    // Perform any actions needed when users are invited
    console.log('Invited users:', invitedUsers);
    setSharedUserId(invitedUsers);
  };

  const handleEventSelect = event => {
    if (event.isEditable) {
      setSelectedEvent(event);
    }
  };

  const handleEventDrop = event => {
    // Handle event drop logic
    console.log('Dropped event:', event);
    const { id, start, end } = event;
    const updatedEvent = { id, start, end };

    fetch(`/events/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(updatedEvent)
    })
      .then(response => response.json())
      .then(data => {
        console.log('Event updated:', data);
      })
      .catch(error => {
        console.error('Error:', error);
      });
  };

  const handleEventResize = event => {
    // Handle event resize logic
    console.log('Resized event:', event);
    const { id, start, end } = event;
    const updatedEvent = { id, start, end };

    fetch(`/events/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(updatedEvent)
    })
      .then(response => response.json())
      .then(data => {
        console.log('Event updated:', data);
      })
      .catch(error => {
        console.error('Error:', error);
      });
  };

  const handleSelectSlot = ({ start, end }) => {
    const title = prompt('Event Title:');
    if (title) {
      const newEvent = {
        title,
        start,
        end,
        user_id: userId
      };
  
      fetch('/events', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newEvent)
      })
        .then(response => response.json())
        .then(data => {
          console.log('Event created:', data);
          fetchEvents(); // Refresh events after creation
        })
        .catch(error => {
          console.error('Error:', error);
        });
    }
  };
  

  const handleConfirmDelete = () => {
    if (selectedEvent) {
      const { id } = selectedEvent;

      fetch(`/events/${id}`, {
        method: 'DELETE'
      })
        .then(response => {
          if (response.ok) {
            console.log('Event deleted');
            setSelectedEvent(null);
            fetchEvents(); // Refresh events after deletion
          } else {
            console.error('Error deleting event');
          }
        })
        .catch(error => {
          console.error('Error:', error);
        });
    }
  };

  const handleEditEvent = () => {
    if (selectedEvent) {
      const { id, start, end, title } = selectedEvent;
      const updatedTitle = prompt('Enter the updated event title:', title);
      if (updatedTitle) {
        const updatedEvent = {
          id,
          start,
          end,
          title: updatedTitle
        };
  
        fetch(`/events/${id}`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(updatedEvent)
        })
          .then(response => response.json())
          .then(data => {
            console.log('Event updated:', data);
            fetchEvents(); // Refresh events after update
          })
          .catch(error => {
            console.error('Error:', error);
          });
      }
    }
  };

  return (
    <div style={{ height: '500px' }}>

      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        selectable
        onSelectEvent={handleEventSelect}
        onEventDrop={handleEventDrop}
        onEventResize={handleEventResize}
        onSelectSlot={handleSelectSlot}
        style={{ margin: '50px' }}
        views={['month', 'week', 'day', 'agenda']} // Add views prop
        defaultView="month" // Set the default view
      />

      {/* Confirmation Dialog */}
      {selectedEvent && (
        <div className="confirmation-dialog">
          <h3>Confirm Event Deletion</h3>
          <p>Are you sure you want to delete this event?</p>
          {selectedEvent.isEditable && (
            <button className="edit-button bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={handleEditEvent}>
              Edit
            </button>
          )}
          <button className="delete-button bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded" onClick={handleConfirmDelete}>
            Delete
          </button>
          <button className="cancel-button bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded" onClick={() => setSelectedEvent(null)}>
            Cancel
          </button>
        </div>
      )}
    </div>
  );
};

export default Schedule;
