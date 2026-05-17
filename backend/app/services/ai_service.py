from app.services.ollama_service import ollama_service


class AIService:

    # ─── Prompt Improver ─────────────────────────────────────────────────────

    async def improve_prompt(self, prompt: str) -> str:
        """
        Takes a weak/vague prompt and rewrites it into a clear,
        detailed, and effective prompt using the local model.
        """
        system = (
            "You are an expert prompt engineer. "
            "Your job is to rewrite user prompts to be clearer, more specific, "
            "and more likely to get a high-quality response from an AI model. "
            "Return ONLY the improved prompt, nothing else. No explanations."
        )
        result = await ollama_service.generate(
            prompt=f"Improve this prompt: {prompt}",
            system=system,
        )
        return result.strip()

    # ─── Response Quality Scorer ──────────────────────────────────────────────

    async def score_response(self, response: str, prompt: str) -> dict:
        """
        Scores an AI response on a scale of 1-10 based on:
        accuracy, clarity, and depth relative to the original prompt.
        Returns a score and short reasoning.
        """
        system = (
            "You are an AI response quality evaluator. "
            "Given a prompt and a response, rate the response on a scale of 1-10 "
            "based on accuracy, clarity, and depth. "
            "Reply in this exact format:\n"
            "SCORE: <number>\n"
            "REASONING: <one sentence>\n"
            "Nothing else."
        )
        result = await ollama_service.generate(
            prompt=f"Prompt: {prompt}\n\nResponse: {response}",
            system=system,
        )

        # Parse score and reasoning from response
        score = 5.0
        reasoning = "Unable to evaluate"
        for line in result.strip().split("\n"):
            if line.startswith("SCORE:"):
                try:
                    score = float(line.replace("SCORE:", "").strip())
                except ValueError:
                    pass
            elif line.startswith("REASONING:"):
                reasoning = line.replace("REASONING:", "").strip()

        return {"score": score, "reasoning": reasoning}

    # ─── Model Recommender ────────────────────────────────────────────────────

    async def recommend_model(self, prompt: str) -> dict:
        """
        Analyzes the user's prompt and recommends the best model
        from the available options (gemma:2b, phi3:mini, llama3.2:3b).
        """
        system = (
            "You are an AI model selection expert. "
            "Given a user prompt, recommend the best model from: gemma:2b, phi3:mini, llama3.2:3b.\n"
            "- gemma:2b: fastest, best for simple tasks\n"
            "- phi3:mini: balanced, good for reasoning\n"
            "- llama3.2:3b: strongest, best for complex tasks\n"
            "Reply in this exact format:\n"
            "MODEL: <model_name>\n"
            "REASON: <one sentence>\n"
            "Nothing else."
        )
        result = await ollama_service.generate(
            prompt=f"Which model should I use for: {prompt}",
            system=system,
        )

        # Parse model and reason
        model = "gemma:2b"
        reason = "Best default choice for general tasks"
        for line in result.strip().split("\n"):
            if line.startswith("MODEL:"):
                model = line.replace("MODEL:", "").strip()
            elif line.startswith("REASON:"):
                reason = line.replace("REASON:", "").strip()

        return {"model": model, "reason": reason}

    # ─── Context Summarizer ───────────────────────────────────────────────────

    async def summarize_messages(self, messages: list) -> str:
        """
        Summarizes a long conversation history into a short paragraph.
        Used to prevent context window overflow in long chats.
        """
        system = (
            "You are a conversation summarizer. "
            "Summarize the following conversation history into 2-3 sentences. "
            "Preserve key facts, decisions, and context. "
            "Return ONLY the summary, nothing else."
        )

        # Format messages for the model
        formatted = "\n".join(
            [f"{m.get('role', 'user').upper()}: {m.get('content', '')}" for m in messages]
        )

        result = await ollama_service.generate(
            prompt=f"Summarize this conversation:\n\n{formatted}",
            system=system,
        )
        return result.strip()

    # ─── Personality Analyzer ─────────────────────────────────────────────────

    async def analyze_personality(self, responses: list) -> dict:
        """
        Analyzes a set of model responses to determine the model's
        personality traits: creativity, factuality, verbosity, tone.
        """
        system = (
            "You are an AI personality analyst. "
            "Analyze the following AI responses and rate these traits on a scale of 1-10:\n"
            "- creativity\n- factuality\n- verbosity\n- friendliness\n"
            "Reply in this exact JSON format:\n"
            '{"creativity": 7, "factuality": 8, "verbosity": 5, "friendliness": 9}\n'
            "Nothing else."
        )

        formatted = "\n---\n".join(
            [r.get("content", "") if isinstance(r, dict) else str(r) for r in responses]
        )

        result = await ollama_service.generate(
            prompt=f"Analyze these AI responses:\n\n{formatted}",
            system=system,
        )

        # Parse JSON response
        import json
        try:
            clean = result.strip()
            # Extract JSON if wrapped in other text
            start = clean.find("{")
            end = clean.rfind("}") + 1
            if start != -1 and end > start:
                personality = json.loads(clean[start:end])
            else:
                raise ValueError("No JSON found")
        except Exception:
            personality = {
                "creativity": 5,
                "factuality": 5,
                "verbosity": 5,
                "friendliness": 5,
            }

        return personality


# Singleton instance
ai_service = AIService()
