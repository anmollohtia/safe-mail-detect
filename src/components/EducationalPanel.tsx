import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  Shield, 
  AlertTriangle, 
  Eye, 
  Lock, 
  Mail, 
  Link, 
  Brain,
  Zap,
  Users,
  Clock
} from 'lucide-react';

export const EducationalPanel = () => {
  const phishingTactics = [
    {
      icon: Clock,
      title: "Urgency Tactics",
      description: "Creating false deadlines to pressure quick action",
      examples: ["Account expires in 24 hours", "Immediate action required", "Limited time offer"],
      color: "destructive"
    },
    {
      icon: Users,
      title: "Authority Impersonation",
      description: "Pretending to be from trusted organizations",
      examples: ["Your bank needs verification", "IRS tax notice", "CEO email request"],
      color: "warning"
    },
    {
      icon: Zap,
      title: "Fear Tactics",
      description: "Using threats to create panic and compliance",
      examples: ["Account will be suspended", "Legal action pending", "Security breach detected"],
      color: "destructive"
    },
    {
      icon: Brain,
      title: "Social Engineering",
      description: "Manipulating emotions and trust",
      examples: ["Help a colleague in need", "Congratulations, you've won!", "Exclusive opportunity"],
      color: "warning"
    }
  ];

  const redFlags = [
    "Generic greetings (Dear Customer)",
    "Spelling and grammar mistakes",
    "Mismatched URLs on hover",
    "Unexpected attachments",
    "Requests for sensitive information",
    "Too good to be true offers",
    "Suspicious sender addresses",
    "Urgent action required"
  ];

  const protectionTips = [
    {
      icon: Eye,
      title: "Verify Before Clicking",
      tip: "Always hover over links to see the real destination URL"
    },
    {
      icon: Lock,
      title: "Check for HTTPS",
      tip: "Look for the padlock icon and 'https://' in legitimate sites"
    },
    {
      icon: Mail,
      title: "Verify Senders",
      tip: "Contact organizations directly using official contact information"
    },
    {
      icon: Shield,
      title: "Use Security Tools",
      tip: "Keep antivirus software updated and use email filters"
    }
  ];

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      <Card className="border-primary/20 bg-card/50 backdrop-blur-sm">
        <CardHeader className="text-center">
          <CardTitle className="flex items-center justify-center gap-2 text-2xl">
            <Brain className="w-8 h-8 text-primary" />
            Phishing Education Center
          </CardTitle>
          <CardDescription>
            Learn to recognize and protect yourself from phishing attacks
          </CardDescription>
        </CardHeader>
      </Card>

      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-warning" />
              Common Phishing Tactics
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {phishingTactics.map((tactic, index) => (
              <div key={index} className="space-y-2 p-3 rounded-lg bg-secondary/50">
                <div className="flex items-center gap-2">
                  <tactic.icon className={`w-4 h-4 text-${tactic.color}`} />
                  <h4 className="font-semibold">{tactic.title}</h4>
                </div>
                <p className="text-sm text-muted-foreground">{tactic.description}</p>
                <div className="flex flex-wrap gap-1">
                  {tactic.examples.map((example, idx) => (
                    <Badge key={idx} variant="outline" className="text-xs">
                      {example}
                    </Badge>
                  ))}
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Eye className="w-5 h-5 text-destructive" />
              Red Flags to Watch For
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {redFlags.map((flag, index) => (
                <li key={index} className="flex items-center gap-2 text-sm">
                  <div className="w-2 h-2 bg-destructive rounded-full" />
                  {flag}
                </li>
              ))}
            </ul>
            <Alert className="mt-4">
              <Shield className="w-4 h-4" />
              <AlertDescription>
                Remember: Legitimate organizations will never ask for passwords or sensitive information via email.
              </AlertDescription>
            </Alert>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="w-5 h-5 text-safe" />
            Protection Best Practices
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-4">
            {protectionTips.map((tip, index) => (
              <div key={index} className="flex items-start gap-3 p-3 rounded-lg bg-safe/10 border border-safe/20">
                <tip.icon className="w-5 h-5 text-safe mt-0.5" />
                <div>
                  <h4 className="font-semibold text-sm">{tip.title}</h4>
                  <p className="text-xs text-muted-foreground mt-1">{tip.tip}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="border-primary/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Link className="w-5 h-5 text-accent" />
            URL Analysis Tips
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4">
            <div className="p-3 rounded-lg bg-destructive/10 border border-destructive/20">
              <h4 className="font-semibold text-destructive mb-2">Suspicious URLs</h4>
              <div className="space-y-1 text-sm font-mono">
                <div>❌ http://paypal-security.tk/login</div>
                <div>❌ https://192.168.1.1/amazon-update</div>
                <div>❌ https://bit.ly/bank-verify</div>
              </div>
            </div>
            <div className="p-3 rounded-lg bg-safe/10 border border-safe/20">
              <h4 className="font-semibold text-safe mb-2">Legitimate URLs</h4>
              <div className="space-y-1 text-sm font-mono">
                <div>✅ https://www.paypal.com/login</div>
                <div>✅ https://amazon.com/account</div>
                <div>✅ https://secure.bank.com/verify</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};