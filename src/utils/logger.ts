const LEVEL_COLORS: Record<string, string> = {
  INFO: 'color: #00d4ff',
  DEBUG: 'color: #7b61ff',
  WARN: 'color: #ffaa00',
  ERROR: 'color: #ff4757; font-weight: bold',
}

const LEVELS = ['DEBUG', 'INFO', 'WARN', 'ERROR'] as const
type LogLevel = (typeof LEVELS)[number]
const CURRENT_LEVEL: LogLevel = 'DEBUG'

export function createLogger() {
  function shouldLog(level: LogLevel): boolean {
    return LEVELS.indexOf(level) >= LEVELS.indexOf(CURRENT_LEVEL)
  }

  function format(moduleName: string, level: LogLevel, message: string): void {
    if (!shouldLog(level)) return
    const time = new Date().toLocaleTimeString('zh-CN', { hour12: false })
    console.log(`%c[${time}][${moduleName}][${level}] ${message}`, LEVEL_COLORS[level])
  }

  return {
    info: (moduleName: string, message: string) => format(moduleName, 'INFO', message),
    debug: (moduleName: string, message: string) => format(moduleName, 'DEBUG', message),
    warn: (moduleName: string, message: string) => format(moduleName, 'WARN', message),
    error: (moduleName: string, message: string, error?: Error) => {
      format(moduleName, 'ERROR', `${message}${error ? ` | ${error.message}` : ''}`)
    },
  }
}

export const logger = createLogger()
