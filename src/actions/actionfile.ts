"use server";

import axios from "axios";

export async function documentCode(prevState: unknown, formData: FormData) {
  const language = formData.get("language") as string;
  const sourceCode = formData.get("sourceCode") as string;

  if (!sourceCode) {
    return { documentedCode: "", error: "Source code is required." };
  }

  const prompt = `Add comprehensive in-code documentation to the following ${language} code. Include function descriptions, parameter explanations, and usage examples within the code itself. Use the appropriate comment syntax for the given language. Do not add any additional text or explanations outside of the code comments:

${sourceCode}

For each function or class:
1. Add a description of what it does.
2. Explain each parameter (if any) with its type and purpose.
3. Describe the return value (if any) with its type and meaning.
4. Provide a usage example in the comments.
5. Add any necessary notes or explanations about the implementation.

Ensure the documentation is clear, concise, and follows best practices for the specified language.`;

  try {
    const response = await axios.post(
      "https://phi.us.gaianet.network/v1/chat/completions",
      {
        model: "llama",
        messages: [
          {
            role: "system",
            content:
              "You are an expert code documenter. Your task is to add clear and comprehensive in-code documentation to the provided source code.",
          },
          {
            role: "user",
            content: prompt,
          },
        ],
      }
    );

    const documentedCode = response.data.choices[0].message.content;

    return { documentedCode, error: null };
  } catch (error) {
    console.error("Error generating documentation:", error);
    return {
      documentedCode: "",
      error:
        "An error occurred while generating the documentation. Please try again.",
    };
  }
}
