import type React from "react"
import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Leaf, Zap, CheckCircle } from "lucide-react"
import { register } from "@/services/auth/register"
import { toast } from "sonner"

export default function RegisterPage() {
    const [formData, setFormData] = useState({
        idUser: "",
        email: "",
        name: "",
        lastName: "",
        password: "",
        password2: "",
    })

    const navigate = useNavigate();

    const [errors, setErrors] = useState<Record<string, string>>({})
    const [isLoading, setIsLoading] = useState(false)

    const handleInputChange = (field: string, value: string) => {
        setFormData((prev) => ({ ...prev, [field]: value }))
        if (errors[field]) {
            setErrors((prev) => ({ ...prev, [field]: "" }))
        }
    }

    const validateForm = () => {
        const newErrors: Record<string, string> = {}

        if (!formData.idUser.trim()) newErrors.idUser = "La cédula es requerida"
        if (!formData.email.trim()) newErrors.email = "El email es requerido"
        if (!formData.name.trim()) newErrors.name = "El nombre es requerido"
        if (!formData.lastName.trim()) newErrors.lastName = "El apellido es requerido"
        if (!formData.password) newErrors.password = "La contraseña es requerida"
        if (formData.password.length < 6) newErrors.password = "La contraseña debe tener al menos 8 caracteres"
        if (formData.password !== formData.password2) {
            newErrors.password2 = "Las contraseñas no coinciden"
        }

        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (validateForm()) {
            setIsLoading(true)
            try {
                const userData = {
                    idUser: formData.idUser,
                    name: formData.name,
                    lastName: formData.lastName,
                    email: formData.email,
                    password: formData.password,
                    password2: formData.password2
                }

                const newUser = await register(userData)
                console.log("Usuario creado exitosamente:", newUser)

                toast.success(`El usuario: ${userData.name} ${userData.lastName} ha sido creado exitosamente.`);

                navigate("/login");

            } catch (error) {
                console.error("Error al registrar usuario:", error)
                toast.error("Error al registrar el usuario. Inténtalo de nuevo.")
            } finally {
                setIsLoading(false)
            }
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
                                <Label htmlFor="idUser" className="text-sm font-medium">
                                    Cédula de Ciudadanía
                                </Label>
                                <Input
                                    id="idUser"
                                    type="text"
                                    placeholder="12345678"
                                    value={formData.idUser}
                                    onChange={(e) => handleInputChange("idUser", e.target.value)}
                                    className={`h-11 ${errors.idUser ? "border-destructive" : ""}`}
                                />
                                {errors.idUser && <p className="text-xs text-destructive">{errors.idUser}</p>}
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
                                <Label htmlFor="password2" className="text-sm font-medium">
                                    Confirmar Contraseña
                                </Label>
                                <Input
                                    id="password2"
                                    type="password"
                                    placeholder="••••••••"
                                    value={formData.password2}
                                    onChange={(e) => handleInputChange("password2", e.target.value)}
                                    className={`h-11 ${errors.password2 ? "border-destructive" : ""}`}
                                />
                                {errors.password2 && <p className="text-xs text-destructive">{errors.password2}</p>}
                            </div>

                            {errors.submit && (
                                <p className="text-xs text-destructive text-center">{errors.submit}</p>
                            )}

                            <Button
                                type="submit"
                                className="w-full h-11 bg-primary hover:bg-primary/90 text-primary-foreground font-medium"
                                disabled={isLoading}
                            >
                                {isLoading ? (
                                    "Creando cuenta..."
                                ) : (
                                    <>
                                        <CheckCircle className="w-4 h-4 mr-2" />
                                        Crear Cuenta
                                    </>
                                )}
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
