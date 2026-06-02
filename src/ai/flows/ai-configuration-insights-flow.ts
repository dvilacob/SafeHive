'use server';
/**
 * @fileOverview Provides AI-generated insights and recommendations for optimizing the SafeHive system configuration.
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
  nonNativeMachines: z
    .number()
    .describe('The number of machines without native SAFE ROS integration.'),
  nonNativeHumans: z
    .number()
    .describe('The number of human workers without SAFE ROS wearables.'),
  perimeterAccessPoints: z
    .number()
    .describe('The calculated number of SafeHive Perimeter Access Points required.'),
  mobileNodes: z.number().describe('The calculated number of SafeHive Mobile Nodes required.'),
  mobileVests: z.number().describe('The calculated number of SafeHive Mobile Vests required.'),
  totalDataSources: z
    .number()
    .describe('The total combined count of Access Points, Mobile Nodes, and Mobile Vests.'),
  totalEstimatedHardwareCost: z
    .number()
    .describe('The total estimated hardware cost for the SafeHive system.'),
});
export type AiConfigurationInsightsInput = z.infer<
  typeof AiConfigurationInsightsInputSchema
>;

const AiConfigurationInsightsOutputSchema = z.object({
  insights: z
    .string()
    .describe(
      'Detailed insights and recommendations for optimizing the SafeHive system configuration, focusing on efficiency and safety confidence factor.'
    ),
});
export type AiConfigurationInsightsOutput = z.infer<
  typeof AiConfigurationInsightsOutputSchema
>;

/**
 * Server action to get AI insights for the current hardware configuration.
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
  prompt: `You are an expert industrial safety system consultant for SafeHive. Your goal is to analyze a given factory configuration and provide actionable insights and recommendations to optimize system efficiency and improve the safety confidence factor.

Here is the current SafeHive system configuration:
- Workplace Area: {{{workplaceAreaSqMeters}}} sq meters
- Non-Native Machines: {{{nonNativeMachines}}}
- Non-Native Humans: {{{nonNativeHumans}}}
- Perimeter Access Points: {{{perimeterAccessPoints}}}
- Mobile Nodes: {{{mobileNodes}}}
- Mobile Vests: {{{mobileVests}}}
- Total Data Sources: {{{totalDataSources}}}
- Total Estimated Hardware Cost: \${{{totalEstimatedHardwareCost}}}

Based on this configuration, provide comprehensive insights and recommendations. Focus on:
1.  **Optimizing Efficiency**: How can the current setup be improved to maximize throughput and minimize unnecessary slowdowns?
2.  **Improving Safety Confidence Factor (C)**: How can the system's ability to precisely locate assets and respond to potential hazards be enhanced? Consider the impact of data source density.
3.  **Cost-Effectiveness**: Are there alternative approaches or adjustments that could provide similar safety benefits at a lower cost, or enhance safety significantly for a marginal increase?

Present your insights in a clear, concise, and professional manner, using normal factory-floor language. Avoid corporate buzzwords.`,
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
      throw new Error('AI failed to generate insights.');
    }
    return output;
  }
);
