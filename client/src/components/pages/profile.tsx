import { useState, ChangeEvent, useEffect, useCallback } from "react";
import { Camera, ChevronLeft } from "lucide-react";
import defaultPfp from "@/assets/img/defaultPfp.jpeg";
import axios from "axios";

// Separate types into their own interfaces
interface Profile {
  name: string;
  birthday: string;
  gender: string;
  location: string;
  email: string;
  about: string;
  avatarUrl: string;
}

interface ProfileViewProps {
  profile: Profile;
  onEditClick: () => void;
}

interface EditViewProps {
  profile: Profile;
  onProfileChange: (updates: Partial<Profile>) => void;
  onSave: () => void;
  onCancel: () => void;
}

// Extract API calls into a separate service
const profileService = {
  getUserInfo: async (username: string, token: string): Promise<Profile> => {
    const response = await axios.post(
      `${import.meta.env.VITE_API_URL}/getUserInfo`,
      {
        username,
        token,
      },
    );
    return response.data;
  },
};

// Separate view components
const ProfileView = ({ profile, onEditClick }: ProfileViewProps) => (
  <div className="w-full max-w-md rounded-3xl bg-violet-600/90 p-6 text-white">
    <div className="flex flex-col items-center">
      <div className="relative mb-4">
        <img
          src={profile.avatarUrl}
          alt="Profile"
          className="h-24 w-24 rounded-full border-2 border-white object-cover"
        />
        <div className="absolute bottom-0 right-0">
          <span className="inline-block">🎗️</span>
        </div>
      </div>

      <div className="flex w-full items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-lg font-medium">{profile.name}</span>
          <span>🎗️</span>
        </div>
        <button
          onClick={onEditClick}
          className="rounded-full bg-violet-500/40 px-3 py-1 text-sm"
          aria-label="Edit profile"
        >
          ✏️ Edit
        </button>
      </div>

      <div className="mt-6 w-full space-y-4">
        <ProfileField icon="🎂" label="Birthday" value={profile.birthday} />
        <ProfileField icon="😊" label="Gender" value={profile.gender} />
        <ProfileField icon="🌍" label="Location" value={profile.location} />
      </div>
    </div>
  </div>
);

// Extract repeated profile field component
const ProfileField = ({
  icon,
  label,
  value,
}: {
  icon: string;
  label: string;
  value: string;
}) => (
  <div className="rounded-2xl bg-violet-500/40 p-4">
    <div className="flex items-center gap-2 text-sm">
      <span>{icon}</span>
      <span>{label}</span>
      <span className="ml-auto">{value}</span>
    </div>
  </div>
);

const EditView = ({
  profile,
  onProfileChange,
  onSave,
  onCancel,
}: EditViewProps) => {
  const handleAvatarChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        onProfileChange({ avatarUrl: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="w-full max-w-md rounded-3xl bg-violet-600/90 p-6 text-white">
      <div className="mb-6 flex items-center">
        <button
          onClick={onCancel}
          className="rounded-full p-1 hover:bg-violet-500/40"
          aria-label="Go back"
        >
          <ChevronLeft className="h-6 w-6" />
        </button>
        <span className="mx-auto text-xl font-medium">Edit Profile</span>
      </div>

      <div className="flex flex-col items-center">
        <div className="relative mb-8">
          <img
            src={profile.avatarUrl}
            alt="Profile"
            className="h-24 w-24 rounded-full border-2 border-white object-cover"
          />
          <button
            className="absolute bottom-0 right-0 rounded-full bg-violet-500 p-2"
            onClick={() => document.getElementById("avatar-upload")?.click()}
            aria-label="Change avatar"
          >
            <Camera className="h-4 w-4" />
          </button>
          <input
            type="file"
            id="avatar-upload"
            className="hidden"
            onChange={handleAvatarChange}
            accept="image/*"
          />
        </div>

        <div className="w-full space-y-4">
          <EditField
            value={profile.name}
            onChange={(value) => onProfileChange({ name: value })}
            maxLength={16}
          />
          <EditTextArea
            value={profile.about}
            onChange={(value) => onProfileChange({ about: value })}
            maxLength={140}
          />
        </div>

        <button
          onClick={onSave}
          className="mt-8 w-full rounded-2xl bg-yellow-400 py-4 font-medium text-black transition-colors hover:bg-yellow-500"
        >
          Save
        </button>
      </div>
    </div>
  );
};

// Extract form field components
const EditField = ({
  value,
  onChange,
  maxLength,
}: {
  value: string;
  onChange: (value: string) => void;
  maxLength: number;
}) => (
  <div className="relative">
    <input
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full rounded-2xl bg-violet-500/40 p-4 text-sm outline-none"
      maxLength={maxLength}
    />
    <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs opacity-60">
      {value.length}/{maxLength}
    </span>
  </div>
);

const EditTextArea = ({
  value,
  onChange,
  maxLength,
}: {
  value: string;
  onChange: (value: string) => void;
  maxLength: number;
}) => (
  <div className="relative">
    <textarea
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="h-32 w-full rounded-2xl bg-violet-500/40 p-4 text-sm outline-none"
      maxLength={maxLength}
    />
    <span className="absolute bottom-4 right-4 text-xs opacity-60">
      {value.length}/{maxLength}
    </span>
  </div>
);

// Main component using custom hooks for state management
const ProfilePage = () => {
  const [profile, setProfile] = useState<Profile>({
    name: localStorage.getItem("username") || "",
    birthday: "",
    gender: "",
    location: "",
    email: "",
    about: "",
    avatarUrl: defaultPfp,
  });
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const username = localStorage.getItem("username");
        const token = localStorage.getItem("token");

        if (!username || !token) {
          throw new Error("Authentication credentials missing");
        }

        const data = await profileService.getUserInfo(username, token);
        setProfile((prev) => ({
          ...data,
          avatarUrl: data.avatarUrl === "default" ? defaultPfp : data.avatarUrl,
        }));
      } catch (error) {
        console.error("Failed to fetch profile:", error);
        // Handle error appropriately
      }
    };

    fetchProfile();
  }, []);

  const handleProfileChange = (updates: Partial<Profile>) => {
    setProfile((prev) => ({ ...prev, ...updates }));
  };

  const onSave = useCallback(() => {
    setIsEditing(false);
    axios
      .post(import.meta.env.VITE_API_URL + "/updateUser", {
        currentUsername: localStorage.getItem("username"),
        updatedUsername: profile.name,
        about: profile.about,
        token: localStorage.getItem("token"),
        pfp: profile.avatarUrl,
      })
      .then((res) => {
        res.data === "success" && localStorage.setItem("username", profile.name);
      });
  }, [profile]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-violet-600 to-violet-800 p-4">
      {isEditing ? (
        <EditView
          profile={profile}
          onProfileChange={handleProfileChange}
          onSave={onSave}
          onCancel={() => setIsEditing(false)}
        />
      ) : (
        <ProfileView profile={profile} onEditClick={() => setIsEditing(true)} />
      )}
    </div>
  );
};

export default ProfilePage;
