# ScholarPulse Elite

ScholarPulse Elite is a sophisticated attendance and academic management dashboard. It leverages Gemini AI to analyze ERP attendance screenshots and academic calendars, providing students with actionable insights and tracking.

## Features

- **Attendance Analysis**: Upload ERP screenshots to track presence and absence.
- **Academic Calendar Integration**: Extract important dates, exams, and events from calendar images.
- **Dynamic Dashboard**: Visualize your academic progress and stay on top of your schedule.
- **Dark Mode Support**: Premium, cinematic UI with full dark/light mode toggle.

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/Dominus005era/scholarpulse-elite.git
   cd scholarpulse-elite
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Configure environment variables**:
   Create a `.env` file in the root directory (based on `.env.example`):
   ```env
   GEMINI_API_KEY="YOUR_GEMINI_API_KEY"
   APP_URL="http://localhost:3000"
   ```

4. **Run the development server**:
   ```bash
   npm run dev
   ```

5. **Build for production**:
   ```bash
   npm run build
   ```

## Tech Stack

- **Frontend**: React 19, TypeScript, Vite
- **Styling**: Tailwind CSS 4, Motion (Framer Motion)
- **AI**: Google Gemini API
- **Icons**: Lucide React

## License

This project is private and for personal use.

## Disclaimer

📌 Disclaimer: Some statistics displayed on this platform (such as member counts, cards generated, and community metrics) are illustrative placeholders and do not reflect real data. ScholarPulse Elite is built purely for educational and knowledge-exploration purposes.
