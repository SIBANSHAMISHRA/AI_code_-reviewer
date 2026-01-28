# ai_engine/detection.py
import ast

def detect_issues(code: str):
    issues = []

    try:
        tree = ast.parse(code)
    except SyntaxError as e:
        issues.append({
            "type": "SyntaxError",
            "message": str(e),
            "severity": "high"
        })
        return issues

    for node in ast.walk(tree):
        if isinstance(node, ast.For):
            issues.append({
                "type": "Performance",
                "message": "Loop detected. Consider optimization.",
                "severity": "low"
            })

    return issues
