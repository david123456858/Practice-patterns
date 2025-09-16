import type React from "react"

import { useState } from "react"
import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Leaf, Zap, CheckCircle } from "lucide-react"

export default function RegisterPage() {
    const [formData, setFormData] = useState({
        cc: "",
        email: "",
        name: "",
        lastName: "",
        password: "",
        confirmPassword: "",
    })

    const [errors, setErrors] = useState<Record<string, string>>({})

    const handleInputChange = (field: string, value: string) => {
        setFormData((prev) => ({ ...prev, [field]: value }))
        // Limpiar error cuando el usuario empiece a escribir
        if (errors[field]) {
            setErrors((prev) => ({ ...prev, [field]: "" }))
        }
    }

    const validateForm = () => {
        const newErrors: Record<string, string> = {}

        if (!formData.cc.trim()) newErrors.cc = "La cédula es requerida"
        if (!formData.email.trim()) newErrors.email = "El email es requerido"
        if (!formData.name.trim()) newErrors.name = "El nombre es requerido"
        if (!formData.lastName.trim()) newErrors.lastName = "El apellido es requerido"
        if (!formData.password) newErrors.password = "La contraseña es requerida"
        if (formData.password.length < 6) newErrors.password = "La contraseña debe tener al menos 6 caracteres"
        if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = "Las contraseñas no coinciden"
        }

        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if (validateForm()) {
            // Aquí iría la lógica de registro
            console.log("Register attempt:", formData)
        }
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-secondary/20 flex items-center justify-center p-4">
            <div className="w-full max-w-md">
                {/* Logo y Header */}
                <div className="text-center mb-8">
                    <div className="flex items-center justify-center gap-2 mb-4">
                        <div className="relative">
                            <Leaf className="h-8 w-8 text-primary" />
                            <Zap className="h-4 w-4 text-accent absolute -top-1 -right-1" />
                        </div>
                        <h1 className="text-3xl font-bold text-primary">EcoMove</h1>
                    </div>
                    <p className="text-muted-foreground text-balance">{"Únete a la revolución de la movilidad sostenible"}</p>
                </div>

                {/* Formulario de Registro */}
                <Card className="shadow-lg border-border/50">
                    <CardHeader className="space-y-1">
                        <CardTitle className="text-2xl text-center text-card-foreground">Crear Cuenta</CardTitle>
                        <CardDescription className="text-center">
                            Completa tus datos para comenzar tu viaje ecológico
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="name" className="text-sm font-medium">
                                        Nombre
                                    </Label>
                                    <Input
                                        id="name"
                                        type="text"
                                        placeholder="Juan"
                                        value={formData.name}
                                        onChange={(e) => handleInputChange("name", e.target.value)}
                                        className={`h-11 ${errors.name ? "border-destructive" : ""}`}
                                    />
                                    {errors.name && <p className="text-xs text-destructive">{errors.name}</p>}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="lastName" className="text-sm font-medium">
                                        Apellido
                                    </Label>
                                    <Input
                                        id="lastName"
                                        type="text"
                                        placeholder="Pérez"
                                        value={formData.lastName}
                                        onChange={(e) => handleInputChange("lastName", e.target.value)}
                                        className={`h-11 ${errors.lastName ? "border-destructive" : ""}`}
                                    />
                                    {errors.lastName && <p className="text-xs text-destructive">{errors.lastName}</p>}
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="cc" className="text-sm font-medium">
                                    Cédula de Ciudadanía
                                </Label>
                                <Input
                                    id="cc"
                                    type="text"
                                    placeholder="12345678"
                                    value={formData.cc}
                                    onChange={(e) => handleInputChange("cc", e.target.value)}
                                    className={`h-11 ${errors.cc ? "border-destructive" : ""}`}
                                />
                                {errors.cc && <p className="text-xs text-destructive">{errors.cc}</p>}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="email" className="text-sm font-medium">
                                    Email
                                </Label>
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="tu@email.com"
                                    value={formData.email}
                                    onChange={(e) => handleInputChange("email", e.target.value)}
                                    className={`h-11 ${errors.email ? "border-destructive" : ""}`}
                                />
                                {errors.email && <p className="text-xs text-destructive">{errors.email}</p>}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="password" className="text-sm font-medium">
                                    Contraseña
                                </Label>
                                <Input
                                    id="password"
                                    type="password"
                                    placeholder="••••••••"
                                    value={formData.password}
                                    onChange={(e) => handleInputChange("password", e.target.value)}
                                    className={`h-11 ${errors.password ? "border-destructive" : ""}`}
                                />
                                {errors.password && <p className="text-xs text-destructive">{errors.password}</p>}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="confirmPassword" className="text-sm font-medium">
                                    Confirmar Contraseña
                                </Label>
                                <Input
                                    id="confirmPassword"
                                    type="password"
                                    placeholder="••••••••"
                                    value={formData.confirmPassword}
                                    onChange={(e) => handleInputChange("confirmPassword", e.target.value)}
                                    className={`h-11 ${errors.confirmPassword ? "border-destructive" : ""}`}
                                />
                                {errors.confirmPassword && <p className="text-xs text-destructive">{errors.confirmPassword}</p>}
                            </div>

                            <Button
                                type="submit"
                                className="w-full h-11 bg-primary hover:bg-primary/90 text-primary-foreground font-medium"
                            >
                                <CheckCircle className="w-4 h-4 mr-2" />
                                Crear Cuenta
                            </Button>
                        </form>

                        <div className="mt-6 text-center">
                            <p className="text-sm text-muted-foreground">
                                {"¿Ya tienes una cuenta? "}
                                <Link to={"/login"} className="text-accent hover:text-accent/80 font-medium transition-colors">
                                    Inicia sesión aquí
                                </Link>
                            </p>
                        </div>
                    </CardContent>
                </Card>

                {/* Footer */}
                <div className="mt-8 text-center">
                    <p className="text-xs text-muted-foreground">{"© 2025 EcoMove. Construyendo un futuro más verde."}</p>
                </div>
            </div>
        </div>
    )
}
