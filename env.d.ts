// env.d.ts
declare namespace NodeJS {
    interface ProcessEnv {
      OPENAI_API_KEY?: string
      ANTHROPIC_API_KEY?: string
      GOOGLE_GENERATIVE_AI_API_KEY?: string
      MISTRAL_API_KEY?: string
      // ... añadir más según necesites
    }
  }