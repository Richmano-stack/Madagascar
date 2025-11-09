// app/api/ask-president/route.ts
import { NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { presidents } from "../../data/presidents"; // 1. Importer vos données

// Initialiser le client Gemini
if (!process.env.GOOGLE_API_KEY) {
  throw new Error('GOOGLE_API_KEY environment variable is not set');
}

const ai = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);

// Utiliser POST pour gérer les requêtes qui envoient des données (la question)
export async function POST(request: Request) {
  try {
    // 2. Récupérer la question de l'utilisateur
    const body = await request.json();
    const userQuestion: string = body.question;

    if (!userQuestion) {
      return NextResponse.json({ error: "La question est manquante." }, { status: 400 });
    }

    // 3. Préparer le Contexte (RAG - Retrieval-Augmented Generation)
    // Nous transformons l'array TypeScript en une chaîne JSON propre.
    const dataContext = JSON.stringify(presidents, null, 2); 
    
    // Le System Prompt: L'instruction critique pour l'IA
    const systemPrompt = `
      Tu es un chatbot expert en histoire politique de Madagascar. 
      Ton unique source d'information est la liste de présidents suivante, fournie en format JSON.
      
      INSTRUCTION CLAIRE :
      1. Réponds UNIQUEMENT aux questions en utilisant les faits présents dans le JSON ci-dessous.
      2. Ne mentionne PAS que tu utilises un fichier JSON ou une base de données.
      3. Rédige ta réponse dans un langage naturel et encourageant.
      4. Si la réponse n'est pas dans les données, réponds poliment que tu n'as pas l'information.
      5. Si l'utilisateur pose une question hors sujet, informe-le qu'il peut egalement demander à Richmano de mettre plus d'informations sur le sujet dans nos base de donné tant qu'il souhaite tant que c'est à propos de Madagascar.
      6. Réponds avec la langue de la question posée.
      
      DONNÉES DES PRÉSIDENTS MALGACHES (JSON) :
      ${dataContext}
    `;

    // 4. Appeler le Modèle d'IA
    const model = ai.getGenerativeModel({ model: 'gemini-2.5-flash' });
    const result = await model.generateContent({
      contents: [{ role: 'user', parts: [{ text: systemPrompt }, { text: userQuestion }] }]
    });
    
    // 5. Renvoyer la Réponse
    const response = await result.response;
    const aiAnswer = response?.text() || "No response generated";

    return NextResponse.json({ 
      answer: aiAnswer 
    }, { status: 200 });

  } catch (error) {
    console.error("Erreur lors de l'appel de l'API Gemini:", error);
    return NextResponse.json({ 
      error: "Erreur interne du serveur lors du traitement de la requête de l'IA." 
    }, { status: 500 });
  }
}