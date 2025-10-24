import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Clock, Brain, Activity, Stethoscope, Baby, Zap, User } from "lucide-react";

interface Condition {
  id: string;
  title: string;
  description: string;
  fullDescription?: string;
}

interface BodyPart {
  id: string;
  name: string;
  conditions: Condition[];
}

const bodyParts: BodyPart[] = [
  {
    id: "hips-pelvis",
    name: "Hips & Pelvis",
    conditions: [
      {
        id: "coccydynia",
        title: "Coccydynia",
        description: "Coccydynia is the medical term used to describe pain in your coccyx (tail bone).",
      },
      {
        id: "sports-hernia",
        title: "Sports Hernia",
        description: "A painful soft tissue injury that occurs in the groin area during athletic activities.",
      },
      {
        id: "quadricep-strain",
        title: "Quadricep Strain",
        description: "An injury to the quadricep muscles at the front of the thigh.",
      },
      {
        id: "lumbar-disc",
        title: "Lumbar Disc Injury",
        description: "Lumbar discs sit between each of the bones of the spine. Problems can occur when these discs become irritated.",
      },
    ],
  },
  {
    id: "knee",
    name: "Knee",
    conditions: [
      {
        id: "acl-tear",
        title: "ACL Tear",
        description: "An injury to the anterior cruciate ligament, one of the key ligaments that stabilize the knee joint.",
      },
      {
        id: "meniscus-tear",
        title: "Meniscus Tear",
        description: "A common knee injury where the meniscus cartilage is torn, often during sports activities.",
      },
    ],
  },
  {
    id: "shoulder",
    name: "Shoulder",
    conditions: [
      {
        id: "rotator-cuff",
        title: "Rotator Cuff Injury",
        description: "Damage to the group of muscles and tendons that surround the shoulder joint.",
      },
      {
        id: "frozen-shoulder",
        title: "Frozen Shoulder",
        description: "A condition characterized by stiffness and pain in the shoulder joint.",
      },
    ],
  },
];

const categories = [
  { id: "long-term", name: "Long Term Conditions", icon: Clock },
  { id: "neurological", name: "Neurological", icon: Brain },
  { id: "rheumatology", name: "Rheumatology", icon: Activity },
  { id: "orthopaedic", name: "Orthopaedic", icon: Stethoscope },
  { id: "paediatrics", name: "Paediatrics", icon: Baby },
  { id: "pain", name: "Pain", icon: Zap },
];

const BodyMapSection = () => {
  const [selectedPart, setSelectedPart] = useState<BodyPart>(bodyParts[0]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  return (
    <section className="py-20 px-4 bg-gradient-to-b from-background to-muted/20">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12 animate-fade-in">
          <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-medical-blue to-medical-teal bg-clip-text text-transparent">
            Interactive Body Map
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Select a body part to explore possible conditions and diagnoses
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Body Selection */}
          <Card className="lg:col-span-1 border-medical-blue/20 shadow-lg">
            <CardHeader>
              <Button variant="outline" size="sm" className="w-fit mb-4">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back view
              </Button>
              <CardTitle className="text-lg">Choose a section</CardTitle>
              <CardDescription>Click on a body part or select from the list</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {bodyParts.map((part) => (
                <Button
                  key={part.id}
                  variant={selectedPart.id === part.id ? "default" : "outline"}
                  className="w-full justify-start"
                  onClick={() => setSelectedPart(part)}
                >
                  <User className="w-4 h-4 mr-2" />
                  {part.name}
                </Button>
              ))}
            </CardContent>
          </Card>

          {/* Categories */}
          <Card className="lg:col-span-1 border-medical-teal/20 shadow-lg">
            <CardHeader>
              <CardTitle className="text-lg">Categories</CardTitle>
              <CardDescription>Filter by medical category</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {categories.map((category) => {
                const Icon = category.icon;
                return (
                  <Button
                    key={category.id}
                    variant={selectedCategory === category.id ? "default" : "outline"}
                    className="w-full justify-start"
                    onClick={() => setSelectedCategory(category.id === selectedCategory ? null : category.id)}
                  >
                    <Icon className="w-4 h-4 mr-2" />
                    {category.name}
                  </Button>
                );
              })}
            </CardContent>
          </Card>

          {/* Diagnosis Panel */}
          <Card className="lg:col-span-1 bg-gradient-to-br from-medical-navy to-medical-navy/90 text-white border-none shadow-xl">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-xl">Possible Diagnosis for {selectedPart.name}</CardTitle>
                <Button size="sm" variant="secondary" className="bg-medical-teal hover:bg-medical-teal/90">
                  View All
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              {selectedPart.conditions.map((condition) => (
                <div key={condition.id} className="space-y-2 pb-6 border-b border-white/10 last:border-0">
                  <h3 className="text-lg font-semibold">{condition.title}</h3>
                  <p className="text-sm text-white/80 leading-relaxed">{condition.description}</p>
                  <Button
                    variant="link"
                    className="text-medical-teal hover:text-medical-teal/80 p-0 h-auto font-semibold"
                  >
                    Read more →
                  </Button>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default BodyMapSection;
