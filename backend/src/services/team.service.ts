import { prisma } from "../config/prisma";
import { AppError } from "../utils/appError";
import { initialTeam } from "../config/initialData";
import { loadData, saveData } from "../utils/fileStore";

const TEAM_FILE = "team.json";

export class TeamService {
  async getAllMembers(onlyActive = true) {
    let team = loadData<any[]>(TEAM_FILE, initialTeam);
    return onlyActive ? team.filter((m) => m.isActive !== false) : team;
  }

  async getMemberBySlug(slug: string) {
    const team = loadData<any[]>(TEAM_FILE, initialTeam);
    const member = team.find(
      (m) => m.slug === slug || m.id === slug || m.name?.toLowerCase().replace(/\s+/g, "-") === slug
    );
    if (!member) throw AppError.notFound(`Team member '${slug}' not found`);
    return member;
  }

  async createMember(data: any) {
    const team = loadData<any[]>(TEAM_FILE, initialTeam);
    const slug =
      data.slug ||
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
    saveData(TEAM_FILE, team);

    try {
      await prisma.teamMember.create({ data: newMember as any });
    } catch {}

    return newMember;
  }

  async updateMember(id: string, data: any) {
    const team = loadData<any[]>(TEAM_FILE, initialTeam);
    const idx = team.findIndex((m) => m.id === id || m.slug === id);
    if (idx === -1) throw AppError.notFound("Team member not found");

    if (data.name && !data.slug) {
      data.slug = data.name.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-");
    }

    team[idx] = { ...team[idx], ...data };
    saveData(TEAM_FILE, team);

    try {
      await prisma.teamMember.update({
        where: { id: team[idx].id },
        data: data as any,
      });
    } catch {}

    return team[idx];
  }

  async deleteMember(id: string) {
    const team = loadData<any[]>(TEAM_FILE, initialTeam);
    const filtered = team.filter((m) => m.id !== id && m.slug !== id);
    saveData(TEAM_FILE, filtered);

    try {
      await prisma.teamMember.delete({
        where: { id },
      });
    } catch {}

    return { id };
  }
}

export const teamService = new TeamService();
