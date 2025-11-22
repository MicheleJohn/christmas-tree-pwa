import CryptoJS from 'crypto-js'

/**
 * Encrypts gift content using AES-256 with user password + master key
 * @param content - JSON stringified gift content
 * @param userPassword - Password chosen by gift sender
 * @returns Encrypted string
 */
export function encryptGift(content: string, userPassword: string): string {
  const masterKey = process.env.ENCRYPTION_MASTER_KEY!
  
  if (!masterKey) {
    throw new Error('ENCRYPTION_MASTER_KEY not set')
  }
  
  // Combine user password with master key for double encryption
  const combined = `${userPassword}:${masterKey}`
  
  return CryptoJS.AES.encrypt(content, combined).toString()
}

/**
 * Decrypts gift content
 * @param encrypted - Encrypted string from database
 * @param userPassword - Password provided by recipient
 * @returns Decrypted content or null if password is wrong
 */
export function decryptGift(encrypted: string, userPassword: string): string | null {
  try {
    const masterKey = process.env.ENCRYPTION_MASTER_KEY!
    
    if (!masterKey) {
      throw new Error('ENCRYPTION_MASTER_KEY not set')
    }
    
    const combined = `${userPassword}:${masterKey}`
    
    const bytes = CryptoJS.AES.decrypt(encrypted, combined)
    const decrypted = bytes.toString(CryptoJS.enc.Utf8)
    
    // If decryption fails, it returns empty string
    return decrypted || null
  } catch (error) {
    console.error('Decryption error:', error)
    return null
  }
}
