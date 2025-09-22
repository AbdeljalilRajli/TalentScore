# TalentScore

A professional SaaS application that uses AI to analyze resumes and provide actionable insights to help job seekers optimize their applications for better job matching.

![TalentScore](https://via.placeholder.com/800x400/4F46E5/FFFFFF?text=TalentScore)

## 🚀 Features

### Core Functionality
- **Resume Upload**: Support for PDF, DOC, DOCX, and TXT files
- **Job Description Analysis**: Paste job descriptions for targeted analysis
- **AI-Powered Matching**: Get match scores and keyword analysis
- **Visual Dashboard**: Interactive charts and progress indicators
- **Smart Suggestions**: Personalized recommendations for improvement

### Pages & Sections
- **Landing Page**: Hero section, features, testimonials, FAQ, and about
- **Analyze Page**: Resume upload with step-by-step guidance
- **Results Dashboard**: Match scores, keyword analysis, and suggestions
- **About Page**: Mission, AI explanation, and team information
- **FAQ Page**: Comprehensive answers to common questions
- **Testimonials**: Success stories from real users

### Design & UX
- **Professional SaaS Design**: Modern, clean interface
- **Fully Responsive**: Mobile, tablet, and desktop optimized
- **Smooth Animations**: Hover effects and transitions
- **Accessible**: WCAG compliant design patterns
- **Consistent Branding**: Blue/purple gradient theme

## 🛠️ Tech Stack

- **Frontend**: React 19 + TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS 4.x
- **Charts**: Custom SVG charts (ready for Recharts integration)
- **Icons**: Emoji-based with space for Lucide React
- **Routing**: Custom client-side routing
- **State Management**: React hooks and localStorage

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/talentscore.git
   cd talentscore
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open in browser**
   ```
   http://localhost:5173
   ```

## 🏗️ Project Structure

```
src/
├── components/
│   ├── Layout/
│   │   ├── Header.tsx       # Navigation header
│   │   ├── Footer.tsx       # Site footer
│   │   └── Layout.tsx       # Main layout wrapper
│   └── Router.tsx           # Client-side routing
├── pages/
│   ├── Home.tsx            # Landing page
│   ├── Analyze.tsx         # Resume upload page
│   ├── Results.tsx         # Analysis results dashboard
│   ├── About.tsx           # About page
│   ├── FAQ.tsx             # FAQ page
│   └── Testimonials.tsx    # Testimonials page
├── utils/
│   └── mockApi.ts          # Mock API for demo
├── App.tsx                 # Main app component
└── main.tsx               # App entry point
```

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🎨 Design System

### Colors
- **Primary**: Blue (#3B82F6) to Purple (#8B5CF6) gradient
- **Success**: Green (#10B981)
- **Warning**: Yellow (#F59E0B)
- **Error**: Red (#EF4444)
- **Gray Scale**: Tailwind gray palette

### Typography
- **Headings**: Font weights 600-800
- **Body**: Font weight 400-500
- **Spacing**: Consistent 4px grid system

## 🤖 Mock API

The application includes a mock API that simulates resume analysis:

```typescript
// Example API response
{
  score: 82,
  foundKeywords: ["React", "JavaScript", "Node.js"],
  missingKeywords: ["GraphQL", "Docker", "AWS"],
  suggestions: [
    "Add more GraphQL experience",
    "Mention Docker projects",
    "Highlight AWS cloud experience"
  ]
}
```

## 🚀 Deployment

### Vercel (Recommended)
1. Push code to GitHub
2. Connect repository to Vercel
3. Deploy automatically

### Netlify
1. Build the project: `npm run build`
2. Upload `dist` folder to Netlify
3. Configure redirects for SPA routing

### Manual Deployment
```bash
npm run build
# Upload dist/ folder to your hosting provider
```

## 📱 Responsive Design

- **Mobile**: 320px - 767px
- **Tablet**: 768px - 1023px
- **Desktop**: 1024px+

All components are fully responsive with mobile-first design approach.

## 🔮 Future Enhancements

### Planned Features
- [ ] Real AI integration (OpenAI/Anthropic)
- [ ] User authentication system
- [ ] Resume template suggestions
- [ ] ATS compatibility checker
- [ ] Multiple resume comparison
- [ ] PDF export functionality
- [ ] Dark mode toggle
- [ ] Advanced analytics dashboard

### Technical Improvements
- [ ] Add Recharts for better visualizations
- [ ] Implement React Router for better routing
- [ ] Add Framer Motion for animations
- [ ] Integrate with real backend API
- [ ] Add comprehensive testing suite
- [ ] Implement PWA features

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

Built with ❤️ by [Your Name]

- Portfolio: [your-portfolio.com](https://your-portfolio.com)
- LinkedIn: [your-linkedin](https://linkedin.com/in/your-profile)
- GitHub: [your-github](https://github.com/your-username)

## 🙏 Acknowledgments

- Design inspiration from modern SaaS applications
- Tailwind CSS for the utility-first styling approach
- React and Vite for the excellent developer experience
- The open-source community for amazing tools and libraries

---

**Note**: This is a portfolio/demo project showcasing modern React development practices and SaaS application design. The AI analysis is currently mocked but the frontend is production-ready and can be easily connected to real AI services.
