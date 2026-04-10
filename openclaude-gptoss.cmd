@echo off
set CLAUDE_CODE_USE_OPENAI=1
set OPENAI_BASE_URL=http://localhost:11434/v1
set OPENAI_MODEL=gpt-oss:20b
openclaude %*