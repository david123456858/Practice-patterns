//LOGICA QUE SE ENCONTRABA ANTERIORMENTE EN EL MODALCREATESTATION
import { useState } from "react"
import { createStation } from "@/services/station/station"
import type { GeoLocation } from "@/interface/station/station"

export function useRegisterStation(onSuccess?: () => void, onClose?: () => void) {

    const [formData, setFormData] = useState({
        name: "",
        address: "",
    })

    const [geoData, setGeoData] = useState<GeoLocation | null>(null)
    const [isGettingLocation, setIsGettingLocation] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [isSubmitting, setIsSubmitting] = useState(false)

    const generateRandomId = (): string => {
        const min = 100000000
        const max = 999999999
        return (Math.floor(Math.random() * (max - min + 1)) + min).toString()
    }

    const acquireGeolocation = async () => {
        if (!navigator.geolocation) {
            setError("Geolocation is not supported by your browser")
            return
        }

        setIsGettingLocation(true)
        setError(null)

        try {
            const position = await new Promise<GeolocationPosition>((resolve, reject) => {
                navigator.geolocation.getCurrentPosition(resolve, reject, {
                    enableHighAccuracy: true,
                    timeout: 10000,
                    maximumAge: 60000,
                })
            })

            const geoLocation: GeoLocation = {
                latitude: position.coords.latitude,
                longitude: position.coords.longitude,
                timestamp: new Date(),
            }

            setGeoData(geoLocation)
        } catch (err) {
            const geoErr = err as GeolocationPositionError
            switch (geoErr.code) {
                case geoErr.PERMISSION_DENIED:
                    setError("Location access denied. Please enable location permissions.")
                    break
                case geoErr.POSITION_UNAVAILABLE:
                    setError("Location information is unavailable.")
                    break
                case geoErr.TIMEOUT:
                    setError("Location request timed out. Please try again.")
                    break
                default:
                    setError("An unknown error occurred while getting location.")
            }
        } finally {
            setIsGettingLocation(false)
        }
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        if (!formData.name.trim() || !formData.address.trim()) {
            setError("Station name and address are required")
            return
        }

        if (!geoData) {
            setError("Please acquire geolocation first")
            return
        }

        setIsSubmitting(true)
        setError(null)

        try {
            const payload = {
                id: generateRandomId(),
                name: formData.name.trim(),
                address: formData.address.trim(),
                geoLocation: geoData,
            }

            await createStation(payload)

            onSuccess?.()
            reset()
            onClose?.()
        } catch (err) {
            setError(err instanceof Error ? err.message : "Failed to create station")
        } finally {
            setIsSubmitting(false)
        }
    }

    const reset = () => {
        setFormData({ name: "", address: "" })
        setGeoData(null)
        setError(null)
    }

    const handleCancel = () => {
        reset()
        onClose?.()
    }

    return {
        formData,
        setFormData,
        geoData,
        acquireGeolocation,
        isGettingLocation,
        isSubmitting,
        error,
        handleSubmit,
        handleCancel,
    }
}
