import React from 'react';
import { Info, Globe, Users, Shield } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const AboutSection: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-900 text-gray-100">
      <header className="bg-gray-800 p-4">
        <h1 className="text-2xl font-bold">About Us</h1>
      </header>
      <main className="flex-1 p-6">
        <div className="max-w-4xl mx-auto space-y-6">
          <Card className="bg-gray-800 text-gray-100">
            <CardHeader>
              <CardTitle className="text-2xl font-semibold flex items-center">
                <Info className="mr-2" /> About Our Platform
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p>
                Welcome to our platform! We are dedicated to providing a seamless and engaging experience for all our users. Our mission is to connect people, share knowledge, and foster a community of growth and learning.
              </p>
            </CardContent>
          </Card>

          <div className="grid md:grid-cols-3 gap-6">
            <Card className="bg-gray-800 text-gray-100">
              <CardHeader>
                <CardTitle className="text-xl font-semibold flex items-center">
                  <Globe className="mr-2" /> Global Reach
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p>
                  With users from over 150 countries, we're proud to facilitate connections across the globe.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-gray-800 text-gray-100">
              <CardHeader>
                <CardTitle className="text-xl font-semibold flex items-center">
                  <Users className="mr-2" /> Community-Driven
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p>
                  Our vibrant community of over 1 million users is at the heart of everything we do.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-gray-800 text-gray-100">
              <CardHeader>
                <CardTitle className="text-xl font-semibold flex items-center">
                  <Shield className="mr-2" /> Secure & Trusted
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p>
                  Your privacy and security are our top priorities, with state-of-the-art protection measures in place.
                </p>
              </CardContent>
            </Card>
          </div>

          <Card className="bg-gray-800 text-gray-100">
            <CardHeader>
              <CardTitle className="text-2xl font-semibold">Our Story</CardTitle>
            </CardHeader>
            <CardContent>
              <p>
                Founded in 2020, our platform grew from a small startup to a global community. We believe in the power of connection and the impact it can have on individuals and society as a whole. Our journey is just beginning, and we're excited to have you be a part of it.
              </p>
              <p className="mt-4">
                As we continue to grow and evolve, we remain committed to our core values of innovation, inclusivity, and user-centric design. Thank you for being a part of our community!
              </p>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default AboutSection;