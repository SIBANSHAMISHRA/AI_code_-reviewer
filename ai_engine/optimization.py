def optimization_suggestions(code: str):
    suggestions = []

    if "for i in range(len(" in code:
        suggestions.append(
            "Use direct iteration instead of range(len())."
        )

    if code.count("print(") > 5:
        suggestions.append(
            "Too many print statements can reduce performance."
        )

    if "==" in code and "if" in code:
        suggestions.append(
            "Check if conditional logic can be simplified."
        )

    if len(code.splitlines()) > 50:
        suggestions.append(
            "Consider breaking the code into smaller functions."
        )

    return suggestions
