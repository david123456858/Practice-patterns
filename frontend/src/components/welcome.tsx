import { Leaf, Zap, ArrowLeft, Car, MapPin, User } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

export function WelcomeComponent() {
    return (
        <div className="flex-1 p-8 bg-gradient-to-br from-green-50 via-white to-green-50">
            <div className="max-w-4xl mx-auto">
                {/* Header */}
                <div className="text-center mb-12">
                    <div className="flex items-center justify-center gap-2 mb-6">
                        <div className="relative">
                            <Leaf className="h-16 w-16 text-green-600" />
                            <Zap className="absolute -bottom-2 -right-2 h-8 w-8 text-green-500" />
                        </div>
                    </div>
                    <h1 className="text-4xl font-bold text-green-800 mb-4">Bienvenido al sistema administrativo de EcoMove</h1>
                    <div className="w-24 h-1 bg-green-600 mx-auto mb-6"></div>
                </div>

                {/* Main Welcome Card */}
                <Card className="border-green-200 shadow-lg">
                    <CardContent className="p-8">
                        <div className="text-center">
                            <p className="text-xl text-green-700 leading-relaxed mb-8">
                                La plataforma líder en movilidad eléctrica en donde{" "}
                                <span className="font-semibold text-green-800">
                                    Conectamos tu camino con un futuro más verde y sostenible.
                                </span>
                            </p>

                            {/* Features Grid */}
                            <div className="grid md:grid-cols-3 gap-6 mt-8">
                                <div className="text-center p-4">
                                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                                        <Car className="h-6 w-6 text-green-600" />
                                    </div>
                                    <h3 className="font-semibold text-green-800 mb-2">Vehículos Eléctricos</h3>
                                    <p className="text-sm text-green-600">Gestiona tu flota de vehículos ecológicos</p>
                                </div>

                                <div className="text-center p-4">
                                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                                        <MapPin className="h-6 w-6 text-green-600" />
                                    </div>
                                    <h3 className="font-semibold text-green-800 mb-2">Estaciones de Compra</h3>
                                    <p className="text-sm text-green-600">Gestiona tus diferentes estaciones de compra</p>
                                </div>

                                <div className="text-center p-4">
                                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                                        <User className="h-6 w-6 text-green-600" />
                                    </div>
                                    <h3 className="font-semibold text-green-800 mb-2">Usuarios activos</h3>
                                    <p className="text-sm text-green-600">Gestiona a tus usuarios contribuyentes a EcoMove</p>
                                </div>
                            </div>

                            {/* Call to Action */}
                            <div className="mt-8 p-6 bg-green-50 rounded-lg border border-green-200">
                                <p className="text-green-700 mb-4">
                                    Comienza a explorar las funcionalidades de EcoMove usando el menú lateral
                                </p>
                                <div className="flex items-center justify-center gap-2 text-green-600">
                                    <ArrowLeft className="h-4 w-4" />
                                    <span className="text-sm font-medium">Selecciona una opción del menú lateral izquierdo</span>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
