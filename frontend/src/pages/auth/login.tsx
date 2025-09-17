import type React from "react"

import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Leaf, Zap } from "lucide-react"
import { loginUser } from "@/services/auth/login"

export default function LoginPage() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState<string>("")
    const navigate = useNavigate()

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setIsLoading(true);

        try {
            const userData = await loginUser({ email, password });

            // ✅ Guardar en localStorage (o en contexto global si usas Context/Redux)
            localStorage.setItem("user", JSON.stringify(userData));

            // ✅ Redirección según rol
            const role = userData.role[0]?.name;
            if (role === "client") {
                navigate("/homeClient");
            } else if (role === "admin") {
                navigate("/dashboard");
            } else {
                setError("Rol no reconocido");
            }
        } catch (error) {
            console.error("Error en login:", error);
            setError(error instanceof Error ? error.message : "Error al iniciar sesión");
        } finally {
            setIsLoading(false);
        }
    };



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
                    <p className="text-muted-foreground text-balance">{"Movilidad eléctrica para un futuro sostenible"}</p>
                </div>

                {/* Formulario de Login */}
                <Card className="shadow-lg border-border/50">
                    <CardHeader className="space-y-1">
                        <CardTitle className="text-2xl text-center text-card-foreground">Iniciar Sesión</CardTitle>
                        <CardDescription className="text-center">Ingresa tus credenciales para acceder a tu cuenta</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="email" className="text-sm font-medium">
                                    Email
                                </Label>
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="tu@email.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                    className="h-11"
                                    disabled={isLoading}
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="password" className="text-sm font-medium">
                                    Contraseña
                                </Label>
                                <Input
                                    id="password"
                                    type="password"
                                    placeholder="••••••••"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                    className="h-11"
                                    disabled={isLoading}
                                />
                            </div>

                            {/* Mostrar error si existe */}
                            {error && (
                                <div className="p-3 text-sm text-destructive bg-destructive/15 rounded-md">
                                    {error}
                                </div>
                            )}

                            <Button
                                type="submit"
                                disabled={isLoading}
                                className="w-full h-11 bg-primary hover:bg-primary/90 text-primary-foreground font-medium"
                            >
                                {isLoading ? "Iniciando sesión..." : "Iniciar Sesión"}
                            </Button>
                        </form>

                        <div className="mt-6 text-center">
                            <p className="text-sm text-muted-foreground">
                                {"¿No tienes una cuenta? "}
                                <Link
                                    to={"/register"}
                                    className="text-accent hover:text-accent/80 font-medium transition-colors"
                                >
                                    Regístrate aquí
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
