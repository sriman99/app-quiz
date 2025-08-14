# Quiz Application

A comprehensive quiz application built with React.js, TypeScript, and Tailwind CSS to evaluate software development skills.

## 🎯 Overview

This quiz application provides an interactive platform for users to test their knowledge with a 15-question quiz fetched from the Open Trivia Database (OpenTDB). The application features a 30-minute timer, question navigation, and detailed reporting.

## ✨ Features

### Core Functionality
- **Start Page**: Email collection and quiz initialization
- **Quiz Interface**: 15 questions with multiple choice answers
- **Timer**: 30-minute countdown with auto-submission
- **Navigation**: Question overview panel showing visited and attempted questions
- **Reporting**: Comprehensive results with correct/incorrect answers comparison

### User Experience
- **Responsive Design**: Adapts to different device sizes
- **Smooth Transitions**: Animated question transitions and interactions
- **Visual Feedback**: Color-coded question status and answer validation
- **Progress Tracking**: Real-time progress monitoring

### Technical Features
- **TypeScript**: Full type safety and better development experience
- **Custom Hooks**: Reusable logic for quiz state management
- **Component Architecture**: Modular and maintainable code structure
- **API Integration**: Dynamic question fetching from OpenTDB

## 🚀 Tech Stack

- **Frontend**: React.js 19.1.1
- **Language**: TypeScript 5.8.3
- **Styling**: Tailwind CSS 3.4.17
- **Build Tool**: Vite 7.1.2
- **Package Manager**: npm
- **API**: Open Trivia Database (OpenTDB)

## 📋 Requirements Met

✅ **Quiz Layout & Flow**
- Start page with email submission
- 15 questions display
- 30-minute countdown timer
- Auto-submission when timer expires

✅ **Navigation**
- Question-specific navigation
- Overview panel showing question status
- Visited and attempted question indicators

✅ **End of Quiz**
- Automatic redirection to report page
- Side-by-side comparison of user and correct answers
- Comprehensive scoring and feedback

✅ **Data Source**
- Integration with OpenTDB API
- Dynamic question fetching
- Proper answer handling and validation

## 🛠️ Installation & Setup

### Prerequisites
- Node.js (version 16 or higher)
- npm or yarn package manager

### Setup Steps

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd quiz_app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Build for production**
   ```bash
   npm run build
   ```

5. **Preview production build**
   ```bash
   npm run preview
   ```

## 🏗️ Project Structure

```
src/
├── components/          # React components
│   ├── StartPage.tsx   # Quiz start interface
│   ├── QuizPage.tsx    # Main quiz interface
│   ├── Question.tsx    # Individual question display
│   ├── Navigation.tsx  # Question overview panel
│   ├── Timer.tsx       # Countdown timer
│   └── ReportPage.tsx  # Results and reporting
├── hooks/              # Custom React hooks
│   └── useQuiz.ts      # Quiz state management
├── types/              # TypeScript type definitions
│   └── quiz.ts         # Quiz-related interfaces
├── App.tsx             # Main application component
└── main.tsx            # Application entry point
```

## 🔧 Configuration

### Tailwind CSS
The application uses Tailwind CSS for styling. Configuration files:
- `tailwind.config.js` - Tailwind configuration
- `postcss.config.js` - PostCSS configuration

### Environment Variables
No environment variables are required for basic functionality. The application fetches questions from the public OpenTDB API.

## 📱 Browser Compatibility

- **Chrome**: 90+
- **Firefox**: 88+
- **Safari**: 14+
- **Edge**: 90+

## 🎨 Customization

### Styling
- Modify `tailwind.config.js` for theme customization
- Update component CSS classes for visual changes
- Custom animations in `src/index.css`

### Questions
- Change the API endpoint in `useQuiz.ts` for different question sources
- Modify question processing logic for custom data formats
- Adjust question count by updating the API parameters

## 🧪 Testing

The application includes:
- TypeScript compilation checks
- ESLint for code quality
- Responsive design testing across devices

## 🚀 Deployment

### Netlify
1. Connect your GitHub repository
2. Set build command: `npm run build`
3. Set publish directory: `dist`
4. Deploy automatically on push to main branch

### Vercel
1. Import your GitHub repository
2. Vercel will auto-detect Vite configuration
3. Deploy with default settings

### GitHub Pages
1. Run `npm run build`
2. Push `dist` folder to `gh-pages` branch
3. Enable GitHub Pages in repository settings

## 🔍 Assumptions Made

1. **User Experience**: Users prefer immediate feedback on answers
2. **Navigation**: Users should be able to freely navigate between questions
3. **Timer**: 30 minutes is sufficient for 15 questions
4. **API Reliability**: OpenTDB API is stable and accessible
5. **Device Support**: Modern browsers and responsive design are prioritized

## 🎯 Challenges Faced & Overcome

### 1. **State Management Complexity**
   - **Challenge**: Managing complex quiz state with multiple interdependent variables
   - **Solution**: Created custom `useQuiz` hook with clear state structure and update logic

### 2. **Timer Implementation**
   - **Challenge**: Implementing accurate countdown with auto-submission
   - **Solution**: Used `useEffect` with `setInterval` and proper cleanup

### 3. **Question Navigation**
   - **Challenge**: Tracking visited and attempted questions separately
   - **Solution**: Extended question interface with status flags and navigation logic

### 4. **API Integration**
   - **Challenge**: Handling dynamic question fetching and answer processing
   - **Solution**: Implemented proper error handling and data transformation

### 5. **Responsive Design**
   - **Challenge**: Creating mobile-friendly navigation and question display
   - **Solution**: Used Tailwind CSS grid system and responsive utilities

## 🚀 Future Enhancements

- **User Authentication**: Login system and progress saving
- **Question Categories**: Filter questions by difficulty or topic
- **Leaderboards**: Compare scores with other users
- **Offline Support**: Service worker for offline functionality
- **Analytics**: Detailed performance tracking and insights
- **Accessibility**: Enhanced screen reader support and keyboard navigation

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📞 Support

For support or questions, please open an issue in the GitHub repository.
