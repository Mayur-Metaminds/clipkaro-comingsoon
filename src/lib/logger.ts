type LogLevel = "debug" | "info" | "warn" | "error" | "off";

interface LoggerConfig {
  level: LogLevel;
  enabledInProduction: boolean;
}

class Logger {
  private config: LoggerConfig = {
    //level: process.env.NODE_ENV === 'development' ? 'debug' : 'error',
    level: "off",
    enabledInProduction: true,
  };

  private levels: Record<LogLevel, number> = {
    debug: 0,
    info: 1,
    warn: 2,
    error: 3,
    off: 4,
  };

  configure(config: Partial<LoggerConfig>) {
    this.config = { ...this.config, ...config };
  }

  private shouldLog(level: LogLevel): boolean {
    if (this.config.level === "off") return false;

    if (
      process.env.NODE_ENV === "production" &&
      !this.config.enabledInProduction
    ) {
      return false;
    }

    return this.levels[level] >= this.levels[this.config.level];
  }

  debug(message: string, ...args: unknown[]) {
    if (this.shouldLog("debug")) {
      console.log(`[DEBUG] ${message}`, ...args);
    }
  }

  info(message: string, ...args: unknown[]) {
    if (this.shouldLog("info")) {
      console.info(`[INFO] ${message}`, ...args);
    }
  }

  warn(message: string, ...args: unknown[]) {
    if (this.shouldLog("warn")) {
      console.warn(`[WARN] ${message}`, ...args);
    }
  }

  error(message: string, error?: Error | unknown, ...args: unknown[]) {
    if (this.shouldLog("error")) {
      if (error instanceof Error) {
        console.error(
          `[ERROR] ${message}`,
          error.message,
          error.stack,
          ...args
        );
      } else {
        console.error(`[ERROR] ${message}`, error, ...args);
      }
    }
  }
}

export const logger = new Logger();
