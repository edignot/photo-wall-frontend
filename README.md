# Photo Wall

Photo Wall is a minimalistic app that allows users to create instant picture walls by uploading images. It offers a quick and easy way to build beautiful image collections with minimal setup, perfect for sharing a visual story.

![CleanShot_2024-09-23_at_12 51 49_yfivqw](https://github.com/user-attachments/assets/c3457ae2-ae58-416a-b918-d96bf7b32598)

## Current Features (MVP)

-   Upload photos to create an instant photo wall.
-   Update photo notes and delete photos.

## Future Improvements

-   **User Authentication**: Implementing user authentication will allow users to create personalized accounts and save their picture walls.
-   **Sharing & Interaction**: Users will be able to share their picture walls with others. Additional features like commenting and liking pictures will encourage more interactivity between users.
-   **Enhanced UI/UX**: Improving the interface to provide a smoother experience, including drag-and-drop functionality and customizable layouts for picture walls.

## Built With

-   **React** + **Vite** + **TypeScript**
-   **Redux** for state management
-   **Axios** for HTTP requests
-   **CSS** for styling
-   **Cloudinary API** for image management

## Installation and Setup

1. Clone the repository:
    ```bash
    git clone https://github.com/edignot/photo-wall-frontend.git
    ```
2. Install dependencies:
    ```bash
    npm install
    ```
3. Create a .env file and paste your Cloudinary credentials:
    ```bash
    VITE_CLOUDINARY_CLOUD_NAME=<your_cloudinary_cloud_name>
    VITE_CLOUDINARY_UPLOAD_PRESET=<your_cloudinary_upload_preset>
    ```
4. Run the development server:
    ```bash
    npm run dev
    ```
