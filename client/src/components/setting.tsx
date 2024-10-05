import React, { useState, ChangeEvent, FormEvent } from 'react';
import { Mail, Calendar,  Lock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';

interface SettingsData {
  email: string;
  dateOfBirth: string;
  twoFactorEnabled: boolean;
}

const SettingsPage: React.FC = () => {
  const [settings, setSettings] = useState<SettingsData>({
    email: 'johndoe@example.com',
    dateOfBirth: '1990-01-01',
    twoFactorEnabled: false,
  });

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSettings(prev => ({ ...prev, [name]: value }));
  };

  const handleTwoFactorToggle = (checked: boolean) => {
    setSettings(prev => ({ ...prev, twoFactorEnabled: checked }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Here you would typically send the updated settings data to your backend
    console.log('Settings updated:', settings);
    // You can add logic here to show a success message or handle errors
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-900 text-gray-100">
      <header className="bg-gray-800 p-4">
        <h1 className="text-2xl font-bold">Settings</h1>
      </header>
      <main className="flex-1 flex items-center justify-center p-6">
        <Card className="w-full max-w-md bg-gray-800 text-gray-100">
          <CardHeader>
            <CardTitle className="text-2xl font-semibold">Account Settings</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={settings.email}
                      onChange={handleInputChange}
                      className="pl-10 bg-gray-700 border-gray-600 text-gray-100"
                      placeholder="Enter your email"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="dateOfBirth">Date of Birth</Label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                    <Input
                      id="dateOfBirth"
                      name="dateOfBirth"
                      type="date"
                      value={settings.dateOfBirth}
                      onChange={handleInputChange}
                      className="pl-10 bg-gray-700 border-gray-600 text-gray-100"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="twoFactor">Two-Factor Authentication</Label>
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="twoFactor"
                      checked={settings.twoFactorEnabled}
                      onCheckedChange={handleTwoFactorToggle}
                    />
                    <Label htmlFor="twoFactor">
                      {settings.twoFactorEnabled ? 'Enabled' : 'Disabled'}
                    </Label>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Coin Setup</Label>
                  <div className="flex items-center space-x-2 text-gray-400">
                    {/* <coins size={18} /> */}
                    <span>Coming Soon</span>
                  </div>
                </div>
              </div>
              <Button type="submit" className="w-full">
                Save Settings
              </Button>
            </form>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default SettingsPage;