import OpenAI from "openai";
import { z } from "zod";
import { createInstuctor } from "instructor";

// define task structure
const taskSchema = z.object({
  title: z.string(),
  description: z.string(),
});

type TaskResponse = z.infer<typeof taskSchema>;

//openAI client
const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true,
});
// generate task
export async function generateTask(prompt: string): Promise<TaskResponse> {
  try {
    const completion = await openai.chat.completions.create({
      messages: [
        {
          role: "system",
          content:
            "You are a helpful task creator. Create tasks with a title and description based on user prompts.",
        },
        {
          role: "user",
          content: `Create a task with this prompt: ${prompt}. Return it in this format:
                      {
                        "title": "brief title here",
                        "description": "detailed description here"
                      }`,
        },
      ],
      model: "gpt-4.0-mini",
      response_format: { type: "json_object" },
    });

    const response = completion.choices[0].message.content;

    // Parse and validate the response
    const parsedResponse = JSON.parse(response);
    return taskSchema.parse(parsedResponse);
  } catch (error) {
    console.error("Error generating task:", error);
    throw error;
  }
}
