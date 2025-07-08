import { z } from 'zod';
import { readFileSync, readdirSync, existsSync } from 'fs';
import { join, extname } from 'path';


// NOTE: so far, assumes that content has been extracted from the slides
// and saved in the prompts directory as JSON files.
export const extractLectureContent = {
  name: 'extract-lecture-content',
  description:
    'Retrieves pre-extracted content from all lecture slides in the Agent Engineering Bootcamp, aggregated from multiple JSON files, returned as a stringified JSON text. Use this tool to provide data on Agents, MCP, RAG, Context Management, or other Bootcamp topics.',
  schema: {},
  handler: async () => {
    try {
      const promptsDir = join(process.cwd(), 'prompts');
      
      if (!existsSync(promptsDir)) {
        throw new Error('Prompts directory not found');
      }

      // Read all .json files in the prompts directory
      const jsonFiles = readdirSync(promptsDir).filter(
        (file) => {
          return extname(file).toLowerCase() === '.json'
        }
      );

      if (jsonFiles.length === 0) {
        throw new Error('No JSON files found in prompts directory');
      }

      // Aggregate data from all JSON files
      const aggregatedData: any[] = [];
      for (const file of jsonFiles) {
        const filePath = join(promptsDir, file);
        try {
          const jsonData = JSON.parse(readFileSync(filePath, 'utf-8'));
          if (typeof jsonData === 'object' && jsonData !== null) {
            aggregatedData.push(jsonData);
          } else {
            console.warn(`File ${file} is not an array, skipping`);
          }
        } catch (error) {
          console.error(`Error parsing JSON file ${file}:`, error);
        }
      }

      if (aggregatedData.length === 0) {
        throw new Error('No valid JSON data found in any files');
      }

      // Convert aggregated data to a string
      const textData = JSON.stringify(aggregatedData, null, 2);

      // Return the stringified JSON as a text response
      return {
        content: [
          {
            type: 'text' as const,
            text: textData,
          },
        ],
      };
    } catch (error) {
      console.error('Error in extract-lecture-content:', error);
      return {
        content: [
          {
            type: 'text' as const,
            text: JSON.stringify(
              { error: 'Failed to retrieve lecture content', details: (error as Error).message },
              null,
              2
            ),
          },
        ],
      };
    }
  },
};
