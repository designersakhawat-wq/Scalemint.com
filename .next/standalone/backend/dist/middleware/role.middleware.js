"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authorize = authorize;
const appError_1 = require("../utils/appError");
function authorize(...roles) {
    return (req, _res, next) => {
        if (!req.user) {
            return next(appError_1.AppError.unauthorized("Authentication required"));
        }
        if (!roles.includes(req.user.role)) {
            return next(appError_1.AppError.forbidden("You do not have permission to perform this action."));
        }
        next();
    };
}
//# sourceMappingURL=role.middleware.js.map