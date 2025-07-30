import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Shield, AlertTriangle, CheckCircle, Mail, Link, Eye, Brain } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface AnalysisResult {
  riskLevel: 'safe' | 'warning' | 'danger';
  score: number;
  indicators: string[];
  recommendations: string[];
}

export const PhishingAnalyzer = () => {
  const [emailContent, setEmailContent] = useState('');
  const [urlInput, setUrlInput] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const { toast } = useToast();

  const analyzeContent = (content: string, type: 'email' | 'url'): AnalysisResult => {
    const indicators: string[] = [];
    let score = 0;

    // Phishing indicators
    const suspiciousPatterns = [
      { pattern: /urgent|immediate|expires|suspended|verify|confirm|click here/i, weight: 2, desc: 'Urgency tactics detected' },
      { pattern: /bitcoin|cryptocurrency|investment|lottery|winner/i, weight: 3, desc: 'Financial scam keywords' },
      { pattern: /prince|inheritance|million|dollars|transfer/i, weight: 4, desc: 'Classic scam language' },
      { pattern: /bank|paypal|amazon|microsoft|apple/i, weight: 1, desc: 'Brand impersonation attempt' },
      { pattern: /password|account|security|login/i, weight: 2, desc: 'Credential harvesting attempt' },
    ];

    const urlPatterns = [
      { pattern: /[0-9]+\.[0-9]+\.[0-9]+\.[0-9]+/, weight: 3, desc: 'Suspicious IP address instead of domain' },
      { pattern: /bit\.ly|tinyurl|t\.co|shorturl/i, weight: 2, desc: 'URL shortener detected' },
      { pattern: /[a-z]+-[a-z]+\.tk|\.ml|\.ga|\.cf/i, weight: 4, desc: 'Suspicious free domain' },
      { pattern: /[0-9]{5,}/, weight: 2, desc: 'Suspicious long number sequence' },
    ];

    const patterns = type === 'url' ? [...suspiciousPatterns, ...urlPatterns] : suspiciousPatterns;

    patterns.forEach(({ pattern, weight, desc }) => {
      if (pattern.test(content)) {
        score += weight;
        indicators.push(desc);
      }
    });

    // Additional checks
    if (content.length < 10) {
      score += 1;
      indicators.push('Content too short to analyze properly');
    }

    if (type === 'email' && !content.includes('@') && content.length > 20) {
      score += 1;
      indicators.push('No email addresses found in email content');
    }

    // Determine risk level
    let riskLevel: 'safe' | 'warning' | 'danger';
    if (score >= 6) riskLevel = 'danger';
    else if (score >= 3) riskLevel = 'warning';
    else riskLevel = 'safe';

    // Generate recommendations
    const recommendations = [];
    if (riskLevel === 'danger') {
      recommendations.push('Do not click any links or download attachments');
      recommendations.push('Report this as spam/phishing');
      recommendations.push('Delete this content immediately');
    } else if (riskLevel === 'warning') {
      recommendations.push('Verify sender through alternative communication');
      recommendations.push('Check URLs carefully before clicking');
      recommendations.push('Be cautious with personal information');
    } else {
      recommendations.push('Content appears safe, but stay vigilant');
      recommendations.push('Always verify unexpected requests');
    }

    return { riskLevel, score, indicators, recommendations };
  };

  const handleAnalyze = async (content: string, type: 'email' | 'url') => {
    if (!content.trim()) {
      toast({
        title: "Error",
        description: "Please enter content to analyze",
        variant: "destructive",
      });
      return;
    }

    setIsAnalyzing(true);
    
    // Simulate analysis delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const analysis = analyzeContent(content, type);
    setResult(analysis);
    setIsAnalyzing(false);

    toast({
      title: "Analysis Complete",
      description: `Risk level: ${analysis.riskLevel.toUpperCase()}`,
      variant: analysis.riskLevel === 'danger' ? 'destructive' : 'default',
    });
  };

  const getRiskColor = (level: string) => {
    switch (level) {
      case 'safe': return 'safe';
      case 'warning': return 'warning';
      case 'danger': return 'destructive';
      default: return 'secondary';
    }
  };

  const getRiskIcon = (level: string) => {
    switch (level) {
      case 'safe': return CheckCircle;
      case 'warning': return AlertTriangle;
      case 'danger': return Shield;
      default: return Eye;
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      <Card className="border-primary/20 bg-card/50 backdrop-blur-sm">
        <CardHeader className="text-center">
          <CardTitle className="flex items-center justify-center gap-2 text-2xl">
            <Shield className="w-8 h-8 text-primary" />
            Phishing Detection Analyzer
          </CardTitle>
          <CardDescription>
            Advanced AI-powered detection for suspicious emails and malicious links
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="email" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="email" className="flex items-center gap-2">
                <Mail className="w-4 h-4" />
                Email Content
              </TabsTrigger>
              <TabsTrigger value="url" className="flex items-center gap-2">
                <Link className="w-4 h-4" />
                URL/Link
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="email" className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Email Content</label>
                <Textarea
                  placeholder="Paste the suspicious email content here..."
                  value={emailContent}
                  onChange={(e) => setEmailContent(e.target.value)}
                  rows={6}
                  className="resize-none"
                />
              </div>
              <Button
                onClick={() => handleAnalyze(emailContent, 'email')}
                disabled={isAnalyzing}
                className="w-full"
                variant="scan"
              >
                {isAnalyzing ? (
                  <>
                    <Brain className="w-4 h-4 animate-pulse" />
                    Analyzing Email...
                  </>
                ) : (
                  <>
                    <Eye className="w-4 h-4" />
                    Analyze Email
                  </>
                )}
              </Button>
            </TabsContent>
            
            <TabsContent value="url" className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">URL or Link</label>
                <Input
                  placeholder="Enter suspicious URL or link..."
                  value={urlInput}
                  onChange={(e) => setUrlInput(e.target.value)}
                  type="url"
                />
              </div>
              <Button
                onClick={() => handleAnalyze(urlInput, 'url')}
                disabled={isAnalyzing}
                className="w-full"
                variant="scan"
              >
                {isAnalyzing ? (
                  <>
                    <Brain className="w-4 h-4 animate-pulse" />
                    Analyzing URL...
                  </>
                ) : (
                  <>
                    <Eye className="w-4 h-4" />
                    Analyze URL
                  </>
                )}
              </Button>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {result && (
        <Card className={`border-2 ${result.riskLevel === 'danger' ? 'border-destructive' : result.riskLevel === 'warning' ? 'border-warning' : 'border-safe'}`}>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              {(() => {
                const Icon = getRiskIcon(result.riskLevel);
                return <Icon className={`w-6 h-6 text-${getRiskColor(result.riskLevel)}`} />;
              })()}
              Analysis Results
              <Badge variant={result.riskLevel === 'danger' ? 'destructive' : 'secondary'}>
                Risk Score: {result.score}/10
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Alert>
              <AlertTriangle className="w-4 h-4" />
              <AlertDescription>
                <strong>Risk Level: {result.riskLevel.toUpperCase()}</strong>
                {result.riskLevel === 'danger' && ' - High risk of phishing attempt detected!'}
                {result.riskLevel === 'warning' && ' - Suspicious indicators found, proceed with caution.'}
                {result.riskLevel === 'safe' && ' - Content appears legitimate.'}
              </AlertDescription>
            </Alert>

            {result.indicators.length > 0 && (
              <div>
                <h4 className="font-semibold mb-2">Detected Indicators:</h4>
                <div className="space-y-1">
                  {result.indicators.map((indicator, index) => (
                    <Badge key={index} variant="outline" className="mr-2 mb-2">
                      {indicator}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            <div>
              <h4 className="font-semibold mb-2">Recommendations:</h4>
              <ul className="space-y-1">
                {result.recommendations.map((rec, index) => (
                  <li key={index} className="flex items-center gap-2 text-sm">
                    <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                    {rec}
                  </li>
                ))}
              </ul>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};