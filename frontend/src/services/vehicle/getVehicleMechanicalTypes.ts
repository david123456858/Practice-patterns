

export interface VehicleMechanicalTypes {
    drive: Record<string, string>;
    bearing: Record<string, string>;
    brake: Record<string, string>;
}

export const getVehicleMechanicalTypes = async (): Promise<VehicleMechanicalTypes> => {
    try {
        const response = await fetch(`/api/v1/vehicle/typesMechanical`);
        if (!response.ok) {
            throw new Error(`Error ${response.status}: ${response.statusText}`);
        }

        const data = await response.json();

        const result: VehicleMechanicalTypes = {
            drive: data.drive ?? {},
            bearing: data.bearing ?? {},
            brake: data.brake ?? {},
        };

        return result;
    } catch (error) {
        console.error("Error fetching vehicle mechanical types:", error);
        throw new Error("Failed to fetch vehicle mechanical types");
    }
};
