# Mytuf

## Overview

This project was developed using **Next.js/React** for the first round of the TakeUforward Software Engineering hiring process. It allows users to manage promotional banners with countdown timers and to create, edit, and manage flashcards under various topics. The aim is to provide an interactive platform for both promotional content and educational resources.

## Features

### Banner

#### Frontend

- **Dynamic Display**: When a banner is enabled, it will show on the frontend, and it will be hidden when disabled. Additionally, when the countdown reaches zero, the banner automatically gets hidden.
- **Customization**: The banner includes a countdown, a description, and a link.

#### Management

- **Customizable Countdown Timer**: Set a countdown timer for promotional banners that can be displayed across the application. The timer is fully customizable to meet specific promotional needs.
- **Dashboard Management**: Manage the banner through the dashboard, where you can enable or disable banners and set their visibility duration. No need to refresh the page after updating, thanks to effective state management.

### Flashcard

#### Frontend

- **Display**: Topics and flashcards are shown on the frontend, grouped under user-created topics, which are represented by unique slugs. The flashcard interface is designed for ease of use with smooth transitions between cards.

#### Management

- **CRUD Operations**: Add, edit, and delete flashcards within a selected topic. This can be managed through a dedicated dashboard section.
- **AI-Powered Flashcard Generation**: Automatically generate flashcards using AI under the selected topic.
- **Responsive Design**: The dashboard is designed to be fully responsive, ensuring a seamless experience across all devices.
- **Real-Time Updates**: No need to refresh the page after updates, thanks to effective state management.

## Backend

Backend REST APIs are located in the [Backend](https://github.com/besaoct/mytuf/tree/main/src/app) folder.

```files
src/app/api/
├── banner/
│   ├── get-banner/
│   │   └── route.ts
│   └── save-banner/
│       └── route.ts
└── flashcards/
    ├── ai/
    │   └── route.ts
    ├── create/
    │   └── route.ts
    ├── delete-card/
    │   └── [id]/
    │       └── route.ts
    ├── edit-card/
    │   └── [id]/
    │       └── route.ts
    ├── topics/
    │   ├── create-topic/
    │   │   └── route.ts
    │   ├── delete-topic/
    │   │   └── [id]/
    │   │       └── route.ts
    │   ├── edit-topic/
    │   │   └── [id]/
    │   │       └── route.ts
    │   └── route.ts
    └── topics-with-cards/
        └── route.ts
```

## Technologies Used

- **Next.js**: Framework for building the frontend.
- **Tailwind CSS**: Used for styling, providing a clean and modern look.
- **MySQL**: Database used for storing topics and flashcards data.
- **React Icons**: Icons used for UI navigation and interaction.
- **Google Generative AI**: Integrated for creating flashcards content.
- **React Hooks**: Used for state management and handling side effects in the application.

## Installation and Setup

1. **Clone the repository**:

   ```bash
   git clone https://github.com/besaoct/mytuf.git
   cd mytuf
   ```

2. **Install dependencies**:

   ```bash
   npm install
   ```

3. **Set up environment variables**: Create a `.env` file in the root directory and configure the following variables:

   ```bash
   DB_HOST=''
   DB_PORT=''
   DB_USER=''
   DB_NAME=''
   DB_PASSWORD=''
   GEMINI_API_KEY=''
   ```

4. **Run the development server**:

   ```bash
   npm run dev
   ```

5. **Access the application**:
   Open [http://localhost:3000](http://localhost:3000) in your browser to view the application.

## Usage

- **Manage Banners**: Access the banner settings from the dashboard, configure the countdown timer, and toggle the banner display on or off.
- **Create Topics**: Navigate to the Topic Management section to create new topics that will group flashcards.
- **Add/Edit Flashcards**: Within each topic, add new flashcards or edit existing ones. The flashcard interface allows for easy navigation and management.
- **Use AI for Flashcards**: Utilize the AI generation feature to quickly create flashcards based on input topics or descriptions.

## Contributing

Contributions are welcome! Please submit a pull request or open an issue for any features, enhancements, or bug fixes.

## License

This project is licensed under the MIT License.
