
export interface Event {
  id: string;
  title: string;
  organizer: string;
  date: string;
  location: string;
  virtual: boolean;
  image: string;
  description: string;
  categories: string[];
  registrationUrl: string;
  registrationDeadline: string;
  attendees: number;
  free: boolean;
  price?: string;
}

export const upcomingEvents: Event[] = [
  {
    id: "1",
    title: "NVIDIA GTC 2024",
    organizer: "NVIDIA",
    date: "March 18-21, 2024",
    location: "San Jose, CA",
    virtual: true,
    image: "https://images.unsplash.com/photo-1617802690992-15d93263d3a9?q=80&w=2070&auto=format&fit=crop",
    description: "Join the premier AI conference for developers, researchers, and innovators. Learn about the latest breakthroughs in AI, data science, accelerated computing, and graphics.",
    categories: ["AI", "Deep Learning", "GPU", "Technology"],
    registrationUrl: "https://www.nvidia.com/gtc/",
    registrationDeadline: "March 10, 2024",
    attendees: 12000,
    free: false,
    price: "$499"
  },
  {
    id: "2",
    title: "TensorFlow Dev Summit",
    organizer: "Google",
    date: "April 5-6, 2024",
    location: "Mountain View, CA",
    virtual: true,
    image: "https://images.unsplash.com/photo-1591267990532-e5bdb1b0ceb8?q=80&w=2070&auto=format&fit=crop",
    description: "Connect with the TensorFlow team and machine learning practitioners to learn, share, and discuss the latest in machine learning technology.",
    categories: ["TensorFlow", "Machine Learning", "AI"],
    registrationUrl: "https://www.tensorflow.org/dev-summit",
    registrationDeadline: "March 25, 2024",
    attendees: 8000,
    free: true
  },
  {
    id: "3",
    title: "AWS re:Invent",
    organizer: "Amazon Web Services",
    date: "December 2-6, 2024",
    location: "Las Vegas, NV",
    virtual: false,
    image: "https://images.unsplash.com/photo-1599596567771-a8a1d9a757d8?q=80&w=2070&auto=format&fit=crop",
    description: "The largest gathering of the global cloud computing community, featuring keynotes, training sessions, and workshops on AWS services, innovations, and more.",
    categories: ["Cloud Computing", "AWS", "DevOps"],
    registrationUrl: "https://reinvent.awsevents.com/",
    registrationDeadline: "November 15, 2024",
    attendees: 65000,
    free: false,
    price: "$1,799"
  },
  {
    id: "4",
    title: "Microsoft Build",
    organizer: "Microsoft",
    date: "May 21-23, 2024",
    location: "Seattle, WA",
    virtual: true,
    image: "https://images.unsplash.com/photo-1585909695284-32d2985ac9c0?q=80&w=2070&auto=format&fit=crop",
    description: "Microsoft's annual developer conference, featuring the latest innovations in AI, cloud technologies, and developer tools.",
    categories: ["Azure", "AI", "Developer Tools"],
    registrationUrl: "https://build.microsoft.com/",
    registrationDeadline: "May 1, 2024",
    attendees: 15000,
    free: false,
    price: "$1,199"
  },
  {
    id: "5",
    title: "PyTorch Conference",
    organizer: "Meta AI",
    date: "October 8-10, 2024",
    location: "San Francisco, CA",
    virtual: true,
    image: "https://images.unsplash.com/photo-1677442135132-180f19707bfc?q=80&w=2070&auto=format&fit=crop",
    description: "Join the PyTorch community to learn about the latest developments, applications, and research in deep learning with PyTorch.",
    categories: ["PyTorch", "Deep Learning", "AI"],
    registrationUrl: "https://pytorch.org/events",
    registrationDeadline: "September 25, 2024",
    attendees: 5000,
    free: true
  },
  {
    id: "6",
    title: "AI Summit",
    organizer: "Informa Tech",
    date: "June 12-13, 2024",
    location: "London, UK",
    virtual: false,
    image: "https://images.unsplash.com/photo-1581091226033-d5c48150dbaa?q=80&w=2070&auto=format&fit=crop",
    description: "The world's leading event focused on the practical applications of AI for enterprise organizations.",
    categories: ["AI", "Business", "Enterprise"],
    registrationUrl: "https://theaisummit.com/",
    registrationDeadline: "May 30, 2024",
    attendees: 7000,
    free: false,
    price: "£999"
  }
];

export const getEventById = (id: string): Event | undefined => {
  return upcomingEvents.find(event => event.id === id);
};

export const chatbotResponses = {
  eventApplication: {
    "NVIDIA GTC": `To apply for NVIDIA GTC:
1. Visit the official GTC website at nvidia.com/gtc
2. Click on the "Register" button
3. Choose your pass type (Full Conference or Virtual)
4. Complete the registration form with your personal and professional information
5. Submit payment if applicable (some passes are free for certain categories)
6. You'll receive a confirmation email with your registration details

For academic discounts, be sure to use your educational email address when registering. Early bird discounts are typically available until about a month before the event.`,
    
    "AI Summit": `To register for the AI Summit in London:
1. Go to theaisummit.com
2. Select the London event from the locations
3. Click "Register Now" and choose your ticket type
4. Complete your profile and professional information
5. Add any optional workshops or masterclasses
6. Proceed to payment
7. You'll receive a confirmation email with your e-ticket

Group discounts are available for teams of 3+ people. Reach out to their sales team for enterprise packages if you're bringing a larger group.`,
    
    "TensorFlow Dev Summit": `The TensorFlow Dev Summit registration process:
1. Visit tensorflow.org/dev-summit
2. Registration is free but space is limited
3. Click "Register" and sign in with your Google account
4. Complete the application form detailing your experience with TensorFlow
5. Registrations are reviewed and accepted on a rolling basis
6. You'll receive an email notification if your registration is approved

For the virtual attendance option, registration is typically open to everyone without an application process.`
  },
  
  eventPreparation: {
    "NVIDIA GTC": `To prepare for NVIDIA GTC:
1. Review the agenda and mark sessions relevant to your interests
2. Download the official event app for real-time updates
3. Join the GTC community forum to connect with other attendees
4. Prepare questions for speakers during Q&A sessions
5. Bring business cards for networking opportunities
6. Review the exhibitor list to plan booth visits
7. Check technical requirements if attending virtually
8. Consider preparing a 30-second elevator pitch for networking

Pro tip: Plan your schedule in advance as popular sessions fill up quickly. Some workshops require separate registration.`,
    
    "AWS re:Invent": `Preparing for AWS re:Invent:
1. Create your personalized agenda through the AWS Events platform
2. Reserve seats for popular sessions as soon as they open
3. Book your hotel early (preferably at one of the event venues)
4. Allow travel time between venues (events are spread across multiple hotels)
5. Wear comfortable shoes as you'll be walking a lot
6. Download the official app for real-time updates and changes
7. Consider AWS certification exams offered during the event
8. Join pre-event webinars to help plan your experience

Note that Las Vegas can have very dry air - stay hydrated throughout the event!`
  },
  
  networking: {
    general: `Tips for networking at tech events:
1. Update your LinkedIn profile before the event
2. Prepare a concise introduction about yourself and your interests
3. Use the event app to find and connect with attendees
4. Attend social mixers and evening events
5. Join breakout sessions and workshops for smaller group interactions
6. Ask thoughtful questions during Q&A sessions
7. Follow up with new connections within 48 hours after the event
8. Join relevant social media groups and hashtags

Remember that quality connections are more valuable than quantity. Focus on meaningful conversations rather than collecting business cards.`,
    
    "Microsoft Build": `Networking opportunities at Microsoft Build:
1. Join the Microsoft Developer Community online before the event
2. Attend the welcome reception on the first evening
3. Participate in hands-on labs for collaborative learning
4. Visit the Microsoft Expert Zone to meet product teams
5. Join Microsoft MVP meetups if available
6. Use the event app's networking feature to find attendees with similar interests
7. Attend the closing party for casual networking
8. Look for regional/country-specific meetups

Microsoft often organizes "ask the experts" sessions which are great for both technical questions and networking with Microsoft engineers.`
  }
};
