# Charity Compass

Charity Compass is an open-source platform that allows users to locate and donate to charities online according to their philanthropic interests. Built on the MERN stack, it aims to connect generous donors with deserving organizations efficiently and securely.

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
- [Usage](#usage)
- [Project Improvements](#project-improvements)
- [Contributing](#contributing)
- [Contact](#contact)

## Features

- **Online Donations**: Secure donations through the Razorpay payment gateway.
- **Cloud Media Management**: Efficient media upload and management using Express file upload and Cloudinary.
- **Secure Authentication**: JSON Web Tokens (JWT) for robust authentication and authorization.
- **Client-Side Routing**: Smooth navigation with React Router.

## Tech Stack

- **Frontend**: React, React Router
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Media Management**: Cloudinary
- **Authentication**: JSON Web Tokens (JWT)
- **Payments**: Razorpay APIs

## Installation

1. **Clone the repository**:
    ```sh
    git clone https://github.com/yourusername/charity-compass.git
    cd charity-compass
    ```

2. **Install dependencies**:
    ```sh
    # For backend
    cd server
    npm install

    # For frontend
    cd ../client
    npm install
    ```

3. **Configure environment variables**:
   Create a `.env` file in the `server` directory and add the necessary environment variables.

4. **Run the application**:
    ```sh
    # Start backend server
    cd server
    npm start

    # Start frontend server
    cd ../client
    npm start
    ```

## Usage

1. **Locate Charities**: Users can browse and locate charities that match their philanthropic interests.
2. **Donate Online**: Securely donate to chosen charities using Razorpay.
3. **Manage Media**: Upload and manage images and documents efficiently through the platform.
4. **Authentication**: Secure login and access to personalized user features.

## Project Improvements

- **Form Management**: Implementing `react-hook-form` for efficient and uncontrolled form management.
- **Organization Listing**: Developing RESTful APIs to allow organizations to list their NGOs directly on the web app.
- **Profile Management**: Adding APIs to enable users to update their profile information.

## Contributing

We welcome contributions to enhance Charity Compass. Please follow these steps:

1. Fork the repository.
2. Create your feature branch (`git checkout -b feature/AmazingFeature`).
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`).
4. Push to the branch (`git push origin feature/AmazingFeature`).
5. Open a Pull Request.

## Contact

- **Project Link**: [https://github.com/ayush-mamgain/charity-compass](https://github.com/ayush-mamgain/charity-finder)
- **Email**: ayushmamgain1234@gmail.com
- 
