import { useState } from "react";
import { Link } from "react-router-dom";
import { User, Mail, Lock, Eye, EyeOff, Loader2, Zap } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";

export default function SignupPage() {
  const [form, setForm] = useState({ fullName: "", email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const { signup, isSigningUp } = useAuthStore();

  const handleSubmit = (e) => {
    e.preventDefault();
    signup(form);
  };

  const fields = [
    { key: "fullName", label: "Full Name", type: "text", placeholder: "John Doe", icon: User },
    { key: "email", label: "Email", type: "email", placeholder: "you@example.com", icon: Mail },
  ];

  return (
    <div className="min-h-screen bg-[#070b14] flex">
      {/* Left panel */}
      <div className="hidden lg:flex flex-col justify-between w-[420px] border-r border-[#1e2d40] p-10 bg-[#0a0f1c]">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-sky-500 rounded-lg flex items-center justify-center">
            <Zap className="w-4 h-4 text-white" />
          </div>
          <span className="font-semibold text-slate-200">Message</span>
        </div>
        <div>
          <p className="text-slate-400 text-sm leading-relaxed mb-4">
            "Join thousands of people who use Message to stay connected in real time."
          </p>
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-sky-500/20 flex items-center justify-center text-sky-400 text-xs font-semibold">M</div>
            <div>
              <p className="text-sm font-medium text-slate-300">Message Team</p>
              <p className="text-xs text-slate-600">Real-time messaging</p>
            </div>
          </div>
        </div>
      </div>

      {/* Right panel */}
      <div className="flex-1 flex items-center justify-center p-6">
        <div className="w-full max-w-sm">
          <div className="flex items-center gap-2 mb-8 lg:hidden">
            <div className="w-8 h-8 bg-sky-500 rounded-lg flex items-center justify-center">
              <Zap className="w-4 h-4 text-white" />
            </div>
            <span className="font-semibold text-slate-200">Message</span>
          </div>

          <h1 className="text-2xl font-semibold text-slate-100 mb-1">Create account</h1>
          <p className="text-slate-500 text-sm mb-8">Start chatting in seconds</p>

          <form onSubmit={handleSubmit} className="space-y-4">
            {fields.map(({ key, label, type, placeholder, icon: Icon }) => (
              <div key={key}>
                <label className="block text-xs font-medium text-slate-400 mb-1.5">{label}</label>
                <div className="relative">
                  <Icon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-600" />
                  <input
                    type={type}
                    placeholder={placeholder}
                    value={form[key]}
                    onChange={(e) => setForm({ ...form, [key]: e.target.value })}
                    className="w-full bg-[#131f30] border border-[#1e2d40] rounded-lg pl-10 pr-4 py-2.5 text-sm text-slate-200 placeholder:text-slate-600 focus:outline-none focus:border-sky-500 transition-colors duration-150"
                    required
                  />
                </div>
              </div>
            ))}

            <div>
              <label className="block text-xs font-medium text-slate-400 mb-1.5">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-600" />
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Min. 6 characters"
                  value={form.password}
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                  className="w-full bg-[#131f30] border border-[#1e2d40] rounded-lg pl-10 pr-10 py-2.5 text-sm text-slate-200 placeholder:text-slate-600 focus:outline-none focus:border-sky-500 transition-colors duration-150"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-600 hover:text-slate-400 transition-colors"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isSigningUp}
              className="w-full bg-sky-500 hover:bg-sky-400 disabled:opacity-50 text-white rounded-lg py-2.5 text-sm font-medium transition-colors duration-150 flex items-center justify-center gap-2"
            >
              {isSigningUp ? <><Loader2 className="w-4 h-4 animate-spin" /> Creating...</> : "Create account"}
            </button>
          </form>

          <p className="text-center text-slate-600 text-sm mt-6">
            Already have an account?{" "}
            <Link to="/login" className="text-sky-400 hover:text-sky-300 transition-colors">Sign in</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
