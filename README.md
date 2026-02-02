# SubTrack - Subscription Management SaaS 🚀

**SubTrack** is a professional SaaS platform designed to help users take full control of their digital subscriptions. Monitor spending, manage renewal dates, and optimize your monthly budget through a modern, high-performance interface.

![SubTrack Dashboard Preview](https://raw.githubusercontent.com/aaronmfcr/mi-proyecto-saas/main/public/preview.png) *(Note: Placeholder for actual preview image)*

## 🛠 Tech Stack

- **Frontend**: [React 19](https://react.dev/) + [Vite](https://vitejs.dev/)
- **Language**: [TypeScript](https://www.typescriptlang.org/) (Strict Mode)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Backend / Database**: [Supabase](https://supabase.com/) (PostgreSQL)
- **Authentication**: Supabase Auth (Email/Password & Social)
- **Form Handling**: React Hook Form + Zod
- **Icons**: Lucide React

## ✨ Key Features

- **Personalized Dashboard**: Real-time view of monthly spending, next renewal dates, and total active subscriptions.
- **Full Auth Flow**: Secure registration and login system with route protection.
- **Subscription CRUD**: Add, view, and manage subscriptions with specific billing cycles (Weekly, Monthly, Quarterly, Yearly).
- **Intelligent Formatting**: Automatic currency conversion and localized date formatting.
- **Premium UI**: Dark mode core interface with mesh gradients and micro-animations for a high-end feel.

## 🧠 Technical Challenges & Solutions

### 1. Hardening TypeScript for Production Builds
One of the main challenges was ensuring perfect type-safety during the production build (`npm run build`). We encountered strict mismatches between **Zod schemas** and **React Hook Form** state, specifically regarding numeric coercion from HTML inputs.
- **Solution**: Implemented `z.coerce.number()` in validation schemas and utilized the `{ valueAsNumber: true }` property in React Hook Form's register function. Additionally, we transitioned to `import type` for type-only dependencies to satisfy the `verbatimModuleSyntax` rule.

### 2. Multi-tenant Security via RLS
Security is paramount in a SaaS managing financial data. We had to ensure users could only access their own data without complex backend middleware.
- **Solution**: Leveraged Supabase's **Row Level Security (RLS)**. We defined policies at the database level that automatically filter results based on the `auth.uid()` of the requesting user, preventing any unauthorized data leakage between accounts.

## 🚀 Getting Started

### Prerequisites
- Node.js (v18+)
- A Supabase Project

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/aaronmfcr/mi-proyecto-saas.git
   cd mi-proyecto-saas
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Environment Variables**:
   Create a `.env` file in the root and add your Supabase credentials:
   ```env
   VITE_SUPABASE_URL=your_supabase_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

4. **Database Setup**:
   Run the migration found in `supabase/migrations/` in your Supabase SQL Editor to set up the `profiles` and `subscriptions` tables.

5. **Start Development Server**:
   ```bash
   npm run dev
   ```

## 📄 License
This project is licensed under the MIT License.

---
Built with ❤️ by [aaronmfcr](https://github.com/aaronmfcr)
