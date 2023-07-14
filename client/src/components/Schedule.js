import React, { useEffect, useState, useCallback, useContext } from 'react'; // Import useContext
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import UserInvite from './UserInvite';
import { AppContext } from '../context/AppC';
import 'react-big-calendar/lib/css/react-big-calendar.css';

const localizer = momentLocalizer(moment);

const Schedule = () => {
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const { user } = useContext(AppContext); // Use useContext with AppContext

  const fetchEvents = useCallback(() => {
    const fetchUrl = `/events?user_id=${user.id}`;

    fetch(fetchUrl)
      .then(response => response.json())
      .then(data => {
        const editableEvents = data.map(event => ({
          ...event,
          isEditable: true,
          username: event.users.length > 0 ? event.users[0].username : "Unknown User"
        }));
        setEvents(editableEvents);
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }, [user]);

  useEffect(() => {
    fetchEvents();
  }, [fetchEvents]);

  const handleEventSelect = event => {
    if (event.isEditable) {
      setSelectedEvent(event);
    }
  };

  const handleInviteUser = user => {
    if (selectedEvent && selectedEvent.id) {
      const updatedEvent = { ...selectedEvent };
      updatedEvent.user_ids = updatedEvent.user_ids || [];
      updatedEvent.user_ids.push(user.id);

      fetch(`/events/${selectedEvent.id}`, {
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
  };

  const handleEventDrop = event => {
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
        user_ids: [user.id]
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
      <UserInvite onInvite={handleInviteUser} />

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
        defaultView="month"
      />

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

      {/* Print the events with the username */}
      <div>
        {events.map(event => (
          <div key={event.id}>
            <span>{event.title} - Created by: {event.username}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Schedule;
