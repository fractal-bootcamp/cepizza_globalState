import Anthropic from "@anthropic-ai/sdk";
import { z } from "zod";
// import { createInstuctor } from "instructor";

// define task structure
const taskSchema = z.object({
  title: z.string(),
  description: z.string(),
});

type TaskResponse = z.infer<typeof taskSchema>;

// claude client
const anthropic = new Anthropic({
  apiKey: import.meta.env.VITE_ANTHROPIC_API_KEY,
  dangerouslyAllowBrowser: true,
});
// generate task
export async function generateTask(prompt: string): Promise<TaskResponse> {
  try {
    const completion = await anthropic.messages.create({
      model: "claude-3-opus-20240229",
      max_tokens: 150,
      messages: [
        {
          role: "user",
          content: `Generate a task based on this prompt: "${prompt}". 
                    Respond ONLY with a JSON object in this exact format:
                        {
            "title": "short task title here",
            "description": "task description here"
          }
          Do not include any other text or explanation.`,
        },
      ],
      system: "You are a task creator. Keep responses concise and practical.",
    });

    if (completion.content[0].type === "text") {
      const textBlock = completion.content[0];
      const response = textBlock.text;
      console.log("Nakd-Response:", response);

      // Parse and validate the response
      const parsedResponse = JSON.parse(response.trim());
      return taskSchema.parse(parsedResponse);
    } else {
      throw new Error("Unexpected response type from Claude");
    }
  } catch (error) {
    console.error("Error generating task:", error);
    throw error;
  }
}
