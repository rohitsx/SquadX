import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, Lock, UserCheck } from "lucide-react";
import SquadXLogo from "@/assets/logo";

export default function Privacypolicy() {
  return (
    <div className="relative min-h-screen bg-[#0A0F1F] text-white">
      {/* Gradients */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_-20%,rgba(120,119,198,0.3),transparent_60%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_50%,rgba(78,81,102,0.05),transparent_40%)]" />

      <div className="relative mx-auto max-w-4xl px-4 py-12">
        <div className="mb-12 flex justify-center">
          <Link to="/" className="relative">
            <div className="absolute -inset-8 rounded-full bg-[radial-gradient(circle_at_center,rgba(120,119,198,0.25),transparent_80%)] blur-xl" />
            <SquadXLogo size="sm" />
          </Link>
        </div>

        <Card className="border-0 bg-[#0A101F]/40 shadow-xl backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-center text-2xl text-gray-200">Privacy Policy</CardTitle>
          </CardHeader>
          <CardContent className="space-y-8">
            <section className="space-y-4">
              <div className="flex items-center gap-2">
                <Shield className="h-6 w-6 text-blue-400" />
                <h2 className="text-xl font-semibold text-gray-200">Information Collection and Use</h2>
              </div>
              <p className="text-gray-400">
                We only collect the minimum necessary information required for authentication through Google OAuth. This includes:
              </p>
              <ul className="list-inside list-disc space-y-2 text-gray-400">
                <li>Your primary Google Account email address</li>
                <li>Basic profile information that you've made publicly available</li>
              </ul>
            </section>

            <section className="space-y-4">
              <div className="flex items-center gap-2">
                <Lock className="h-6 w-6 text-blue-400" />
                <h2 className="text-xl font-semibold text-gray-200">Data Storage and Security</h2>
              </div>
              <p className="text-gray-400">
                We prioritize the security of your personal information:
              </p>
              <ul className="list-inside list-disc space-y-2 text-gray-400">
                <li>Your authentication data is processed securely and not stored in any unsafe or unreliable locations</li>
                <li>We do not sell or share your personal information with third parties</li>
                <li>Your data is only used for authentication purposes within our application</li>
              </ul>
            </section>

            <section className="space-y-4">
              <div className="flex items-center gap-2">
                <UserCheck className="h-6 w-6 text-blue-400" />
                <h2 className="text-xl font-semibold text-gray-200">Your Rights</h2>
              </div>
              <p className="text-gray-400">
                You have the right to:
              </p>
              <ul className="list-inside list-disc space-y-2 text-gray-400">
                <li>Access your personal information</li>
                <li>Request deletion of your account and associated data</li>
                <li>Withdraw your consent for authentication at any time</li>
              </ul>
            </section>

            <div className="mt-8 text-center">
              <Link 
                to="/" 
                className="text-sm text-gray-400 transition-colors hover:text-white"
              >
                Return to Home
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
