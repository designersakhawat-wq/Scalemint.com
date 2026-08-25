"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.teamService = exports.TeamService = void 0;
const prisma_1 = require("../config/prisma");
const appError_1 = require("../utils/appError");
const initialData_1 = require("../config/initialData");
const fileStore_1 = require("../utils/fileStore");
const TEAM_FILE = "team.json";
class TeamService {
    async getAllMembers(onlyActive = true) {
        let team = (0, fileStore_1.loadData)(TEAM_FILE, initialData_1.initialTeam);
        return onlyActive ? team.filter((m) => m.isActive !== false) : team;
    }
    async getMemberBySlug(slug) {
        const team = (0, fileStore_1.loadData)(TEAM_FILE, initialData_1.initialTeam);
        const member = team.find((m) => m.slug === slug || m.id === slug || m.name?.toLowerCase().replace(/\s+/g, "-") === slug);
        if (!member)
            throw appError_1.AppError.notFound(`Team member '${slug}' not found`);
        return member;
    }
    async createMember(data) {
        const team = (0, fileStore_1.loadData)(TEAM_FILE, initialData_1.initialTeam);
        const slug = data.slug ||
            (data.name
                ? data.name.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-")
                : `member-${Date.now()}`);
        const newMember = {
            id: data.id || `team_${Date.now()}`,
            slug,
            ...data,
            order: data.order ?? team.length + 1,
            isActive: data.isActive ?? true,
        };
        team.push(newMember);
        (0, fileStore_1.saveData)(TEAM_FILE, team);
        try {
            await prisma_1.prisma.teamMember.create({ data: newMember });
        }
        catch { }
        return newMember;
    }
    async updateMember(id, data) {
        const team = (0, fileStore_1.loadData)(TEAM_FILE, initialData_1.initialTeam);
        const idx = team.findIndex((m) => m.id === id || m.slug === id);
        if (idx === -1)
            throw appError_1.AppError.notFound("Team member not found");
        if (data.name && !data.slug) {
            data.slug = data.name.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-");
        }
        team[idx] = { ...team[idx], ...data };
        (0, fileStore_1.saveData)(TEAM_FILE, team);
        try {
            await prisma_1.prisma.teamMember.update({
                where: { id: team[idx].id },
                data: data,
            });
        }
        catch { }
        return team[idx];
    }
    async deleteMember(id) {
        const team = (0, fileStore_1.loadData)(TEAM_FILE, initialData_1.initialTeam);
        const filtered = team.filter((m) => m.id !== id && m.slug !== id);
        (0, fileStore_1.saveData)(TEAM_FILE, filtered);
        try {
            await prisma_1.prisma.teamMember.delete({
                where: { id },
            });
        }
        catch { }
        return { id };
    }
}
exports.TeamService = TeamService;
exports.teamService = new TeamService();
//# sourceMappingURL=team.service.js.map