# Phase 0 - Project Foundation & Complete Setup

## **Role & Background**
- **Role:** Senior DevOps Engineer / Full-Stack Architect
- **Background:** A seasoned professional with extensive experience in project foundation setup, infrastructure architecture, and development workflow optimization. Deep understanding of Next.js 15, modern React patterns, cloud infrastructure, and maintaining clean, scalable codebases from project inception.

## **Feature Description**
This phase establishes the complete foundation for Vibe DevSquad from scratch, including fresh project infrastructure, comprehensive framework setup, development workflow implementation, and project tracking systems. It will create a new Supabase project, GitHub repository, DigitalOcean hosting setup, and implement a robust developer handoff system that maintains context continuity throughout the entire development lifecycle.

## **Important Instructions**
1. **Fresh Start:** This is a completely new project - delete existing Supabase projects and create everything from scratch
2. **Comprehensive Setup:** Install ALL frameworks and dependencies needed for the entire project lifecycle
3. **Research First:** Use Perplexity and Context7 for latest versions, best practices, and proper configurations
4. **Developer Handoff System:** Create and maintain 4 critical tracking files that replace Super Memory MCP
5. **Clean Architecture:** Establish file organization patterns and code quality standards from day one
6. **Future-Proof:** Set up infrastructure that can scale through all 17 MVP phases

## **Pre-Phase Context Reading**
**CRITICAL:** Before starting any tasks, read these files to understand current project state:
- `current_status.md` - Current project state and active features
- `known_issues.md` - Existing bugs and technical debt
- `changelog.md` - All previous changes and updates
- `features.md` - Completed, in-progress, and planned features

*Note: For Phase 0, these files don't exist yet and will be created as part of this phase.*

## **3-Tier Task Structure**

### **Tier 1: Infrastructure Setup (Foundation & Project Creation)**

#### **Objective:**
Establish the complete project infrastructure including Supabase, GitHub, DigitalOcean, and local development environment with all necessary frameworks and dependencies.

#### **Subtasks:**

1. **GitHub Repository Setup (FIRST - Required for All Git Operations):**
   - **Perplexity MCP**: `perplexity ask "What are the best practices for setting up a new GitHub repository for a Next.js 15 project including proper README, .gitignore, branch protection, and repository configuration?"`
   - **Action**: 
     - Create new private GitHub repository named "VibeDev Squad Official"
     - Set up proper README.md with project description
     - Configure repository settings, branch protection rules
     - Initialize with proper .gitignore for Next.js projects
     - Request new GitHub token if needed for enhanced access
     - Clone repository locally and set up initial project structure
   - **Git Checkpoint**: `git commit -m "feat: Initialize GitHub repository with proper configuration and documentation"`

2. **Project Infrastructure Research & Planning:**
   - **Perplexity MCP**: `perplexity ask "What are the latest best practices for setting up a Next.js 15 project in 2025 with React, TypeScript, Tailwind CSS, and modern development tools? Include recommended project structure, configuration files, and essential dependencies."`
   - **Action**: Document complete technology stack and infrastructure requirements for the entire project lifecycle.
   - **Git Checkpoint**: `git commit -m "docs: Add infrastructure research and technology stack documentation"`

3. **Supabase Project Setup:**
   - **Perplexity MCP**: `perplexity ask "What are the best practices for setting up a new Supabase project with proper database schema design, authentication configuration, and security settings for a production application?"`
   - **Action**: 
     - Delete existing Supabase projects (staging environments)
     - Create new Supabase project named "Vibe Dev Squad Official"
     - Configure authentication, database settings, and security policies
     - Document connection strings and configuration details
   - **Git Checkpoint**: `git commit -m "feat: Set up Supabase project 'Vibe Dev Squad Official' with authentication and database configuration"`

### **Tier 2: Framework & Development Environment Setup**

#### **Objective:**
Install and configure all necessary frameworks, dependencies, and development tools required for the complete project lifecycle.

#### **Subtasks:**

1. **Next.js 15 & Core Framework Installation:**
   - **Perplexity MCP**: `perplexity ask "What are the essential dependencies and configuration for a Next.js 15 project that will include real-time communication, AI agent integration, authentication, and database connectivity?"`
   - **Action**: 
     - Initialize Next.js 15 project with TypeScript and app router (use context7)
     - Install and configure Tailwind CSS for Next.js 15 (use context7)
     - Install and configure essential dependencies:
       - React 18+ with latest features
       - TypeScript with strict configuration
       - ESLint and Prettier for code quality
       - Set up Supabase client for Next.js (use context7)
       - Authentication libraries
       - Real-time communication dependencies
   - **Git Checkpoint**: `git commit -m "feat: Install Next.js 15 with TypeScript, Tailwind CSS, and essential dependencies"`

2. **Additional Framework Installation:**
   - **Perplexity MCP**: `perplexity ask "What additional frameworks and libraries are needed for an AI agent platform including state management, form handling, data visualization, real-time updates, and UI component libraries?"`
   - **Action**: 
     - Install Zustand for state management in React (use context7)
     - Set up React Hook Form for form handling (use context7)
     - Install Recharts for data visualization in React (use context7)
     - Set up Socket.io client for real-time communication (use context7)
     - Install Radix UI components for React (use context7)
     - Set up Jest and React Testing Library (use context7)
   - **Git Checkpoint**: `git commit -m "feat: Install additional frameworks for state management, UI components, and testing"`

3. **Development Tools & Configuration:**
   - **Perplexity MCP**: `perplexity ask "What are the best practices for configuring development tools including VS Code settings, debugging setup, and development workflow optimization for Next.js projects?"`
   - **Action**: 
     - Configure TypeScript with strict settings (use context7)
     - Set up ESLint and Prettier configurations (use context7)
     - Configure VS Code settings and extensions
     - Set up debugging configuration
     - Configure environment variables structure
   - **Git Checkpoint**: `git commit -m "feat: Configure development tools, TypeScript, ESLint, and debugging setup"`

### **Tier 3: Project Architecture & Quality Standards**

#### **Objective:**
Establish comprehensive project architecture, file organization standards, code quality guidelines, and developer handoff systems.

#### **Subtasks:**

1. **File Architecture & Organization Standards:**
   - **Perplexity MCP**: `perplexity ask "What are the best practices for organizing a large-scale Next.js project with clean architecture, proper file structure, and maintainable code organization? Include guidelines for when to split files and maintain 200-300 lines per file."`
   - **Action**: 
     - Create comprehensive file structure documentation
     - Establish folder organization patterns:
       - `/app` - Next.js 15 app router structure
       - `/components` - Reusable UI components
       - `/lib` - Utility functions and configurations
       - `/types` - TypeScript type definitions
       - `/hooks` - Custom React hooks
       - `/stores` - State management
       - `/utils` - Helper functions
     - Document file naming conventions
     - Create code organization guidelines
   - **Git Checkpoint**: `git commit -m "docs: Establish file architecture and organization standards"`

2. **Code Quality & Best Practices Documentation:**
   - **Perplexity MCP**: `perplexity ask "What are the comprehensive best practices for maintaining clean, readable, and maintainable code in a React/Next.js project? Include guidelines for file length, function complexity, component design, and refactoring strategies."`
   - **Action**: 
     - Create `Docs/Development/code_quality_standards.md` with:
       - File length guidelines (200-300 lines)
       - Function and component complexity limits
       - Naming conventions and patterns
       - Code splitting and refactoring guidelines
       - Comment and documentation standards
       - Performance optimization practices
     - This will serve as the foundation for future Cursor rules
   - **Git Checkpoint**: `git commit -m "docs: Create comprehensive code quality standards and best practices"`

3. **Developer Handoff System Implementation:**
   - **Action**: Create the four critical tracking files in /Users/dallionking/Vibe Dev Squad/Docs/Managment:
     
     **`current_status.md`** - Template:
     ```markdown
     # Current Project Status
     
     ## Phase Information
     - **Current Phase**: Phase 0 - Project Foundation & Complete Setup
     - **Phase Status**: In Progress
     - **Last Updated**: [Date]
     
     ## Active Features
     - [List currently working features]
     
     ## Development Environment
     - **Framework**: Next.js 15 with TypeScript
     - **Database**: Supabase
     - **Hosting**: DigitalOcean
     - **Repository**: GitHub - VibeDev Squad Official
     
     ## Current Branch
     - **Active Branch**: main
     - **Last Commit**: [Commit hash and message]
     
     ## Next Steps
     - [Immediate next tasks]
     ```
     
     **`known_issues.md`** - Template:
     ```markdown
     # Known Issues & Technical Debt
     
     ## Critical Issues
     - [High priority issues that block development]
     
     ## Non-Critical Issues
     - [Lower priority issues and improvements]
     
     ## Technical Debt
     - [Code that needs refactoring or improvement]
     
     ## Workarounds
     - [Temporary solutions in place]
     
     ## Resolution Notes
     - [How issues were resolved]
     ```
     
     **`changelog.md`** - Template:
     ```markdown
     # Project Changelog
     
     ## Phase 0 - Project Foundation & Complete Setup
     ### Added
     - [New features and capabilities]
     
     ### Changed
     - [Modifications to existing features]
     
     ### Fixed
     - [Bug fixes and issue resolutions]
     
     ### Infrastructure
     - [Infrastructure and setup changes]
     ```
     
     **`features.md`** - Template:
     ```markdown
     # Feature Status Tracking
     
     ## Completed Features
     - [✅ Fully implemented and tested features]
     
     ## In Progress Features
     - [🚧 Currently being developed]
     
     ## Planned Features (MVP)
     - [📋 Planned for upcoming phases]
     
     ## Post-MVP Features
     - [🔮 Future enhancements]
     
     ## Feature Dependencies
     - [Dependencies between features]
     ```
   - **Git Checkpoint**: `git commit -m "feat: Implement developer handoff system with tracking files"`

## **DigitalOcean MCP Integration**

### **Objective:**
Set up DigitalOcean hosting infrastructure using MCP integration for automated deployment and server management.

### **Subtasks:**

1. **DigitalOcean MCP Research & Setup:**
   - **Perplexity MCP**: `perplexity ask "How do I set up DigitalOcean MCP (Model Context Protocol) for automated deployment and server management? Include best practices for configuration and integration."`
   - **Action**: 
     - Research and install DigitalOcean MCP (use context7)
     - Configure API keys and authentication
     - Set up basic server infrastructure
     - Configure deployment pipelines
   - **Git Checkpoint**: `git commit -m "feat: Set up DigitalOcean MCP integration for hosting and deployment"`

## **Development Workflow Implementation**

### **Objective:**
Establish branching strategy, commit standards, and development workflow that will be used throughout all phases.

### **Subtasks:**

1. **Git Workflow & Branching Strategy:**
   - **Action**: 
     - Document branching strategy:
       - `main` - Production-ready code
       - `phase-X-feature-name` - Feature branches for each phase
       - Merge to main after phase completion and testing
     - Set up commit message standards
     - Configure branch protection rules
     - Document pull request process
   - **Git Checkpoint**: `git commit -m "docs: Establish Git workflow and branching strategy"`

## **Phase Completion & Staging Deployment**

### **Staging Deployment:**
1. **Push to Main Branch:**
   ```bash
   git checkout main
   git merge feature/phase-0-project-foundation-setup
   git push origin main
   ```

2. **Verify Staging Deployment:**
   - Monitor GitHub Actions workflow completion
   - Verify deployment to `https://staging.vibedevsquad.ai`
   - Test new features in staging environment

3. **Staging Validation Checklist:**
   - [ ] All new features function correctly in staging
   - [ ] No breaking changes to existing functionality
   - [ ] Database migrations (if any) completed successfully
   - [ ] Environment variables configured properly
   - [ ] SSL certificates and domain routing working

4. **Phase Sign-off:**
   - Only after successful staging validation
   - Update `current_status.md` with staging URL for testing
   - Document any staging-specific notes or considerations

## **Phase Completion Tasks**

### **Update Tracking Files:**
1. **Update `current_status.md`:**
   - Mark Phase 0 as completed
   - Document all installed frameworks and configurations
   - Set next phase as Phase 2 - Landing Page Foundation

2. **Update `known_issues.md`:**
   - Document any setup issues encountered
   - Note any configuration warnings or considerations

3. **Update `changelog.md`:**
   - Add all infrastructure setup changes
   - Document framework installations and configurations

4. **Update `features.md`:**
   - Mark project foundation as completed
   - Update planned features for next phases

### **Final Git Checkpoint:**
- **Commit Message**: `git commit -m "feat: Complete Phase 0 - Project foundation setup with all frameworks and infrastructure"`

## **Completion Summary:**
This phase successfully establishes the complete foundation for Vibe DevSquad including fresh Supabase project, GitHub repository, DigitalOcean hosting, Next.js 15 with all necessary frameworks, comprehensive file architecture, code quality standards, and developer handoff systems. The project is now ready for Phase 2 - Landing Page Foundation with all infrastructure, tools, and tracking systems in place.

## **Handoff to Next Phase:**
- All tracking files are created and updated
- Development environment is fully configured
- Infrastructure is ready for feature development
- Code quality standards are documented
- Branching strategy is established for phase-based development

