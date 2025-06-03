export interface AstrologyReport {
  success: boolean;
  message: string;
  data: {
    name: string;
    place: string;
    birthDate: string;
    formattedTime?: string;
    birthTime?: string;
    birthPlace?: string;
    generatedDate?: string;
    moonSign?: string;
    ascendantSign?: string;
    planets?: Array<{
      planet: string;
      sign: string;
      degree: number;
    }>;

    planetaryStrengths?: string[];
    yogas?: string[];
    healthAnalysis?: string;
    careerAnalysis?: {
    careerInsight: string;
    personalStrengths: string;
    yogas?: string[];
    specialInfluences?: string[];
    currentRoleNote?: string;
    disclaimerNote: string;
  };
    relationshipsAnalysis?: string;
    financesAnalysis?: string;
    lifePrediction?: string;
    content?: string;
  };
  errors: any;
}

