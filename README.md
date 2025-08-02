# 🚀 Coding Practice Interface

A standalone, offline coding practice platform inspired by LeetCode, built with React and Next.js. Practice coding problems in JavaScript and Python with real-time execution and progress tracking.

![Coding Practice Interface](https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&h=400&fit=crop)

## ✨ Features

- 🎯 **8 Coding Problems** - From easy to hard difficulty levels
- 💻 **Multi-Language Support** - JavaScript and Python execution
- 🔄 **Real-Time Code Execution** - Run and test your code instantly
- 📊 **Progress Tracking** - Track solved, attempted, and unsolved problems
- 🎨 **Clean UI** - Modern, responsive design with Monaco-style code editor
- 🔒 **Offline Ready** - Works completely offline after initial setup
- ⚡ **Fast Performance** - Client-side execution with Pyodide for Python

## 🛠️ Tech Stack

- **Frontend**: Next.js 14, React 18, TypeScript
- **Styling**: Tailwind CSS, shadcn/ui components
- **Code Execution**: 
  - JavaScript: Native browser execution
  - Python: Pyodide (WebAssembly)
- **Storage**: LocalStorage for progress tracking
- **Icons**: Lucide React

## 📋 Prerequisites

Before you begin, ensure you have the following installed on your system:

### Required Software

- **Node.js** (version 18.0 or higher)
  - Download from [nodejs.org](https://nodejs.org/)
  - Includes npm package manager
- **Git** (for cloning the repository)
  - Download from [git-scm.com](https://git-scm.com/)

### Verify Installation

Check your versions by running these commands in your terminal:

\`\`\`bash
node --version  # Should output v18.0.0 or higher
npm --version   # Should output 8.0.0 or higher
git --version   # Should output git version 2.x.x
\`\`\`

## 🚀 Local Installation Guide

### Step 1: Clone the Repository

Open your terminal and run:

\`\`\`bash
git clone https://github.com/your-username/coding-practice-interface.git
cd coding-practice-interface
\`\`\`

*Or if you downloaded the code from v0.dev, extract the ZIP file and navigate to the project folder.*

### Step 2: Install Dependencies

Install all required packages:

\`\`\`bash
npm install
\`\`\`

This will install all dependencies listed in `package.json`, including:
- Next.js framework
- React and TypeScript
- Tailwind CSS
- shadcn/ui components
- Lucide React icons

### Step 3: Start Development Server

Launch the development server:

\`\`\`bash
npm run dev
\`\`\`

You should see output similar to:

\`\`\`
▲ Next.js 14.0.0
- Local:        http://localhost:3000
- Network:      http://192.168.1.100:3000

✓ Ready in 2.1s
\`\`\`

### Step 4: Open in Browser

Navigate to **http://localhost:3000** in your web browser.

🎉 **Success!** The coding practice interface should now be running locally.

## 🎮 How to Use

### 1. Browse Problems
- View all 8 available problems on the home page
- See difficulty levels: **Easy** (green), **Medium** (yellow), **Hard** (red)
- Track your progress with status indicators:
  - ✅ **Green checkmark**: Problem solved
  - ⚠️ **Yellow warning**: Problem attempted but not solved
  - ⭕ **Gray circle**: Problem not attempted

### 2. Solve Problems
1. Click on any problem to open the coding interface
2. Choose your preferred language (JavaScript or Python)
3. Write your solution in the Monaco-style code editor
4. Click **"Run"** to test with sample test cases
5. Click **"Submit"** to test with all hidden test cases
6. View detailed results and debug any issues

### 3. Language Support

#### JavaScript
- ✅ Runs natively in the browser
- ✅ Instant execution (no loading time)
- ✅ Full ES6+ support
- ✅ Complete error handling

#### Python
- ✅ Powered by Pyodide (WebAssembly)
- ⏳ First load takes ~10-15 seconds (one-time setup)
- ✅ Supports most Python standard library
- ✅ Full Python 3.x compatibility

### 4. Available Problems

1. **Two Sum** (Easy) - Find indices that sum to target
2. **Reverse Integer** (Medium) - Reverse digits of integer
3. **Palindrome Number** (Easy) - Check if number reads same backwards
4. **Valid Parentheses** (Easy) - Check balanced brackets
5. **Maximum Subarray** (Medium) - Find contiguous subarray with largest sum
6. **Climbing Stairs** (Easy) - Count ways to climb stairs
7. **Binary Tree Inorder Traversal** (Easy) - Traverse binary tree
8. **Merge Two Sorted Lists** (Easy) - Merge two sorted linked lists

## 🔧 Development Commands

### Available Scripts

\`\`\`bash
# Start development server (with hot reload)
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run ESLint for code quality
npm run lint

# Type checking with TypeScript
npm run type-check
\`\`\`

### Development Workflow

1. **Make Changes**: Edit files in your preferred code editor
2. **Hot Reload**: Changes automatically reflect in the browser
3. **Test**: Use the interface to test your modifications
4. **Build**: Run `npm run build` to ensure production readiness

## 🐛 Troubleshooting

### Common Issues and Solutions

#### 1. Port Already in Use
**Problem**: Error "Port 3000 is already in use"

**Solutions**:
\`\`\`bash
# Option 1: Use a different port
npm run dev -- -p 3001

# Option 2: Kill process using port 3000 (macOS/Linux)
lsof -ti:3000 | xargs kill -9

# Option 3: Kill process using port 3000 (Windows)
netstat -ano | findstr :3000
taskkill /PID <PID_NUMBER> /F
\`\`\`

#### 2. Python Runtime Not Loading
**Problem**: Python code execution fails or hangs

**Solutions**:
- ✅ Ensure stable internet connection (Pyodide loads from CDN)
- ✅ Wait for initial 10-15 second loading period
- ✅ Try refreshing the page
- ✅ Switch to JavaScript temporarily
- ✅ Check browser console for specific error messages

#### 3. Dependencies Installation Failed
**Problem**: `npm install` fails with errors

**Solutions**:
\`\`\`bash
# Clear npm cache
npm cache clean --force

# Delete node_modules and package-lock.json
rm -rf node_modules package-lock.json

# Reinstall dependencies
npm install

# If still failing, try with legacy peer deps
npm install --legacy-peer-deps
\`\`\`

#### 4. Build Errors
**Problem**: `npm run build` fails

**Solutions**:
\`\`\`bash
# Check for TypeScript errors
npm run type-check

# Check for linting errors
npm run lint

# Clear Next.js cache
rm -rf .next

# Rebuild
npm run build
\`\`\`

#### 5. Code Returns Undefined
**Problem**: Function returns `undefined` instead of expected result

**Solutions**:
- ✅ Ensure your function has a `return` statement
- ✅ Check function name matches the expected name exactly
- ✅ Verify function parameters are correct
- ✅ Use `console.log()` for debugging

### Browser Compatibility

| Browser | Support | Notes |
|---------|---------|-------|
| Chrome | ✅ Full | Recommended for best performance |
| Firefox | ✅ Full | Complete WebAssembly support |
| Safari | ✅ Full | Works on macOS and iOS |
| Edge | ✅ Full | Chromium-based versions |

**Note**: Python execution requires WebAssembly support (available in all modern browsers).

## 🚀 Deployment Options

### Deploy to Vercel (Recommended)

1. Push your code to GitHub
2. Visit [vercel.com](https://vercel.com) and sign up
3. Click "New Project" and import your GitHub repository
4. Deploy with default settings
5. Your app will be live at `https://your-app-name.vercel.app`

### Deploy to Netlify

1. Build the project: `npm run build`
2. Upload the `out` folder to [netlify.com](https://netlify.com)
3. Configure redirects for client-side routing

### Deploy to GitHub Pages

1. Install gh-pages: `npm install --save-dev gh-pages`
2. Add to package.json scripts:
   \`\`\`json
   {
     "scripts": {
       "deploy": "gh-pages -d out"
     }
   }
   \`\`\`
3. Run: `npm run build && npm run deploy`

## 🤝 Contributing

We welcome contributions! Here's how to get started:

### Development Setup

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Make your changes
4. Test thoroughly
5. Commit: `git commit -m 'Add amazing feature'`
6. Push: `git push origin feature/amazing-feature`
7. Open a Pull Request

### Adding New Problems

To add a new coding problem:

1. Open `lib/problems.ts`
2. Add a new problem object to the `problems` array:

\`\`\`typescript
{
  id: "9",
  title: "Your Problem Title",
  difficulty: "Easy" | "Medium" | "Hard",
  description: `
    Write a function that solves...
    
    **Example:**
    Input: example
    Output: result
  `,
  examples: [
    {
      input: "example input",
      output: "expected output",
      explanation: "Why this works..."
    }
  ],
  constraints: [
    "1 ≤ n ≤ 1000",
    "Input contains only valid characters"
  ],
  testCases: [
    { input: ["test", "input"], expected: "expected output" },
    { input: ["another", "test"], expected: "another result" }
  ],
  starterCode: {
    javascript: `function yourFunction(param) {
    // Your code here
    return null;
}`,
    python: `def your_function(param):
    # Your code here
    return None`
  }
}
\`\`\`

### Code Style Guidelines

- Use TypeScript for type safety
- Follow existing naming conventions
- Add comments for complex logic
- Test your changes thoroughly
- Update documentation as needed

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **LeetCode** - Inspiration for the problem format and interface design
- **Pyodide** - Enabling Python execution in the browser
- **shadcn/ui** - Beautiful, accessible UI components
- **Next.js** - Powerful React framework
- **Vercel** - Seamless deployment platform
- **Monaco Editor** - VS Code-quality code editing experience

## 📞 Support

If you encounter any issues or have questions:

1. 📖 Check this README and the troubleshooting section
2. 🔍 Search existing [GitHub Issues](https://github.com/your-username/coding-practice-interface/issues)
3. 🆕 Create a new issue with:
   - Detailed description of the problem
   - Steps to reproduce
   - Your environment (OS, browser, Node.js version)
   - Screenshots if applicable

## 🎯 Roadmap

Future enhancements planned:

- [ ] More programming languages (Java, C++, Go)
- [ ] Advanced problem categories (Dynamic Programming, Graphs)
- [ ] User authentication and cloud progress sync
- [ ] Code sharing and collaboration features
- [ ] Performance analytics and timing
- [ ] Custom test case creation
- [ ] Solution explanations and hints
- [ ] Leaderboards and achievements

---

**Happy Coding!** 🎉

Made with ❤️ using [v0.dev](https://v0.dev)

*Last updated: January 2025*
