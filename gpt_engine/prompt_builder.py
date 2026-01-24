def build_gpt_prompt(code, analysis):
    prompt = f"""
You are an expert Python code reviewer.

Below is a Python code snippet and the results of static analysis
performed using Python AST.

=====================
CODE:
=====================
{code}

=====================
STATIC ANALYSIS RESULTS:
=====================

- Long Functions: {analysis.get("long_functions")}
- Nested Loops: {analysis.get("nested_loops")}
- Unused Variables: {analysis.get("unused_variables")}
- Complexity Score: {analysis.get("complexity_score")}

=====================
TASKS:
=====================
1. Explain the detected issues clearly.
2. Suggest improvements and best practices.
3. Refactor the code if needed.
4. Reduce complexity and improve readability.
5. Follow PEP8 standards.

Respond in a structured and clear format.
"""
    return prompt
