"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.teamController = exports.TeamController = void 0;
const team_service_1 = require("../services/team.service");
const apiResponse_1 = require("../utils/apiResponse");
class TeamController {
    async getAllMembers(req, res, next) {
        try {
            const all = req.query.all === "true";
            const members = await team_service_1.teamService.getAllMembers(!all);
            return apiResponse_1.ApiResponse.success(res, members, "Team members retrieved successfully");
        }
        catch (error) {
            next(error);
        }
    }
    async getMemberBySlug(req, res, next) {
        try {
            const member = await team_service_1.teamService.getMemberBySlug(req.params.slug);
            return apiResponse_1.ApiResponse.success(res, member, "Team member profile retrieved");
        }
        catch (error) {
            next(error);
        }
    }
    async createMember(req, res, next) {
        try {
            const member = await team_service_1.teamService.createMember(req.body);
            return apiResponse_1.ApiResponse.created(res, member, "Team member created successfully");
        }
        catch (error) {
            next(error);
        }
    }
    async updateMember(req, res, next) {
        try {
            const member = await team_service_1.teamService.updateMember(req.params.id, req.body);
            return apiResponse_1.ApiResponse.success(res, member, "Team member updated successfully");
        }
        catch (error) {
            next(error);
        }
    }
    async deleteMember(req, res, next) {
        try {
            await team_service_1.teamService.deleteMember(req.params.id);
            return apiResponse_1.ApiResponse.success(res, null, "Team member deleted successfully");
        }
        catch (error) {
            next(error);
        }
    }
}
exports.TeamController = TeamController;
exports.teamController = new TeamController();
//# sourceMappingURL=team.controller.js.map