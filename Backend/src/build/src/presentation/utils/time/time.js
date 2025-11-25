"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.diffDatesInMinutes = diffDatesInMinutes;
exports.simulateLoan = simulateLoan;
function diffDatesInMinutes(date1, date2) {
    const diffMs = Math.abs(date2.getTime() - date1.getTime()); // diferencia en ms
    const minutes = diffMs / (1000 * 60); // convierte directamente a minutos (decimales)
    return Math.floor(minutes); // redondeamos hacia abajo (solo minutos completos)
}
function simulateLoan(start, durationMinutes) {
    const end = new Date(start.getTime() + durationMinutes * 60 * 1000);
    return end;
}
