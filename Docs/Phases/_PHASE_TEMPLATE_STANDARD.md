# Phase [NUMBER] - [PHASE TITLE]

## **Role & Background**
- **Role:** [Senior FANG Engineer Profile/Specific Role Title]
- **Background:** [Detailed background with years of experience, company examples, specific expertise areas, technologies, and relevant skills for this phase. Include experience with key frameworks, patterns, and domain knowledge.]

## **Feature Description**
[Comprehensive description of what this phase accomplishes, how it builds upon previous phases, key technical features, business value, and integration points. Include specific capabilities, user workflows, and technical architecture overview.]

**Key Technical Features:**
- [Bullet point list of major technical capabilities]
- [Integration points with other phases]
- [Performance and scalability considerations]
- [Security and compliance requirements]

## **Phase Dependencies**
**Prerequisites (Must be completed first):**
- [List of required previous phases with brief description of what they provide]

**Integrations (Built upon):**
- [List of phases this builds upon with integration details]

**Enables (Unlocks future phases):**
- [List of phases that depend on this one]

## 🔥 **Important Instructions**

**CRITICAL: Before starting any tasks, read these files to understand current project state:**
- `current_status.md` - Current project state and active features
- `known_issues.md` - Existing bugs and technical debt  
- `changelog.md` - All previous changes and updates
- `features.md` - Completed, in-progress, and planned features

**Essential Requirements:**
1. Check off each subtask with [x] as you complete it
2. Do not proceed to the next task until ALL checkboxes in the current task are marked complete
3. **🔥CRITICAL🔥**: Use Magic UI MCP with `/ui` command for ALL component generation
4. **Magic UI MCP Usage:** Use `/ui` command for all component creation with complete embedded design system specifications
5. **Design System Integration:** Every Magic UI call must include complete styling specifications directly in the task description
6. Use Context7 MCP to fetch up-to-date documentation before starting each subtask: `(use context7)`
7. Use Perplexity MCP for any research needs or best practices: `perplexity ask "specific question"`
8. Use Supabase MCP for all database operations and real-time subscriptions
9. **Use DigitalOcean MCP for infrastructure and deployment**: v0.0.13 configured with API token and "Vibe DevSquad" project setup
10. **Build Upon Previous Phases**: [List specific phases and integration requirements]
11. **Performance Standards**: All features must be production-ready with proper error handling
12. **Security Requirements**: Implement proper authentication, authorization, and data protection
13. **Analytics Integration**: Include proper tracking and monitoring for all features

### **MCP Tools Integration Specifications**

#### **Core MCP Tools Required for All Phases:**
1. **Context7 MCP** - Latest documentation and API references
   - Fetch up-to-date documentation for React, Next.js, TypeScript, and other technologies
   - Validate current API patterns and integration approaches
   - Research current best practices and implementation patterns

2. **Perplexity MCP** - Real-time research and problem-solving
   - Research latest industry best practices and emerging patterns
   - Get current solutions for technical challenges and implementation questions
   - Stay updated on security, performance, and UX/UI trends

3. **Magic UI MCP** - Design system and component generation
   - Generate consistent UI components following the gameified aesthetic theme
   - Maintain design system coherence across all phases
   - Create responsive, accessible, and modern interfaces

4. **Supabase MCP** - Database and backend infrastructure
   - Manage database schema creation and migrations
   - Handle authentication, authorization, and Row Level Security (RLS)
   - Set up real-time subscriptions and API endpoints

#### **Infrastructure & Deployment MCP Tools:**
5. **DigitalOcean MCP** - Infrastructure management and deployment
   - **Status**: ✅ Configured v0.0.13 with API token and "Vibe DevSquad" project
   - **Primary Use Cases**: App Platform deployment, DNS management, resource monitoring
   - **Integration Points**: Staging environment setup, production deployment, scaling management
   - **Security**: API token configured in environment variables
   - **Deployment Workflow**: Automated via GitHub Actions with DigitalOcean App Platform

#### **Phase-Specific MCP Usage Patterns:**
- **Foundation & Setup Phases (0-3)**: Context7 + Perplexity + Magic UI + Supabase MCP
- **Core Feature Development Phases (4-12)**: All core tools + phase-specific research
- **Advanced Feature Implementation Phases (13-19)**: Full MCP integration + specialized tools
- **Infrastructure & Deployment Phases (20-22)**: Heavy DigitalOcean MCP usage + infrastructure automation
- **Cross-Integration Phases**: Multi-tool coordination for seamless workflows

### **Magic UI MCP Design System Specifications:**
**CRITICAL**: Include these specifications in EVERY `/ui` command:
```
Colors: vibe-primary (#0ea5e9) vibe-secondary (#8b5cf6) vibe-accent (#06b6d4) vibe-success (#10b981) vibe-warning (#f59e0b) vibe-error (#ef4444)
Typography: Inter font family with responsive scale (text-sm to text-4xl)
Glassmorphism: backdrop-blur-md with bg-white/95 (light) bg-gray-900/95 (dark)
Animations: smooth transitions hover:scale-105 duration-300 ease-in-out
Responsive: Mobile-first design with proper breakpoints (sm:640px md:768px lg:1024px xl:1280px 2xl:1536px)
Accessibility: Proper ARIA labels keyboard navigation focus states color contrast WCAG 2.1 AA compliance
Layout: Consistent spacing (space-y-4 space-x-4) proper grid systems (grid-cols-1 md:grid-cols-2 lg:grid-cols-3)
Interactive: Hover states focus states loading states error states
[Phase-Specific Theme]: Gameified cooler less corporate aesthetic with dynamic elements engaging visual feedback vibrant color palette professional yet visually exciting and unique [specific visual elements for this phase]
```

---

## **Implementation Tasks**

### **Tier 1: Foundation & Architecture Setup**

#### **Subtask 1.1: Git Branch Setup & Initial Configuration**
- [ ] **FIRST**: Create feature branch for Phase [NUMBER]
  - [ ] Use command: `git checkout main && git pull origin main && git checkout -b feature/phase-[number]-[kebab-case-title]`
  - [ ] Initial commit: `git commit -m "feat(phase-[number]): Initialize Phase [NUMBER] - [Title] branch" --allow-empty`

#### **Subtask 1.2: Research & Architecture Planning**
- [ ] Research [phase-specific] best practices and patterns
  - [ ] `perplexity ask "[Phase-specific research question about latest best practices and architecture patterns]"`
- [ ] Study technical documentation for key dependencies
  - [ ] `(use context7)` to fetch latest documentation for [key technologies]
- [ ] Plan integration architecture with existing phases
  - [ ] Analyze integration points with [dependency phases]
  - [ ] Design data flow and API contracts
  - [ ] Plan testing and validation strategies

#### **Subtask 1.3: Database Schema & Infrastructure Setup**
- [ ] Design comprehensive database schema with Supabase MCP
  - [ ] Use Supabase MCP to create [primary tables with detailed field descriptions]
  - [ ] Use Supabase MCP to create [secondary tables for relationships and metadata]
  - [ ] Use Supabase MCP to create [analytics and logging tables]
- [ ] Implement Row Level Security (RLS) policies for multi-tenant access
- [ ] Create database indexes for performance optimization
- [ ] Set up real-time subscriptions for live data updates
- [ ] **Git Checkpoint**: `git commit -m "feat([phase-name]): database schema and infrastructure setup"`

#### **Subtask 1.4: Core Services & API Infrastructure**
- [ ] Create core service architecture
  - [ ] Implement [PrimaryService] class with [key capabilities]
  - [ ] Create [SecondaryService] class for [specific functionality]
  - [ ] Implement [UtilityService] for [helper functions]
- [ ] Set up API routes and endpoints
  - [ ] **GET/POST/PUT/DELETE** `/api/[phase-name]/[resource]` - [Description]
  - [ ] [Additional API endpoints as needed]
- [ ] Implement comprehensive error handling and logging
- [ ] Set up performance monitoring and analytics
- [ ] **Git Checkpoint**: `git commit -m "feat([phase-name]): core services and API infrastructure"`

### **Tier 2: Core Feature Implementation**

#### **Subtask 2.1: [Primary Feature] Implementation**
- [ ] Research [specific feature] implementation patterns
  - [ ] `perplexity ask "[Feature-specific research question]"`
- [ ] Create [primary component] using Magic UI MCP
  - [ ] `/ui create [ComponentName] with specifications: [Include full Magic UI specifications with phase-specific visual elements]`
- [ ] Implement [feature-specific functionality]
  - [ ] [Specific implementation requirements]
  - [ ] [Integration with services and APIs]
  - [ ] [User interaction handling]
- [ ] Add comprehensive testing and validation
- [ ] **Git Checkpoint**: `git commit -m "feat([phase-name]): implement [primary feature]"`

#### **Subtask 2.2: [Secondary Feature] Implementation**
- [ ] [Similar structure for secondary features]
- [ ] **Git Checkpoint**: `git commit -m "feat([phase-name]): implement [secondary feature]"`

#### **Subtask 2.3: [Additional Features as needed]**
- [ ] **Git Checkpoint**: `git commit -m "feat([phase-name]): implement [feature name]"`

### **Tier 3: Advanced Features & Integration**

#### **Subtask 3.1: [Advanced Feature] Implementation**
- [ ] [Advanced feature implementation following same pattern]
- [ ] **Git Checkpoint**: `git commit -m "feat([phase-name]): implement [advanced feature]"`

#### **Subtask 3.2: Cross-Phase Integration & Workflow**
- [ ] Integrate with [specific previous phases]
  - [ ] Test data flow and API communication
  - [ ] Validate integration points and error handling
  - [ ] Implement seamless user workflows
- [ ] Create comprehensive integration tests
- [ ] Validate end-to-end workflows
- [ ] **Git Checkpoint**: `git commit -m "feat([phase-name]): cross-phase integration and workflow validation"`

#### **Subtask 3.3: Performance Optimization & Security**
- [ ] Implement performance optimizations
  - [ ] Database query optimization
  - [ ] Caching strategies
  - [ ] Frontend performance improvements
- [ ] Security hardening
  - [ ] Authentication and authorization
  - [ ] Data validation and sanitization
  - [ ] Rate limiting and abuse prevention
- [ ] **Git Checkpoint**: `git commit -m "feat([phase-name]): performance optimization and security hardening"`

### **Tier 4: Testing, Analytics & Quality Assurance**

#### **Subtask 4.1: Comprehensive Testing Suite**
- [ ] Implement unit tests for all services and components
- [ ] Create integration tests for API endpoints
- [ ] Add end-to-end tests for user workflows
- [ ] Performance testing and load validation
- [ ] **Git Checkpoint**: `git commit -m "feat([phase-name]): comprehensive testing suite"`

#### **Subtask 4.2: Analytics & Monitoring Implementation**
- [ ] Set up feature usage analytics
- [ ] Implement performance monitoring
- [ ] Create error tracking and alerting
- [ ] Add user behavior analytics
- [ ] **Git Checkpoint**: `git commit -m "feat([phase-name]): analytics and monitoring implementation"`

#### **Subtask 4.3: Documentation & Knowledge Transfer**
- [ ] Create comprehensive API documentation
- [ ] Write user guides and workflow documentation
- [ ] Document integration patterns for future phases
- [ ] Create troubleshooting and maintenance guides
- [ ] **Git Checkpoint**: `git commit -m "feat([phase-name]): documentation and knowledge transfer"`

### **Tier 5: Phase Completion & Handoff**

#### **Subtask 5.1: Final Testing & Quality Assurance**
- [ ] Comprehensive feature testing across all devices and browsers
- [ ] Accessibility compliance validation (WCAG 2.1 AA)
- [ ] Performance benchmarking and optimization
- [ ] Security audit and penetration testing
- [ ] User acceptance testing with stakeholder feedback

#### **Subtask 5.2: Production Readiness & Deployment**
- [ ] Environment configuration and secrets management
- [ ] Database migration scripts and rollback procedures
- [ ] Monitoring and alerting setup
- [ ] Backup and disaster recovery procedures
- [ ] Production deployment checklist completion

#### **Subtask 5.3: Documentation Updates & Project Tracking**
- [ ] Update tracking files in `/Users/dallionking/Vibe Dev Squad/Docs/Management/`:
  - [ ] Update `current_status.md` with Phase [NUMBER] completion status
  - [ ] Update `changelog.md` with all feature additions and changes
  - [ ] Update `features.md` with completed features and capabilities
  - [ ] Update `known_issues.md` with any remaining technical debt or issues
- [ ] Create handoff documentation for next phase dependencies
- [ ] Update project architecture documentation with new capabilities

#### **Subtask 5.4: Final Phase Commit & Branch Merge**
- [ ] Final comprehensive testing and validation
- [ ] Code review and quality assurance sign-off
- [ ] Final phase commit and merge to main
  - [ ] `git commit -m "feat(phase-[number]): Complete Phase [NUMBER] - [Title] with [key accomplishments]"`
  - [ ] `git checkout main && git merge feature/phase-[number]-[kebab-case-title] && git push origin main && git branch -d feature/phase-[number]-[kebab-case-title]`

---

## **Phase Completion Summary**
Phase [NUMBER] successfully implements [key accomplishments and features]. The phase delivers [primary business value] through [technical implementation summary]. Key integration points with [previous phases] are established, and the foundation is prepared for [future phases].

**Completed Features:**
- [List of major features and capabilities delivered]
- [Integration achievements]
- [Performance and security improvements]

**Technical Achievements:**
- [Database schema and infrastructure]
- [API endpoints and services]
- [User interface components and workflows]
- [Testing and quality assurance]

## **Next Phase Preparation**
Phase [NUMBER] completion enables the following next phase capabilities:
- [List of capabilities this phase provides to future phases]
- [Data models and APIs available for integration]
- [User workflows and interfaces ready for extension]

**Ready for Integration:**
- Phase [NEXT]: [Description of how this phase enables the next one]
- [Additional phases that can now proceed]

---

## **Quality Gates & Success Criteria**

### **Functional Requirements**
- [ ] All user workflows operate end-to-end without errors
- [ ] Integration with previous phases is seamless and tested
- [ ] Performance meets or exceeds benchmarked standards
- [ ] Security requirements are implemented and validated

### **Technical Requirements**
- [ ] Code quality standards are met (testing, documentation, maintainability)
- [ ] Database performance is optimized with proper indexing
- [ ] API endpoints respond within acceptable latency limits
- [ ] Error handling and logging are comprehensive

### **User Experience Requirements**
- [ ] Interface is intuitive and requires minimal training
- [ ] Mobile responsiveness is fully implemented and tested
- [ ] Accessibility standards (WCAG 2.1 AA) are met
- [ ] Loading states and feedback are appropriately implemented

### **Business Requirements**
- [ ] Feature delivers measurable business value
- [ ] Analytics and tracking are properly implemented
- [ ] Cost and resource utilization are within acceptable limits
- [ ] Stakeholder acceptance criteria are met

---

*Context improved by Giga AI* 