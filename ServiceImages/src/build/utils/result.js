export const FailureProccess = (error, status) => ({
    error,
    success: false,
    status
});
export const SuccessProcess = (value, status) => ({
    value,
    success: true,
    status
});
