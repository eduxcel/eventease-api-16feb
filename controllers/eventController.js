// eventController.js
const Event = require('../models/Event');
const User = require('../models/User');
    
export const createEvent = (eventData, token) => async (dispatch) => {
  try {
    const res = await axios.post('https://eventease-api-29dec.onrender.com/api/events/create', eventData, {
      headers: { 'x-auth-token': token }
    });
    dispatch({ type: CREATE_EVENT, payload: res.data });
  } catch (err) {
    console.error('Error creating event:', err);
    // You might want to dispatch an error action here or handle it appropriately
  }
};


ChatGPT said:
exports.getEvents = async (req, res) => {
    try {
        const events = await Event.find({ user: req.user._id });
        console.log('Events fetched for user:', req.user._id, events);
        res.status(200).json(events);
    } catch (error) {
        console.error('Error fetching events:', error);
        res.status(500).json({ error: 'Failed to fetch events' });
    }
};

exports.updateEvent = async (req, res) => {
    const { id } = req.params;
    const { title, description, participants, date, time, duration, sessionNotes } = req.body;

    try {
        const event = await Event.findById(id);

        if (!event) {
            return res.status(404).json({ message: 'Event not found' });
        }

        if (event.user.toString() !== req.user._id.toString()) {
            return res.status(401).json({ message: 'Not authorized' });
        }

        event.title = title;
        event.description = description;
        event.participants = participants;
        event.date = date;
        event.time = time;
        event.duration = duration;
        event.sessionNotes = sessionNotes;

        await event.save();
        console.log('Event updated:', event);
        res.status(200).json(event);
    } catch (error) {
        console.error('Error updating event:', error);
        res.status(500).json({ error: 'Failed to update event' });
    }
};

exports.deleteEvent = async (req, res) => {
    const { id } = req.params;

    try {
        const event = await Event.findById(id);

        if (!event) {
            return res.status(404).json({ message: 'Event not found' });
        }

        if (event.user.toString() !== req.user._id.toString()) {
            return res.status(401).json({ message: 'Not authorized' });
        }

        await event.deleteOne(); // Use deleteOne() method to remove the document
        console.log('Event deleted:', event);
        res.status(200).json({ message: 'Event deleted' });
    } catch (error) {
        console.error('Error deleting event:', error);
        res.status(500).json({ error: 'Failed to delete event' });
    }
};

