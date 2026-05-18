import { useState } from "react";
import { Camera, Loader2, ArrowLeft, Mail, User } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";

export default function ProfilePage() {
  const { authUser, updateProfile, isUpdatingProfile } = useAuthStore();
  const [selectedImg, setSelectedImg] = useState(null);

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = async () => {
      setSelectedImg(reader.result);
      await updateProfile({ profilePic: reader.result });
    };
  };

  return (
    <div className="min-h-screen bg-[#070b14] p-6">
      <div className="max-w-md mx-auto">
        <Link
          to="/"
          className="inline-flex items-center gap-1.5 text-xs text-slate-600 hover:text-slate-400 transition-colors mb-8"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          Back to chat
        </Link>

        <div className="bg-[#0e1623] border border-[#1e2d40] rounded-2xl p-6">
          <h1 className="text-base font-semibold text-slate-200 mb-6">Profile</h1>

          {/* Avatar */}
          <div className="flex flex-col items-center mb-6">
            <div className="relative">
              <img
                src={
                  selectedImg ||
                  authUser?.profilePic ||
                  `https://ui-avatars.com/api/?name=${encodeURIComponent(authUser?.fullName || "U")}&background=0ea5e9&color=fff&size=128`
                }
                alt="Profile"
                className="w-24 h-24 rounded-full object-cover border-2 border-[#1e2d40]"
              />
              <label
                htmlFor="avatar-upload"
                className="absolute bottom-0 right-0 w-8 h-8 bg-sky-500 hover:bg-sky-400 rounded-full flex items-center justify-center cursor-pointer transition-colors duration-150"
              >
                {isUpdatingProfile ? (
                  <Loader2 className="w-3.5 h-3.5 text-white animate-spin" />
                ) : (
                  <Camera className="w-3.5 h-3.5 text-white" />
                )}
              </label>
              <input id="avatar-upload" type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />
            </div>
            <p className="text-xs text-slate-600 mt-2">Click to update photo</p>
          </div>

          {/* Info fields */}
          <div className="space-y-3">
            {[
              { label: "Full Name", value: authUser?.fullName, icon: User },
              { label: "Email", value: authUser?.email, icon: Mail },
            ].map(({ label, value, icon: Icon }) => (
              <div key={label}>
                <p className="text-xs text-slate-600 mb-1.5 flex items-center gap-1.5">
                  <Icon className="w-3 h-3" />
                  {label}
                </p>
                <div className="bg-[#131f30] border border-[#1e2d40] rounded-lg px-3 py-2.5 text-sm text-slate-300">
                  {value}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-5 pt-5 border-t border-[#1e2d40]">
            <p className="text-xs text-slate-600">
              Member since{" "}
              <span className="text-slate-500">
                {new Date(authUser?.createdAt).toLocaleDateString("en-US", { month: "long", year: "numeric" })}
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
