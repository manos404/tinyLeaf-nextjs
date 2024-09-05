# Tiny-Leaf App
[Try it](https://tiny-leaf-nextjs.vercel.app/)
 
## Description
The **Tiny-Leaf App** is a full-stack web application designed for a tea shop, allowing customers to easily make reservations online. 
The application provides a user-friendly experience by directly interacting with a PostgreSQL database hosted on Vercel to store reservations and retrieve the menu. 
This architecture offers a streamlined solution without requiring a traditional backend server, ensuring seamless management of seat availability and menu updates 
through the Vercel-managed database.

## Features
- **User-Friendly Reservation System**: Customers can easily view available time slots and make reservations through the website.
- **Real-Time Availability**: The app directly queries the database to ensure up-to-date availability for reservations.
- **Custom Form Validation**: The reservation form includes custom validation to ensure accurate and complete user input.
- **Dynamic Animations**: The app uses **GSAP** (GreenSock Animation Platform) to create smooth and engaging animations, enhancing the user experience.
- **Image Carousel**: Integrated with **React Slick** to display an interactive image carousel.
- **Responsive Design**: Fully responsive design to ensure optimal usability across both desktop and mobile devices.

## Technologies Used
- **Frontend**:
  - **Next.js**: Used to create fast and efficient web pages and to handle API requests directly.
  - **React.js**: Powers user interface.
  - **GSAP**: Used to create smooth animations throughout the application.
  - **React Slick**: For implementing an image carousel.
- **Database**:
  - **PostgreSQL** on **Vercel**:  Direct interaction with this database to manage and store reservation data, as well as to retrieve the menu.
   This setup ensures efficient handling of data and seamless integration with the application, all hosted on Vercel's platform.

## How It Works: Reservation System

The reservation system in the Tiny-Leaf App operates as follows:

1. **Date Selection and Request**: When the user selects a date for a reservation, the application sends a request to the Amazon RDS MySQL database to retrieve all reservations for that specific day.
  
2. **Calculate Available Time Slots**:
    - The app checks the operating hours of the tea shop for the selected day.
    - It then considers all existing reservations for that day and calculates the available time slots for each table.
    - For each reservation, a table is blocked for a duration of 2 hours. For example, if a reservation is made at 15:00, no other reservation can be made for the same table from 13:30 and the next avaliable slot 
      is on 17:00.

3. **Display Available Time Slots**:
    - After calculating the available slots, the app dynamically updates the time input field, displaying only the time options that are available for reservation.

4. **Booking Confirmation**:
    - Once the user selects an available time slot and submits the reservation, the system checks once more to ensure the slot is still available.
    - If available, the reservation is saved in the database, and the user receives a confirmation.

This process ensures that all reservations are efficiently managed, preventing double bookings and optimizing the tea shop's seating availability.
