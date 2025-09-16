import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Leaf, Zap, ArrowRight } from "lucide-react"

export default function HomePage() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-secondary/20">
            <div className="container mx-auto px-4 py-16">
                {/* Header */}
                <div className="text-center mb-16">
                    <div className="flex items-center justify-center gap-2 mb-6">
                        <div className="relative">
                            <Leaf className="h-12 w-12 text-primary" />
                            <Zap className="h-6 w-6 text-accent absolute -top-1 -right-1" />
                        </div>
                        <h1 className="text-5xl font-bold text-primary">EcoMove</h1>
                    </div>
                    <p className="text-xl text-muted-foreground text-balance max-w-2xl mx-auto">
                        {
                            "La plataforma líder en movilidad eléctrica sostenible. Únete a la revolución verde y contribuye a un futuro más limpio."
                        }
                    </p>
                </div>

                {/* Cards de navegación */}
                <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                    <Card className="shadow-lg border-border/50 hover:shadow-xl transition-shadow">
                        <CardHeader>
                            <CardTitle className="text-2xl text-card-foreground">Iniciar Sesión</CardTitle>
                            <CardDescription>Accede a tu cuenta existente para continuar tu viaje ecológico</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Link to={"/login"}>
                                <Button
                                    variant={"outline"}
                                    className="w-full h-12 border-primary text-primary hover:bg-primary hover:text-primary-foreground font-medium bg-transparent">
                                    Ingresar
                                    <ArrowRight className="w-4 h-4 ml-2" />
                                </Button>
                            </Link>
                        </CardContent>
                    </Card>

                    <Card className="shadow-lg border-border/50 hover:shadow-xl transition-shadow">
                        <CardHeader>
                            <CardTitle className="text-2xl text-card-foreground">Crear Cuenta</CardTitle>
                            <CardDescription>Regístrate y comienza a formar parte de la comunidad EcoMove</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Link to={"/register"}>
                                <Button
                                    variant="outline"
                                    className="w-full h-12 border-primary text-primary hover:bg-primary hover:text-primary-foreground font-medium bg-transparent"
                                >
                                    Registrarse
                                    <ArrowRight className="w-4 h-4 ml-2" />
                                </Button>
                            </Link>
                        </CardContent>
                    </Card>
                </div>

                {/* Footer */}
                <div className="mt-16 text-center">
                    <p className="text-sm text-muted-foreground">
                        {"© 2025 EcoMove. Construyendo un futuro más verde, un viaje a la vez."}
                    </p>
                </div>
            </div>
        </div>
    )
}
