// API endpoint for RSVP form submission
export default function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const {
      name,
      email,
      phone,
      attending,
      guestCount,
      mealPreference,
      dietaryRestrictions,
      message
    } = req.body;

    // Validate required fields
    if (!name || !email || !attending) {
      return res.status(400).json({ 
        message: 'Missing required fields: name, email, and attending status are required' 
      });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ 
        message: 'Invalid email format' 
      });
    }

    // Log the RSVP data (in production, you would save this to a database)
    console.log('New RSVP Submission:', {
      timestamp: new Date().toISOString(),
      name,
      email,
      phone,
      attending,
      guestCount,
      mealPreference,
      dietaryRestrictions,
      message
    });

    // In a real application, you would:
    // 1. Save the data to a database
    // 2. Send confirmation emails
    // 3. Update guest count statistics
    // 4. Send notifications to the couple

    // Simulate processing time
    setTimeout(() => {
      res.status(200).json({ 
        message: 'RSVP submitted successfully',
        data: {
          name,
          email,
          attending,
          guestCount: attending === 'yes' ? guestCount : '0'
        }
      });
    }, 1000);

  } catch (error) {
    console.error('RSVP API Error:', error);
    res.status(500).json({ 
      message: 'Internal server error. Please try again later.' 
    });
  }
}
