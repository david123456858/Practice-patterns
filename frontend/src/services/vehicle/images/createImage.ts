
export const uploadVehicleImage = async (file: File, idVehicle: string) => {
    try {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("idVehicle", idVehicle);

        const response = await fetch(`/api/images`, {
            method: "POST",
            body: formData,
        });

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`Error al subir la imagen: ${errorText}`);
        }

        const data = await response.json();
        return data;
    } catch (error: any) {
        console.error("Error en uploadVehicleImage:", error);
        throw error;
    }
};
