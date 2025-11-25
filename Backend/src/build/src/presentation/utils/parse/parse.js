"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseJson = void 0;
const parseJson = (data) => {
    const parseData = data.map(item => (Object.assign(Object.assign({}, item), { info: (() => {
            if (item.info == null)
                return null;
            if (typeof item.info === 'string') {
                try {
                    return JSON.parse(item.info);
                }
                catch (_a) {
                    return item.info; // si no es JSON válido
                }
            }
            return item.info; // ya es un objeto
        })() })));
    return parseData;
};
exports.parseJson = parseJson;
