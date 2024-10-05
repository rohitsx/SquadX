import React, { useState, ChangeEvent, FormEvent } from "react";
import { User, AtSign, Camera } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

interface ProfileData {
    name: string;
    username: string;
    gender: string;
    avatarUrl: string;
}

const ProfilePage: React.FC = () => {
    const [profile, setProfile] = useState<ProfileData>({
        name: "John Doe",
        username: "johndoe",
        gender: "Male",
        avatarUrl: "/api/placeholder/100/100",
    });

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setProfile((prev) => ({ ...prev, [name]: value }));
    };

    const handleGenderChange = (value: string) => {
        setProfile((prev) => ({ ...prev, gender: value }));
    };

    const handleAvatarChange = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setProfile((prev) => ({
                    ...prev,
                    avatarUrl: reader.result as string,
                }));
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // Here you would typically send the updated profile data to your backend
        console.log("Profile updated:", profile);
        // You can add logic here to show a success message or handle errors
    };

    return (
        <div className="flex flex-col min-h-screen bg-gray-900 text-gray-100">
            <header className="bg-gray-800 p-4">
                <h1 className="text-2xl font-bold">My Profile</h1>
            </header>
            <main className="flex-1 flex items-center justify-center p-6">
                <Card className="w-full max-w-md bg-gray-800 text-gray-100">
                    <CardHeader>
                        <CardTitle className="text-2xl font-semibold">
                            Edit Profile
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="flex flex-col items-center space-y-4">
                                <Avatar className="w-32 h-32">
                                    <AvatarImage
                                        src={profile.avatarUrl}
                                        alt="Profile picture"
                                    />
                                    <AvatarFallback>
                                        {profile.name.charAt(0)}
                                    </AvatarFallback>
                                </Avatar>
                                <div className="relative">
                                    <input
                                        type="file"
                                        id="avatar-upload"
                                        className="hidden"
                                        onChange={handleAvatarChange}
                                        accept="image/*"
                                    />
                                    <Button
                                        type="button"
                                        variant="outline"
                                        className="flex items-center space-x-2"
                                        onClick={() =>
                                            document
                                                .getElementById("avatar-upload")
                                                ?.click()
                                        }
                                    >
                                        <Camera size={16} />
                                        <span>Change Picture</span>
                                    </Button>
                                </div>
                            </div>
                            <div className="space-y-4">
                                <div className="space-y-2">
                                    <label
                                        htmlFor="name"
                                        className="text-sm font-medium"
                                    >
                                        Name
                                    </label>
                                    <div className="relative">
                                        <User
                                            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                                            size={18}
                                        />
                                        <Input
                                            id="name"
                                            name="name"
                                            type="text"
                                            value={profile.name}
                                            onChange={handleInputChange}
                                            className="pl-10 bg-gray-700 border-gray-600 text-gray-100"
                                            placeholder="Enter your name"
                                        />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label
                                        htmlFor="username"
                                        className="text-sm font-medium"
                                    >
                                        Username
                                    </label>
                                    <div className="relative">
                                        <AtSign
                                            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                                            size={18}
                                        />
                                        <Input
                                            id="username"
                                            name="username"
                                            type="text"
                                            value={profile.username}
                                            onChange={handleInputChange}
                                            className="pl-10 bg-gray-700 border-gray-600 text-gray-100"
                                            placeholder="Enter your username"
                                        />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label
                                        htmlFor="gender"
                                        className="text-sm font-medium"
                                    >
                                        Gender
                                    </label>
                                    <Select
                                        onValueChange={handleGenderChange}
                                        defaultValue={profile.gender}
                                    >
                                        <SelectTrigger className="w-full bg-gray-700 border-gray-600 text-gray-100">
                                            <SelectValue placeholder="Select gender" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="Male">
                                                Male
                                            </SelectItem>
                                            <SelectItem value="Female">
                                                Female
                                            </SelectItem>
                                            <SelectItem value="Other">
                                                Other
                                            </SelectItem>
                                            <SelectItem value="Prefer not to say">
                                                Prefer not to say
                                            </SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>
                            <Button type="submit" className="w-full">
                                Update Profile
                            </Button>
                        </form>
                    </CardContent>
                </Card>
            </main>
        </div>
    );
};

export default ProfilePage;
