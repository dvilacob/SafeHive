'use server';
/**
 * @fileOverview Provides AI-generated insights and recommendations for optimizing the Phase 1 SafeHive system configuration.
 *
 * - aiConfigurationInsights - A function that takes system configuration and returns optimization insights.
 * - AiConfigurationInsightsInput - The input type for the aiConfigurationInsights function.
 * - AiConfigurationInsightsOutput - The return type for the aiConfigurationInsights function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AiConfigurationInsightsInputSchema = z.object({
  workplaceAreaSqMeters: z
    .number()
    .describe('The total area of the factory floor in square meters.'),
  perimeterAccessPoints: z
    .number()
    .describe('The calculated number of SafeHive Perimeter Access Points required.'),
  totalEstimatedHardwareCost: z
    .number()
    .describe('The total estimated hardware cost for the Phase 1 SafeHive system.'),
});
export type AiConfigurationInsightsInput = z.infer<
  typeof AiConfigurationInsightsInputSchema
>;

const AiConfigurationInsightsOutputSchema = z.object({
  insights: z
    .string()
    .describe(
      'Detailed insights and recommendations for optimizing the Phase 1 SafeHive system configuration, focusing on core grid efficiency.'
    ),
});
export type AiConfigurationInsightsOutput = z.infer<
  typeof AiConfigurationInsightsOutputSchema
>;

/**
 * Server action to get AI insights for the current Phase 1 hardware configuration.
 */
export async function aiConfigurationInsights(
  input: AiConfigurationInsightsInput
): Promise<AiConfigurationInsightsOutput> {
  return aiConfigurationInsightsFlow(input);
}

const aiConfigurationInsightsPrompt = ai.definePrompt({
  name: 'aiConfigurationInsightsPrompt',
  input: {schema: AiConfigurationInsightsInputSchema},
  output: {schema: AiConfigurationInsightsOutputSchema},
  prompt: `You are an expert industrial safety system consultant for SafeHive. Your goal is to analyze a Phase 1 factory configuration (focusing only on core grid infrastructure) and provide actionable insights to optimize spatial coverage.

Here is the current Phase 1 system configuration:
- Workplace Area: {{{workplaceAreaSqMeters}}} sq meters
- Perimeter Access Points: {{{perimeterAccessPoints}}}
- Total Estimated Phase 1 Hardware Cost: \${{{totalEstimatedHardwareCost}}}

Based on this configuration, provide core infrastructure insights. Focus on:
1.  **Optimizing Grid Efficiency**: How can the Perimeter Access Point density be optimized for the given area?
2.  **Coverage Redundancy**: Evaluate if the current number of APs provides enough overlap for deterministic spatial tracking.
3.  **Phase 1 Readiness**: Is the backbone sufficient to support humanoid agents without external tracking aids?

Present your insights in a clear, concise, and professional manner, using technical industrial language.`,
});

const aiConfigurationInsightsFlow = ai.defineFlow(
  {
    name: 'aiConfigurationInsightsFlow',
    inputSchema: AiConfigurationInsightsInputSchema,
    outputSchema: AiConfigurationInsightsOutputSchema,
  },
  async input => {
    const {output} = await aiConfigurationInsightsPrompt(input);
    if (!output) {
      throw new Error('AI failed to generate insights. Check if GEMINI_API_KEY is configured.');
    }
    return output;
  }
);
