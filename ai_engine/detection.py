def detect_issues(code: str):
    issues = []

    if "eval(" in code:
        issues.append("Use of eval() is unsafe")

    if "exec(" in code:
        issues.append("Use of exec() can be dangerous")

    if code.count("for ") + code.count("while ") > 3:
        issues.append("Too many loops may reduce performance")

    if len(code.splitlines()) > 100:
        issues.append("Code is too long, consider refactoring")

    if code.count("print(") > 5:
        issues.append("Too many print statements")

    return issues
