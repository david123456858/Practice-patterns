/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import jwt from 'jsonwebtoken'
import 'dotenv/config'
import { NextFunction, Request, Response } from 'express'
export class JwtUrlSigner {
  private readonly secret: string
  private readonly expiresIn: number // En segundos

  constructor () {
    this.secret = process.env.JWT_SECRET ?? 'default-secret-change-me'
    this.expiresIn = parseInt(process.env.URL_EXPIRATION ?? '3600') // 1 hora por defecto
  }

  /**
   * Genera un token JWT firmado
   */
  sign (imageId: string, type: 'original' | 'thumbnail' = 'original'): string {
    const payload = {
      imageId,
      type,
      iat: Math.floor(Date.now() / 1000) // Issued at
    }

    const token = jwt.sign(payload, this.secret, {
      expiresIn: this.expiresIn,
      algorithm: 'HS256'
    })

    return token
  }

  /**
   * Verifica si un token es válido
   */
  verify (token: string): { valid: boolean, imageId?: string, type?: string } {
    try {
      const decoded = jwt.verify(token, this.secret, {
        algorithms: ['HS256']
      }) as any

      return {
        valid: true,
        imageId: decoded.imageId,
        type: decoded.type
      }
    } catch (error) {
      if (error instanceof jwt.TokenExpiredError) {
        console.log('Token expired')
      } else if (error instanceof jwt.JsonWebTokenError) {
        console.log('Invalid token')
      }

      return { valid: false }
    }
  }

  /**
   * Genera URL completa firmada
   */
  generateSecureUrl (imageId: string, type: 'original' | 'thumbnail' = 'original'): string {
    const token = this.sign(imageId, type)
    const baseUrl = process.env.IMAGE_SERVICE_URL ?? 'http://localhost:3000'

    return `${baseUrl}/api/images/serve/${imageId}?token=${token}`
  }

  public validateSignedUrl = (req: Request, res: Response, next: NextFunction): any => {
    const token = req.query.token as string
    console.log(token)

    // Verificar que existe el token
    if (!token) {
      return res.status(401).json({
        error: 'Missing token',
        message: 'This URL requires a valid token'
      })
    }

    // Verificar el token
    const verification = this.verify(token)

    if (!verification.valid) {
      return res.status(403).json({
        error: 'Invalid or expired token',
        message: 'The URL has expired or the token is invalid'
      })
    }

    // Verificar que el imageId del token coincide con el de la URL
    const imageIdFromUrl = req.params.imageId
    console.log(imageIdFromUrl)

    if (verification.imageId !== imageIdFromUrl) {
      return res.status(403).json({
        error: 'Token mismatch',
        message: 'Token does not match the requested image'
      })
    }

    next()
  }
}
