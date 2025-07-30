import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { PhishingAnalyzer } from '@/components/PhishingAnalyzer';
import { EducationalPanel } from '@/components/EducationalPanel';
import { Header } from '@/components/Header';
import { Shield, Brain, BookOpen } from 'lucide-react';

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h2 className="text-4xl font-bold mb-4 bg-gradient-primary bg-clip-text text-transparent">
            Protect Yourself from Phishing Attacks
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Advanced AI-powered analysis to detect malicious emails and suspicious links. 
            Stay secure with real-time threat detection and cybersecurity education.
          </p>
        </div>

        <Tabs defaultValue="analyzer" className="w-full">
          <TabsList className="grid w-full grid-cols-2 max-w-md mx-auto mb-8">
            <TabsTrigger value="analyzer" className="flex items-center gap-2">
              <Shield className="w-4 h-4" />
              Analyzer
            </TabsTrigger>
            <TabsTrigger value="education" className="flex items-center gap-2">
              <BookOpen className="w-4 h-4" />
              Education
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="analyzer">
            <PhishingAnalyzer />
          </TabsContent>
          
          <TabsContent value="education">
            <EducationalPanel />
          </TabsContent>
        </Tabs>
      </main>
      
      <footer className="border-t border-border/50 bg-card/30 backdrop-blur-md py-6 mt-12">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm text-muted-foreground">
            Stay vigilant, stay secure. Report suspicious content to protect the community.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
