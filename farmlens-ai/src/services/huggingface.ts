import { HfInference } from "@huggingface/inference";
import { searchYouTubeVideo } from "./youtube";
import { DiagnosisResult } from "@/components/screens/ResultsCard";

const HF_KEY = import.meta.env.VITE_HF_API_KEY;

export const hf = new HfInference(HF_KEY);

const parseLabel = (label: string): { crop: string; disease: string } => {
    // Labels are typically formatted like "Tomato___Early_blight" or "Apple___healthy"
    let crop = "Unknown Crop";
    let disease = "Unknown Disease";

    if (label.includes("___")) {
        const parts = label.split("___");
        crop = parts[0].replace(/_/g, " ");
        disease = parts[1].replace(/_/g, " ");
    } else {
        disease = label.replace(/_/g, " ");
    }

    if (disease.toLowerCase().includes("healthy")) {
        disease = "Healthy Plant";
    }

    return { crop, disease };
};

export const analyzeCropImageHF = async (imageFile: File): Promise<DiagnosisResult | null> => {
    if (!HF_KEY || HF_KEY.includes("YOUR_")) {
        console.warn("Hugging Face API Key is missing. Returning null to fallback/mock.");
        return null; // Will fallback
    }

    console.log("Initializing Hugging Face Image Analysis (linka-cloud/plant-disease-classification)...");

    try {
        const result = await hf.imageClassification({
            model: 'linka-cloud/plant-disease-classification',
            data: imageFile
        });

        if (!result || result.length === 0) {
            throw new Error("No results from Hugging Face");
        }

        const topPrediction = result[0];
        const { crop, disease } = parseLabel(topPrediction.label);

        // Let the verification/research engine fill in actual treatments
        return {
            disease,
            crop,
            confidence: Math.round(topPrediction.score * 100),
            severity: topPrediction.score > 0.8 && disease !== "Healthy Plant" ? "high" : "medium",
            treatment: "Consult expert for specific treatment.",
            preventiveMeasures: ["Use disease-free seeds", "Ensure adequate spacing and aeration."],
            weather: { humidity: 65, temperature: 24, condition: "Partly Cloudy" }, // Will be overwritten by other services if needed
            videoUrl: "https://www.youtube.com/embed/gE47Vd9gW1Y"
        };
    } catch (error) {
        console.error("Hugging Face Image Analysis failed:", error);
        return null;
    }
};

export const chatWithAgronomistHF = async (userMessage: string, history: { role: string, content: string }[] = []): Promise<string | null> => {
    if (!HF_KEY || HF_KEY.includes("YOUR_")) {
        return null;
    }

    try {
        let chatMessages = history.map(msg => ({
            role: msg.role === "ai" ? "assistant" : "user",
            content: msg.content
        }));

        chatMessages.push({ role: "user", content: userMessage });

        // Prepend system prompt if not present
        chatMessages = [
            { role: "system", content: "You are an expert crop agronomist advising a farmer. Provide clear, concise, and structured agricultural advice. Use emojis where appropriate. Do not use markdown blocks for JSON." },
            ...chatMessages
        ];

        const response = await hf.chatCompletion({
            model: "mistralai/Mistral-7B-Instruct-v0.3",
            messages: chatMessages,
            max_tokens: 500,
            temperature: 0.3,
        });

        const content = response.choices?.[0]?.message?.content;
        return content || null;
    } catch (err) {
        console.error("Hugging Face Chat failed:", err);
        return null;
    }
};
