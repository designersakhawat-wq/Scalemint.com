export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL ||
  (typeof window !== "undefined" && window.location.hostname !== "localhost" && window.location.hostname !== "127.0.0.1"
    ? `${window.location.origin}/api/v1`
    : "http://localhost:5000/api/v1");

export interface ApiResponse<T = any> {
  success: boolean;
  message?: string;
  data: T;
  meta?: any;
  errors?: any;
}

export async function fetchApi<T = any>(
  endpoint: string,
  options: RequestInit = {}
): Promise<ApiResponse<T>> {
  const url = `${API_BASE_URL}${endpoint.startsWith("/") ? endpoint : `/${endpoint}`}`;

  const defaultHeaders: Record<string, string> = {
    "Content-Type": "application/json",
  };

  const response = await fetch(url, {
    ...options,
    headers: {
      ...defaultHeaders,
      ...options.headers,
    },
  });

  const data = await response.json().catch(() => ({
    success: false,
    message: "Failed to parse JSON response",
  }));

  if (!response.ok) {
    throw new Error(data.message || "An unexpected error occurred");
  }

  return data;
}

// Contact Submission API
export async function submitContactMessage(payload: {
  firstName: string;
  lastName: string;
  email: string;
  message: string;
}) {
  return fetchApi("/contact", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

// Services API
export async function getServices() {
  return fetchApi("/services");
}

export async function getServiceBySlug(slug: string) {
  return fetchApi(`/services/${slug}`);
}

// Portfolio API
export async function getPortfolioItems() {
  return fetchApi("/portfolio");
}

// Blogs API
export async function getBlogs(params?: { page?: number; limit?: number; category?: string }) {
  const searchParams = new URLSearchParams();
  if (params?.page) searchParams.append("page", params.page.toString());
  if (params?.limit) searchParams.append("limit", params.limit.toString());
  if (params?.category) searchParams.append("category", params.category);

  const qs = searchParams.toString();
  return fetchApi(`/blogs${qs ? `?${qs}` : ""}`);
}

export async function getBlogBySlug(slug: string) {
  return fetchApi(`/blogs/${slug}`);
}

// Team API
export async function getTeamMembers() {
  return fetchApi("/team");
}

export async function getTeamMemberById(id: string) {
  return fetchApi(`/team/${id}`);
}

// Packages API
export async function getPackages() {
  return fetchApi("/packages");
}

// FAQs API
export async function getFaqs() {
  return fetchApi("/faqs");
}

// Settings API
export async function getSettings() {
  return fetchApi("/settings");
}
