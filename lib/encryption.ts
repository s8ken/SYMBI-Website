import crypto from 'crypto'

function getEncryptionKey(): string {
  const key = process.env.ENCRYPTION_KEY
  if (!key) {
    if (process.env.NODE_ENV === 'production') {
      throw new Error('ENCRYPTION_KEY is required in production')
    }
    console.warn('[encryption] Using insecure development key. Set ENCRYPTION_KEY for production use.')
    return 'dev-insecure-key'
  }
  return key
}
const ALGORITHM = 'aes-256-gcm'
const IV_LENGTH = 16
const TAG_LENGTH = 16

export interface EncryptedData {
  encrypted: string
  iv: string
  tag: string
}

/**
 * Encrypt sensitive data
 */
export function encrypt(text: string): EncryptedData {
  if (!text) {
    throw new Error('Text to encrypt cannot be empty')
  }

  const key = crypto.scryptSync(getEncryptionKey(), 'salt', 32)
  const iv = crypto.randomBytes(IV_LENGTH)
  const cipher = crypto.createCipheriv(ALGORITHM, key, iv)
  cipher.setAAD(Buffer.from('symbi-auth', 'utf8'))

  let encrypted = cipher.update(text, 'utf8', 'hex')
  encrypted += cipher.final('hex')
  
  const tag = cipher.getAuthTag()

  return {
    encrypted,
    iv: iv.toString('hex'),
    tag: tag.toString('hex')
  }
}

/**
 * Decrypt sensitive data
 */
export function decrypt(encryptedData: EncryptedData): string {
  if (!encryptedData.encrypted || !encryptedData.iv || !encryptedData.tag) {
    throw new Error('Invalid encrypted data format')
  }

  try {
    const key = crypto.scryptSync(getEncryptionKey(), 'salt', 32)
    const iv = Buffer.from(encryptedData.iv, 'hex')
    const tag = Buffer.from(encryptedData.tag, 'hex')
    
    const decipher = crypto.createDecipheriv(ALGORITHM, key, iv)
    decipher.setAAD(Buffer.from('symbi-auth', 'utf8'))
    decipher.setAuthTag(tag)

    let decrypted = decipher.update(encryptedData.encrypted, 'hex', 'utf8')
    decrypted += decipher.final('utf8')

    return decrypted
  } catch (error) {
    throw new Error('Failed to decrypt data')
  }
}

/**
 * Hash sensitive data (one-way)
 */
export function hashData(data: string, salt?: string): string {
  const actualSalt = salt || crypto.randomBytes(16).toString('hex')
  const hash = crypto.pbkdf2Sync(data, actualSalt, 10000, 64, 'sha512')
  return `${actualSalt}:${hash.toString('hex')}`
}

/**
 * Verify hashed data
 */
export function verifyHash(data: string, hashedData: string): boolean {
  try {
    const [salt, hash] = hashedData.split(':')
    const newHash = crypto.pbkdf2Sync(data, salt, 10000, 64, 'sha512')
    return hash === newHash.toString('hex')
  } catch {
    return false
  }
}

/**
 * Generate secure random token
 */
export function generateSecureToken(length: number = 32): string {
  return crypto.randomBytes(length).toString('hex')
}

/**
 * Anonymize email for logging
 */
export function anonymizeEmail(email: string): string {
  if (!email || !email.includes('@')) {
    return 'invalid-email'
  }

  const [localPart, domain] = email.split('@')
  const anonymizedLocal = localPart.length > 2 
    ? `${localPart[0]}***${localPart[localPart.length - 1]}`
    : '***'
  
  return `${anonymizedLocal}@${domain}`
}

/**
 * Secure data comparison (timing-safe)
 */
export function secureCompare(a: string, b: string): boolean {
  if (a.length !== b.length) {
    return false
  }

  let result = 0
  for (let i = 0; i < a.length; i++) {
    result |= a.charCodeAt(i) ^ b.charCodeAt(i)
  }

  return result === 0
}

/**
 * Encrypt email for storage
 */
export function encryptEmail(email: string): EncryptedData {
  return encrypt(email.toLowerCase().trim())
}

/**
 * Decrypt email from storage
 */
export function decryptEmail(encryptedData: EncryptedData): string {
  return decrypt(encryptedData)
}

/**
 * Generate API key
 */
export function generateApiKey(): string {
  const prefix = 'symbi_'
  const key = generateSecureToken(24)
  return `${prefix}${key}`
}

/**
 * Validate API key format
 */
export function isValidApiKeyFormat(apiKey: string): boolean {
  return /^symbi_[a-f0-9]{48}$/.test(apiKey)
}
