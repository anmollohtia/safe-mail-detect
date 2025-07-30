import { Shield } from 'lucide-react';
import securityShield from '@/assets/security-shield.png';

export const Header = () => {
  return (
    <header className="w-full border-b border-border/50 bg-card/30 backdrop-blur-md sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center gap-3">
          <img 
            src={securityShield} 
            alt="Security Shield" 
            className="w-10 h-10 animate-glow-pulse" 
          />
          <div>
            <h1 className="text-2xl font-bold bg-gradient-cyber bg-clip-text text-transparent">
              SafeMail Detect
            </h1>
            <p className="text-sm text-muted-foreground">
              Advanced Phishing Detection & Email Security
            </p>
          </div>
        </div>
      </div>
    </header>
  );
};