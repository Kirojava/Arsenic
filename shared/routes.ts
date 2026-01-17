import { z } from 'zod';
import { 
  insertUserSchema, 
  insertCommitteeSchema, 
  insertRegistrationSchema, 
  insertTeamMemberSchema,
  insertEventSchema,
  insertGalleryImageSchema,
  users,
  committees,
  registrations,
  teamMembers,
  events,
  galleryImages
} from './schema';

export const errorSchemas = {
  validation: z.object({
    message: z.string(),
    field: z.string().optional(),
  }),
  notFound: z.object({
    message: z.string(),
  }),
  internal: z.object({
    message: z.string(),
  }),
  unauthorized: z.object({
    message: z.string(),
  }),
};

export const api = {
  // === USERS / AUTH ===
  users: {
    me: {
      method: 'GET' as const,
      path: '/api/users/me',
      responses: {
        200: z.custom<typeof users.$inferSelect>(),
        401: errorSchemas.unauthorized,
      },
    },
    update: {
      method: 'PATCH' as const,
      path: '/api/users/:id',
      input: insertUserSchema.partial(),
      responses: {
        200: z.custom<typeof users.$inferSelect>(),
        404: errorSchemas.notFound,
      },
    }
  },

  // === COMMITTEES ===
  committees: {
    list: {
      method: 'GET' as const,
      path: '/api/committees',
      responses: {
        200: z.array(z.custom<typeof committees.$inferSelect>()),
      },
    },
    get: {
      method: 'GET' as const,
      path: '/api/committees/:id',
      responses: {
        200: z.custom<typeof committees.$inferSelect>(),
        404: errorSchemas.notFound,
      },
    },
  },

  // === REGISTRATIONS ===
  registrations: {
    create: {
      method: 'POST' as const,
      path: '/api/registrations',
      input: insertRegistrationSchema,
      responses: {
        201: z.custom<typeof registrations.$inferSelect>(),
        400: errorSchemas.validation,
      },
    },
    list: { // Admin only
      method: 'GET' as const,
      path: '/api/registrations',
      responses: {
        200: z.array(z.custom<typeof registrations.$inferSelect & { user: typeof users.$inferSelect }>()),
      },
    },
    verify: { // Verify by code (Admin)
      method: 'POST' as const,
      path: '/api/registrations/verify',
      input: z.object({ code: z.string() }),
      responses: {
        200: z.custom<typeof registrations.$inferSelect & { user: typeof users.$inferSelect }>(),
        404: errorSchemas.notFound,
      },
    },
    update: { // Admin update status
      method: 'PATCH' as const,
      path: '/api/registrations/:id',
      input: insertRegistrationSchema.partial(),
      responses: {
        200: z.custom<typeof registrations.$inferSelect>(),
        404: errorSchemas.notFound,
      },
    }
  },

  // === TEAM ===
  team: {
    list: {
      method: 'GET' as const,
      path: '/api/team',
      responses: {
        200: z.array(z.custom<typeof teamMembers.$inferSelect>()),
      },
    },
  },

  // === EVENTS ===
  events: {
    list: {
      method: 'GET' as const,
      path: '/api/events',
      responses: {
        200: z.array(z.custom<typeof events.$inferSelect>()),
      },
    },
  },

  // === GALLERY ===
  gallery: {
    list: {
      method: 'GET' as const,
      path: '/api/gallery',
      responses: {
        200: z.array(z.custom<typeof galleryImages.$inferSelect>()),
      },
    },
  }
};

export function buildUrl(path: string, params?: Record<string, string | number>): string {
  let url = path;
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (url.includes(`:${key}`)) {
        url = url.replace(`:${key}`, String(value));
      }
    });
  }
  return url;
}
