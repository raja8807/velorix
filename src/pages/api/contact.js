// API endpoint for contact form submission
export default function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { name, email, message } = req.body;

    // Validate required fields
    if (!name || !email || !message) {
      return res.status(400).json({ 
        message: 'Missing required fields: name, email, and message are required' 
      });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ 
        message: 'Invalid email format' 
      });
    }

    // Log the contact form data (in production, you would save this to a database)
    console.log('New Contact Form Submission:', {
      timestamp: new Date().toISOString(),
      name,
      email,
      message
    });

    // In a real application, you would:
    // 1. Save the data to a database
    // 2. Send notification emails to the couple
    // 3. Send auto-reply confirmation to the sender
    // 4. Integrate with customer support systems

    // Simulate processing time
    setTimeout(() => {
      res.status(200).json({ 
        message: 'Message sent successfully. We\'ll get back to you soon!',
        data: {
          name,
          email,
          submittedAt: new Date().toISOString()
        }
      });
    }, 1000);

  } catch (error) {
    console.error('Contact API Error:', error);
    res.status(500).json({ 
      message: 'Internal server error. Please try again later.' 
    });
  }
}
