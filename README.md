
# EspyVid
EspyVid is a video streaming web application where users can select or search videos to watch. The web app built using React.js with integration of YouTube API to show videos and provide an experience similar to YouTube. The app depends on Tanstack Query to cache network call and reduce the number of requests to the API, React Router to enable "client side routing", react hooks and context api to manage app state, a responsive design, and dark mode.

## DEMO
Visit the live demo of EspyVid at:
[espyvid.vercel.app](https://espyvid.vercel.app/)

## Tech Stack
- React.js
- React Query
- React Router

## Features

### **YouTube API Integration**

The web app uses the YouTube API to show videos and provide a user experience similar to YouTube. The integration with the YouTube API ensures that the application has access to a vast library of videos, making it a comprehensive video streaming platform.

### **Client Side Routing**
The web app uses React Router to enable "client side routing", which allows the app to update the URL from a link click without making another request for another document from the server. Instead, the app can immediately render some new UI and make data requests with "fetch" to update the page with new information.

### **Cache Network Calls using React Query**

The web app uses React Query to cache network calls, which helps reduce the number of requests to the API. Caching network calls ensures that the application runs faster and improves the overall user experience.

#### **Responsive Design**

The web app has been designed to work seamlessly across multiple devices using CSS advance flex grid system, including desktops, tablets, and mobile phones. The responsive design ensures that the application can adapt to different screen sizes and resolutions.

#### **Dark Mode**

The web app comes with a built-in dark mode feature that allows users to switch between light and dark modes based on their preference. The dark mode feature enhances the user experience and reduces eye strain, especially when viewing videos at night.
